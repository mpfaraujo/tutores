import dados from '@/utils/tutorMatricula.json'
import Link from 'next/link'

export default function Home() {
  const tutores = dados
  return (
    <main className="text-center mx-auto max-w-screen-md">
      <h1 className="text-2xl mb-4">Gerar relatório dos Tutores</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Tutor</th>
            <th className="p-2">ID</th>
          </tr>
        </thead>
        <tbody>
          {tutores.map((tutor, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="p-2">{tutor.Tutor}</td>
              <td className="p-2">
                <Link href={`./tutor/${tutor.id}`} className="text-blue-500">
                  {tutor.id}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

