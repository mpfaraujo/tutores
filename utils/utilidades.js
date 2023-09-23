// JSON fornecido
const data = [
    // ... (seu JSON aqui)
  ];
  
  // Função para extrair disciplinas únicas sem o código
export   function extractUniqueDisciplines(data) {
    const uniqueDisciplines = new Set();
    data.forEach((student) => {
      student.Disciplinas.forEach((discipline) => {
        const disciplineName = discipline.Disciplina.split(' - ')[1]; // Remove o código da disciplina
        uniqueDisciplines.add(disciplineName);
      });
    });
    return Array.from(uniqueDisciplines);
  }

  export // Função para calcular a média das notas dos dois primeiros bimestres
  function calculateAverageGrades(data) {
    const result = [];
  
    data.forEach((student) => {
      const studentData = {
        Matrícula: student.Matrícula,
        Turma: student.Turma,
        Nome: student.Nome,
        Tutor: student.Tutor,
        Disciplinas: [],
      };
  
      student.Disciplinas.forEach((discipline) => {
        const average =
          (parseFloat(discipline.Nota_Bim_1) + parseFloat(discipline.Nota_Bim_2)) / 2;
  
        const disciplineData = {
          Disciplina: discipline.Disciplina,
          Média_Bimestres_1_2: average.toFixed(2), // Média com duas casas decimais
        };
  
        studentData.Disciplinas.push(disciplineData);
      });
  
      result.push(studentData);
    });
  
    return result;
  }
 // Função para filtrar alunos com média abaixo de 6 em uma disciplina específica
 export function filterStudentsByAverage(data, disciplinaAlvo) {
    const filteredStudents = [];
  
    data.forEach((student) => {
      student.Disciplinas.forEach((discipline) => {
        const nomeDisciplina = discipline.Disciplina.split(" - ")[1];
        
        if (nomeDisciplina === disciplinaAlvo) {
          const average = parseFloat(discipline.Média_Bimestres_1_2);
          
          if (average < 6) {
            filteredStudents.push({
              Matrícula: student.Matrícula,
              Turma: student.Turma,
              Nome: student.Nome,
              Tutor: student.Tutor,
              Disciplina: discipline.Disciplina,
              Média_Bimestres_1_2: average.toFixed(2),
            });
          }
        }
      });
    });
  
    return filteredStudents;
  }

  export function calculateAverageForDiscipline(data, disciplinaAlvo) {
    let totalMedia = 0;
    let totalStudents = 0;
  
    data.forEach((student) => {
      student.Disciplinas.forEach((discipline) => {
        const nomeDisciplina = discipline.Disciplina.split(" - ")[1].trim();
  
        if (nomeDisciplina === disciplinaAlvo) {
          const mediaAluno = parseFloat(discipline.Média_Parcial_12);
  
          console.log(`Média do aluno: ${mediaAluno}`);
  
          totalMedia += mediaAluno;
          totalStudents += 1;
        }
      });
    });
  
    console.log(`Total de alunos na disciplina ${disciplinaAlvo}: ${totalStudents}`);
  
    if (totalStudents === 0) {
      return 0; // Retorna 0 se nenhum aluno estiver na disciplina especificada.
    }
  
    return (totalMedia / totalStudents).toFixed(2);
  }
  
  
  export function contarAlunos(data) {
    let ingressantes = 0;
    let repetentes = 0;
    let segundoAno = 0;
  
    for (const aluno of data) {
      if (aluno.Status === 'INGRESSANTE') {
        ingressantes++;
      } else if (aluno.Status === 'REPETENTE') {
        repetentes++;
      } else if (aluno.Status === '2oANO') {
        segundoAno++;
      }
    }
  
    return {
      ingressantes,
      repetentes,
      segundoAno,
    };
  }

  export const agruparAlunosPorTutor = (alunos) => {
    const alunosAgrupados = {};

    alunos.forEach((aluno) => {
      const { Nome, Tutor } = aluno;

      if (!alunosAgrupados[Tutor]) {
        alunosAgrupados[Tutor] = [];
      }

      alunosAgrupados[Tutor].push(aluno);
    });

    return alunosAgrupados;
};
  