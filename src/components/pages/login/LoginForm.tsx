import { useState, type FormEvent } from "react";
import { signIn, signOut, signUp } from "../../../services/auth.service";
import { useAuth } from "../../../context/useAuth";

export default function LoginForm() {
    const { user } = useAuth(); // Current logged user

    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [firstname, setFirstname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const resetFieldState = () => {
        if (!isRegistered) {
            setFirstname("");
        }

        setEmail("");
        setPassword("");
    }

    const handleSwitchingForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setIsRegistered(!isRegistered);
        resetFieldState();
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); 

        setErrorMessage("");

        try {
            if (!isRegistered) {
                await signUp(firstname, email, password);
                alert(`Bonjour ${firstname} !`);
            } else {
                await signIn(email, password);
                alert("Connecté(e) !");
            }

            resetFieldState();
        } catch (e: unknown) {
            if (e instanceof Error) {
                setErrorMessage(e.message);
            }
        }
    }

    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        signOut();
        setIsRegistered(false);
        console.log("Déconnecté(e) !");
    }

    return (
        <div>
            { !user ? (
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
                        { errorMessage && (<p>{errorMessage}</p>) }
                    </form>
                    <br />
                    <button onClick={handleSwitchingForm}>
                        { isRegistered ? ("Pas encore de compte ? Créez-le.") : ("Déjà inscrit(e) ? Authentifiez-vous.") }
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Utilisateur déjà connecté : {user.email}</h2>
                    <br />
                    <button onClick={handleLogout}>Se déconnecter</button>
                </div>
            ) }
        </div>
    )
}
