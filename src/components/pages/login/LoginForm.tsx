import { useState, type FormEvent } from "react";

export default function LoginForm() {
    const [firstname, setFirstname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault(); 
        alert(`Bonjour ${firstname} !`);

        setFirstname("");
        setEmail("");
        setPassword("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prénom</label>
                    <br />
                    <input type="text" placeholder="Marie" required 
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <br />
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
                    <button>S'inscrire</button>
                </div>
            </form>
        </div>
    )
}
