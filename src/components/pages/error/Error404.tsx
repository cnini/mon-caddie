import { Link } from "react-router";

export default function Error404() {
    return (
        <div>
            <h1>Erreur 404</h1>
            <br />
            <p>Cette page n'existe pas.</p>
            <Link to="/">
                <button>Retourner sur la page d'accueil</button>
            </Link>
        </div>
    )
}
