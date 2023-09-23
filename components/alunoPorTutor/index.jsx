import React from 'react';

export function TabelaAlunosPorTutor({ alunos }) {
  // Função auxiliar para agrupar os alunos por tutor
  function agruparAlunosPorTutor(alunos) {
    const alunosPorTutor = {};

    alunos.forEach((aluno) => {
      const { nome, tutor } = aluno;

      if (!alunosPorTutor[tutor]) {
        alunosPorTutor[tutor] = [];
      }

      alunosPorTutor[tutor].push(nome);
    });

    return alunosPorTutor;
  }

  const alunosAgrupadosPorTutor = agruparAlunosPorTutor(alunos);

  return (
    <table>
      <thead>
        <tr>
          <th>Tutor</th>
          <th>Alunos</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(alunosAgrupadosPorTutor).map((tutor) => (
          <tr key={tutor}>
            <td>{tutor}</td>
            <td>
              <ul>
                {alunosAgrupadosPorTutor[tutor].map((aluno) => (
                  <li key={aluno}>{aluno}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
