import React from 'react';
import { FolhaA4 } from "@/components/FolhaA4/folhaa4";
import { cursos } from "@/utils/codcursos";
import { agruparAlunosPorTutor, extractUniqueDisciplines, contarAlunos, calculateAverageForDiscipline } from '@/utils/utilidades';

interface Aluno {
  Matrícula: string;
  Turma: string;
  Nome: string;
  Tutor: string;
  Status:string
  Disciplinas: {
    Disciplina: string;
    Nota_Bim_1: string;
    Nota_Bim_2: string;
    Nota_Bim_3: string;
    Nota_Bim_4: string;
    Média_Parcial_12:string
    Situação: string;
  }[];
}
type AlunosAgrupados = { [key: string]: Aluno[] };

async function pegaCurso(cod: string) {
  const res = await fetch(`https://mpfaraujo.com.br/api/boletim/curso?codigo_curso=${cod}`, { cache: "no-cache" });
  return res.json();
}

const Page = async ({ params }: { params: { curso: string } }) => {
  const alunos: Aluno[] = await pegaCurso(params.curso);
  const curso = cursos.find(item => item.cod === params.curso);


  const alunosAgrupados:AlunosAgrupados = agruparAlunosPorTutor(alunos) as AlunosAgrupados

  const disciplinasDoCurso = extractUniqueDisciplines(alunos) //array com os nomes das disciplinas

  return (
    <div >
      <FolhaA4>
        <div className='m-4'>
          No programa de Tutoria há {alunos.length} alunos de {curso?.Nome}. Sendo que há<span> </span>  
          {contarAlunos(alunos).ingressantes} {contarAlunos(alunos).ingressantes===1?" ingressante":" ingressantes"},<span> </span>
          {contarAlunos(alunos).repetentes} {contarAlunos(alunos).repetentes===1?" repetente":" repetentes"} e <span> </span> 
          {contarAlunos(alunos).segundoAno} no 2<sup><u>o</u></sup> Ano.
        </div>
        <div>
          <h1 className="textlg text-center py-2">Distribuição dos alunos por Tutor:</h1>
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
                      {(alunosAgrupados[tutor] as Aluno[]).map((aluno: Aluno, alunoIndex: number) => (
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
        <div className='m-4'>
          <table className="w-full border-collapse border border-gray-200 mt-2 text-xs">
            <thead>
              <tr>
                <th className="py-1 px-4 bg-gray-100 border border-gray-200">Disciplinas</th>
              </tr>
            </thead>
            <tbody>
              {disciplinasDoCurso.map((disciplina, index) => (
                <tr key={index}>
                  <td className="py-1 px-4 border border-gray-200 text-xs">{disciplina}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FolhaA4>

      {disciplinasDoCurso.map(async (disc)=>{
        const alunosdisc = await pegaCurso(`${params.curso}&disciplina=${disc}`)
        return (<div key={disc}>
          <FolhaA4>
            <div className='m-4'>
              <h1 className='text-lg text-center'>{disc}</h1>
<p>A média de todos os estudantes em {disc} é igual a <span className='text-red-500'> {calculateAverageForDiscipline(alunosdisc, disc)}</span></p>
<div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-1 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Nome do Aluno
            </th>
            <th className="px-6 py-1 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-1 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Média
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {alunosdisc.map((aluno:Aluno, index:number) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="px-6 py-1 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                {aluno.Nome}
              </td>
              <td className="px-6 py-1 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {aluno.Status}
              </td>
              <td className="px-6 py-1 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                {aluno.Disciplinas[0].Média_Parcial_12}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            </div>
          </FolhaA4>
        </div>)
      })}

      {/* Lista de disciplinas com média das notas */}
      {/* {disciplinasUnicasComNotas.map((disciplinaComNotas, index) => (
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
      ) */}
      {/* )} */}
    </div>
  );
};

export default Page;
