import { FolhaA4 } from "@/components/FolhaA4/folhaa4";
import { cursos } from "@/utils/codcursos";
import {extractUniqueDisciplines, calculateAverageGrades, filterStudentsByAverage, calculateAverageForDiscipline} from '@/utils/utilidades'

interface Aluno {
  Matrícula: string;
  Turma: string;
  Nome: string;
  Tutor: string;
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

async function pegaCurso(cod: string) {
    const res = await fetch(`https://mpfaraujo.com.br/api/boletim/curso?codigo_curso=${cod}`, { cache: "no-cache" });
    return res.json();
  }

const Page = async()=>{
const alunos = await pegaCurso("INFO")
const disciplinas = extractUniqueDisciplines(alunos)
const medias = calculateAverageGrades(alunos)
const abaixode6emMatematica = filterStudentsByAverage(medias, "GEOGRAFIA")
const mediaGeografia = calculateAverageForDiscipline(medias, "GEOGRAFIA")
return (<div>

        <pre>{JSON.stringify(mediaGeografia, null, 2)}</pre>

</div>)


}

export default Page