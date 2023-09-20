import { FolhaA4 } from "@/components/FolhaA4/folhaa4"
import data from '@/utils/tutorMatricula.json'
import { Boletim } from '@/components/boletim'
import Image from "next/image"


async function pegaAluno(matricula: string) {
    const aluno = await fetch(`https://mpfaraujo.com.br/api/boletim/aluno?matricula=${matricula}`, { next: { revalidate: 60 } })
    return aluno.json()
}

export default function Page ({params}:{params:{id:string}}){

    const tutor = data.find(e => e.id === params.id)


    return <div>
        <>
                    <FolhaA4>
                    <div>
                        <h1 className="text-xl">{tutor?.Tutor}</h1>
                    Você tem {tutor?.tutorandos.length} {tutor?.tutorandos.length===1? "tutorando":(tutor?.tutorandos.length ===0?"Você não tem tutorandos":"tutorandos")}.
                    </div>
                    <div>
                        Para cada tutorando vc verá a lista com as disciplinas que ele está cursando e alguns símbolos para analisar a situação do aluno:
                    </div>
                    <div className='flex items-center'>
                        <span className="p-3"><Image width={50} height={80} src='/notaboa.svg' alt=''/></span>
                        <span className='m-3'>O aluno está acima da média (Média maior que 6).</span>
                    </div>
                    <div className='flex items-center'>
                        <span className="p-3"><Image width={50} height={80} src='/maisoumenos.svg' alt=''/></span>
                        <span className='m-3'>O aluno está abaixo, mas próximo da média (Média entre 4 e 6).</span>
                    </div>
                    <div className='flex items-center'>
                        <span className="p-3"><Image width={50} height={80} src='/notaruim.svg' alt=''/></span>
                        <span className='m-3'>O aluno está em risco de reprovação por média (Média inferior a 4)</span>
                    </div>
                    <div className='flex items-center'>
                        <span className="p-3"><Image width={50} height={80} src='/subiu.svg' alt=''/></span>
                        <span className='m-3'>O aluno aumentou sua nota (do 1<sup>o</sup> para o 2<sup>o</sup> Trim.).</span>
                    </div>
                    <div className='flex items-center'>
                        <span className="p-3"><Image width={50} height={80} src='/estagnou.svg' alt=''/></span>
                        <span className='m-3'>O aluno manteve sua nota(do 1<sup>o</sup> para o 2<sup>o</sup> Trim.).</span>
                    </div>
                    <div className='flex items-center'>
                        <span className="p-3"><Image width={50} height={80} src='/desceu.svg' alt=''/></span>
                        <span className='m-3'>O aluno diminuiu sua nota (do 1<sup>o</sup> para o 2<sup>o</sup> Trim.).</span>
                    </div>
                    </FolhaA4>

                    {tutor?.tutorandos.map(async (tutorando, index) => {
                        const aluno = await pegaAluno(tutorando.Matrícula)
                        
                        return (
                            <FolhaA4 key={tutorando.Nome}>
                                <span className="text-indigo-800 bg-gray-100 w-full">{tutorando.Nome}</span>
                                <Boletim disciplinas={aluno.Disciplinas} />
                            </FolhaA4>)
                    })}

                </>

    </div>
}