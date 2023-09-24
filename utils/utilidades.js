// JSON fornecido
const data = [
    // ... (seu JSON aqui)
  ];
  
  // Função para extrair disciplinas únicas sem o código
// export   function extractUniqueDisciplines(data) {
//     const uniqueDisciplines = new Set();
//     data.forEach((student) => {
//       student.Disciplinas.forEach((discipline) => {
//         const disciplineName = discipline.Disciplina.split(' - ')[1]; // Remove o código da disciplina
//         uniqueDisciplines.add(disciplineName);
//       });
//     });
//     return Array.from(uniqueDisciplines);
//   }


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function extractUniqueDisciplinesOrdered(data) {
  const disciplineCount = {}; // Um objeto para contar quantos alunos estão abaixo de 6 em cada disciplina

  data.forEach((student) => {
    student.Disciplinas.forEach((discipline) => {
      const disciplineName = discipline.Disciplina.split(' - ')[1]; // Remove o código da disciplina

      if (!disciplineCount[disciplineName]) {
        disciplineCount[disciplineName] = 0;
      }

      // Verifique se a média é menor que 6 e incremente o contador
      if (parseFloat(discipline.Média_Parcial_12) < 6) {
        disciplineCount[disciplineName]++;
      }
    });
  });

  // Agora, crie um array de objetos para representar as disciplinas e a contagem de alunos abaixo de 6
  const disciplinesWithCount = Object.keys(disciplineCount).map((disciplineName) => ({
    Nome: disciplineName,
    abaixoDe6: disciplineCount[disciplineName],
  }));

  // Ordene o array com base no número de alunos abaixo de 6 em ordem decrescente
  disciplinesWithCount.sort((a, b) => b.abaixoDe6 - a.abaixoDe6);

  return disciplinesWithCount;
}





//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
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
  
          // console.log(`Média do aluno: ${mediaAluno}`);
  
          totalMedia += mediaAluno;
          totalStudents += 1;
        }
      });
    });
  
    // console.log(`Total de alunos na disciplina ${disciplinaAlvo}: ${totalStudents}`);
  
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
  

export function extrairTurma(codigoTurma) {
  // Use expressões regulares para extrair os dois primeiros caracteres da turma
  const match = codigoTurma.match(/^(\d+[AB])/);
  
  if (match) {
    // A correspondência [1] contém os dois primeiros caracteres da turma
    return match[1];
  }
  
  // Retorne um valor padrão se não for possível extrair a turma
  return 'Turma desconhecida';
}