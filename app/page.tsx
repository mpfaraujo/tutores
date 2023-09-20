import dados from '@/utils/tutorMatricula.json'
import Link from 'next/link'
export default function Home() {
  const tutores = dados
  return (
   <main className='text-2xl m-auto'> Gerar relatório dos Tutores:<br/>
   {tutores.map((tutor, index)=>{
    return <>
    <div><span className='m-2'>{tutor.Tutor}
      </span>
      <span className='m-2'><Link href={`./tutor/${tutor.id}`} className='text-blue-500'>{tutor.id}</Link></span>
    </div>
    
    </>
   })}

   </main>
  )
}
