import React from 'react';
import { FolhaA4 } from "@/components/FolhaA4/folhaa4";
import { cursos } from "@/utils/codcursos";

interface Aluno {
  Matrícula: string;
  Turma: string;
  Nome: string;
  Tutor: string;
  Disciplinas: {
    Disciplina: string;
    Nota_Bim_1: string;
    Nota_Bim_2: string;
    Nota_Bim_3: string;
    Nota_Bim_4: string;
    Situação: string;
  }[];
}

async function pegaCurso(cod: string) {
  const res = await fetch(`https://mpfaraujo.com.br/api/boletim/curso?codigo_curso=${cod}`, { cache: "no-cache" });
  return res.json();
}

const calcularMedia = (nota1: number, nota2: number) => {
  return 0.5 * (nota1 + nota2);
};

const Page = async ({ params }: { params: { curso: string } }) => {
  const alunos: Aluno[] = await pegaCurso(params.curso);
  const curso = cursos.find(item => item.cod === params.curso);

  // Função para agrupar alunos por tutor
  const agruparAlunosPorTutor = () => {
    const alunosAgrupados: { [key: string]: Aluno[] } = {};

    alunos.forEach((aluno: Aluno) => {
      const { Nome, Tutor } = aluno;

      if (!alunosAgrupados[Tutor]) {
        alunosAgrupados[Tutor] = [];
      }

      alunosAgrupados[Tutor].push(aluno);
    });

    return alunosAgrupados;
  };

  const alunosAgrupados = agruparAlunosPorTutor();

  const listarDisciplinasUnicas = (): { disciplina: string; notas: number[] }[] => {
    const disciplinasUnicas = new Map<string, number[]>();

    alunos.forEach((aluno) => {
      aluno.Disciplinas.forEach((disciplina) => {
        const nomeDisciplina = disciplina.Disciplina.replace(/.*? - /, '');
        if (nomeDisciplina !== "TECINT TUT - TUTORIA" && disciplina.Situação === "Matrícula") {
          if (!disciplinasUnicas.has(nomeDisciplina)) {
            disciplinasUnicas.set(nomeDisciplina, []);
          }
          // Converte notas para números e adiciona à matriz de notas da disciplina
          const notas = [
            parseFloat(disciplina.Nota_Bim_1.trim()),
            parseFloat(disciplina.Nota_Bim_2.trim()),
          ];
          disciplinasUnicas.get(nomeDisciplina)?.push(...notas);
        }
      });
    });

    return Array.from(disciplinasUnicas.keys()).map((disciplina) => ({
      disciplina,
      notas: disciplinasUnicas.get(disciplina) || [],
    }));
  };

  const disciplinasUnicasComNotas = listarDisciplinasUnicas();

  // Função para listar alunos com média inferior a 6 em uma disciplina
  const listarAlunosComMediaInferiorASeis = (disciplina: string): Aluno[] => {
    const alunosComMediaInferior: Aluno[] = [];
  
    alunos.forEach((aluno) => {
      const notasDisciplina = aluno.Disciplinas.find(
        (disc) =>
          disc.Disciplina.includes(disciplina) && disc.Situação === 'Matrícula'
      );
      
      if (notasDisciplina) {
        const nota1 = parseFloat(notasDisciplina.Nota_Bim_1.trim());
        const nota2 = parseFloat(notasDisciplina.Nota_Bim_2.trim());
        
        const media = .5*(nota1 + nota2);
  
        if (media < 6) {
          alunosComMediaInferior.push(aluno);
        }
      }
    });
  
    return alunosComMediaInferior;
  };

  return (
    <div>
      <FolhaA4>
        <div>
          No programa de Tutoria há {alunos.length} alunos de {curso?.Nome}
        </div>
        <div>
          <table className="w-full border-collapse border border-gray-200 text-xs">
            <thead>
              <tr>
                <th className="py-1 px-4 bg-gray-100 border border-gray-200">Tutor</th>
                <th className="py-1 px-4 bg-gray-100 border border-gray-200">Alunos</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(alunosAgrupados).map((tutor, index) => (
                <tr key={index}>
                  <td className="py-1 px-4 border border-gray-200 text-xs">{tutor}</td>
                  <td className="py-1 px-4 border border-gray-200 text-xs">
                    <ul>
                      {alunosAgrupados[tutor].map((aluno: Aluno, alunoIndex: number) => (
                        <li key={alunoIndex} className="mb-2">{aluno.Nome}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FolhaA4>

      {/* Lista de todas as disciplinas */}
      <FolhaA4>
        <div>
          <table className="w-full border-collapse border border-gray-200 mt-2 text-xs">
            <thead>
              <tr>
                <th className="py-1 px-4 bg-gray-100 border border-gray-200">Disciplinas</th>
              </tr>
            </thead>
            <tbody>
              {disciplinasUnicasComNotas.map((disciplina, index) => (
                <tr key={index}>
                  <td className="py-1 px-4 border border-gray-200 text-xs">{disciplina.disciplina}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FolhaA4>

      {/* Lista de disciplinas com média das notas */}
      {disciplinasUnicasComNotas.map((disciplinaComNotas, index) => (
        <FolhaA4 key={index}>
          <div>
            Disciplina: {disciplinaComNotas.disciplina}
          </div>
          <div>
            Média dos Alunos: {calcularMedia(
              disciplinaComNotas.notas[0],
              disciplinaComNotas.notas[1]
            ).toFixed(2)}
          </div>

          <div>
            Alunos com Média Inferior a 6:
            <table className="w-full border-collapse border border-gray-200 mt-2 text-sm">
              <thead>
                <tr>
                  <th className="py-1 px-4 bg-gray-100 border border-gray-200">Nome</th>
                  <th className="py-1 px-4 bg-gray-100 border border-gray-200">Nota 1</th>
                  <th className="py-1 px-4 bg-gray-100 border border-gray-200">Nota 2</th>
                  <th className="py-1 px-4 bg-gray-100 border border-gray-200">Média</th>
                </tr>
              </thead>
              <tbody>
                {listarAlunosComMediaInferiorASeis(disciplinaComNotas.disciplina).map((aluno, alunoIndex) => (
                  <tr key={alunoIndex}>
                    <td className="py-1 px-4 border border-gray-200 text-xs">{aluno.Nome}</td>
                    <td className="py-1 px-4 border border-gray-200 text-xs">{aluno.Disciplinas[0]?.Nota_Bim_1}</td>
                    <td className="py-1 px-4 border border-gray-200 text-xs">{aluno.Disciplinas[0]?.Nota_Bim_2}</td>
                    <td className="py-1 px-4 border border-gray-200 text-xs">{calcularMedia(
                      parseFloat(aluno.Disciplinas[0]?.Nota_Bim_1),
                      parseFloat(aluno.Disciplinas[0]?.Nota_Bim_2)
                    ).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FolhaA4>
      ))}
    </div>
  );
};

export default Page;
