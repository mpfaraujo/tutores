import Link from "next/link"
import {cursos} from '@/utils/codcursos'
const Page = ()=>{

    return (<main className="text-center mx-auto max-w-screen-md">
      <h1 className="text-2xl mb-4">Gerar relatório dos Cursos</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Curso</th>
            <th className="p-2">Cod.</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="p-2">{curso.Nome}</td>
              <td className="p-2">
                <Link href={`./cursos/${curso.cod}`} className="text-blue-500">
                  {curso.cod}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>)
}

export default Page