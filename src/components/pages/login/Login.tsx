import LoginForm from "./LoginForm";

export default function Login() {

    return (
        <div>
            <h1>Bienvenue sur votre caddie !</h1>
            <br />
            <h2>Pas encore de compte ?</h2>
            <LoginForm />
            <br />
            <a href="#">Déjà inscrit(e) ? Authentifiez-vous.</a>
        </div>
    )
}
