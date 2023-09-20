import {Media, Compara} from "@/utils/compara"

export const Boletim =({disciplinas}:{disciplinas:any[]})=>{
    return (
<table className="min-w-full leading-normal">
    <thead>
        <tr>
            <th className="    border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Disciplina</th>
            <th className="    border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                1<sup>o</sup> Tri.</th>
            <th className="    border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                2<sup>o</sup> Tri.</th>
            <th className="    border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Situação</th> </tr></thead>
    <tbody>
    {disciplinas.map((disciplina, index) => {
  if (disciplina.Situação === "Matrícula"&& disciplina.Disciplina!=="TECINT TUT - TUTORIA") {
    return (
      <tr key={disciplina.Disciplina + index}>
        <td className="    border-b border-gray-200 bg-white text-sm">
          {/* <p className="text-gray-900 whitespace-no-wrap">{disciplina.Disciplina}</p> */}
          <p className="text-gray-900 whitespace-no-wrap">{disciplina.Disciplina.includes(" - ")? disciplina.Disciplina.split(" - ")[1]:disciplina.Disciplina}</p>

        </td>
        <td className="    border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{disciplina.Nota_Bim_1}</p>
        </td>
        <td className="    border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{disciplina.Nota_Bim_2}</p>
        </td>
        <td className="border-b border-gray-200 bg-white text-sm flex">
          <span className="relative">{Media(disciplina.Nota_Bim_1, disciplina.Nota_Bim_2)}</span>
          <span className="relative">{Compara(disciplina.Nota_Bim_1, disciplina.Nota_Bim_2)}</span>
        </td>
      </tr>
    );
  } else {
    return null;
  }
})}


    </tbody>
</table>

    )
}

