import { useState, type FormEvent } from "react";
import { signOut, signUp } from "../../../services/auth.service";
import { useAuth } from "../../../context/useAuth";

export default function LoginForm() {
    // Current logged user
    const { user } = useAuth();

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

    /**
     * Switches between the signup and login forms in one click.
     *
     * @description
     *      1. Toggles the boolean state `isRegistered` :
     *          - `false` = signup form
     *          - `true`  = login form
     *      2. Resets all the form fields.
     */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setIsRegistered(!isRegistered);
        resetFieldState();
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); 

        setErrorMessage("");

        if (!isRegistered) {
            try {
                await signUp(firstname, email, password);
                alert(`Bonjour ${firstname} !`);
                resetFieldState();
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setErrorMessage(e.message);
                }
            }
        } else {
            alert("Connecté(e) !");
            resetFieldState();
        }
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
                    <button onClick={handleClick}>
                        { isRegistered ? ("Pas encore de compte ? Créez-le.") : ("Déjà inscrit(e) ? Authentifiez-vous.") }
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Utilisateur déjà connecté : {user.email}</h2>
                    <br />
                    <button onClick={() => signOut()}>Se déconnecter</button>
                </div>
            ) }
        </div>
    )
}
