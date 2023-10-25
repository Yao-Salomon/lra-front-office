import Link from "next/link"

export default async function Connexion(){

    return(
        <div className="min-h-screen">
            <p>Page de connexion</p>
            <Link href="/"> Home</Link>
        </div>
    )
}