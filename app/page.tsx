import Link from "next/link"

export default function Page(){
    return (
    <main className="text-center mx-auto max-w-screen-md">
        <h1 className="text-2xl mb-4">Página para gerar relatórios da tutoria</h1>

        <p>Índice de tutores para <Link className="text-blue-500" href='/reltut'>gerar relatórios</Link></p>
        <p>Índice dos cursos para <Link className="text-blue-500" href='/relcurs'>gerar relatórios</Link></p>
    </main>)}