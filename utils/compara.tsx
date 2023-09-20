import Image from "next/image"
export function Media(a:any, b:any) {
    const M:number = (.5*(parseFloat(a) + parseFloat(b)))

    if (M > 0 && M <=4){

            return <Image width={33} height={33} alt="Nota Ruim" src="/notaruim.svg" />
}
 else if (M > 4 && M < 6) {
            return <Image width={33} height={33} alt="Mais ou Menos" src="/maisoumenos.svg"  />

} else  if (M>= 6) return <Image width={33} height={33} alt="Nota Ruim" src="/notaboa.svg"      />

}

export function Compara(a:any, b:any){
    const C:number = (parseFloat(a)-parseFloat(b))

    if (C > 0){
        return <Image width={33} height={33} alt="Caiu a nota" src="/desceu.svg" />        
    } else if (C<0){
        return <Image width={33} height={33} alt="Aumentou" src="/subiu.svg" />        
       } else   return <Image width={33} height={33} alt="Manteve" src="/estagnou.svg" />
   
}