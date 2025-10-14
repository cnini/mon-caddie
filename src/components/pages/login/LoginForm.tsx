import { useState, type FormEvent } from "react";

export default function LoginForm() {
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [firstname, setFirstname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const resetFieldState = () => {
        if (!isRegistered) {
            setFirstname("");
        }

        setEmail("");
        setPassword("");
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsRegistered(!isRegistered);

        resetFieldState();
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault(); 

        if (!isRegistered) {
            alert(`Bonjour ${firstname} !`);
        } else {
            alert("Connecté(e) !");
        }

        resetFieldState();
    }

    return (
        <div>
            <h2>{ isRegistered ? ("Déjà inscrit(e) ?") : ("Pas encore de compte ?") }</h2>
            <form onSubmit={handleSubmit}>
                { !isRegistered && (
                    <>
                        <div>
                            <label>Prénom</label>
                            <br />
                            <input type="text" placeholder="Marie" required 
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)} />
                        </div>
                        <br />
                    </>
                ) }
                <div>
                    <label>Adresse mail</label>
                    <br />
                    <input type="email" placeholder="marie@mail.com" required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <br />
                <div>
                    <label>Mot de passe</label>
                    <br />
                    <input type="password" placeholder="*********" required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />
                <div>
                    <button>{ !isRegistered ? ("S'inscrire") : ("Accéder à votre espace") }</button>
                </div>
            </form>
            <br />
            <button onClick={handleClick}>
                { isRegistered ? ("Pas encore de compte ? Créez-le.") : ("Déjà inscrit(e) ? Authentifiez-vous.") }
            </button>
        </div>
    )
}
