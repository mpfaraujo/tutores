import {Media} from "@/utils/compara"
export default function Home() {
  return (
   <main> Vamos ver:<br/>

   <div>{Media(1, 1)}</div>
   <div>{Media(3, 2)}</div>
   <div>{Media(3, 6)}</div>
   </main>
  )
}
