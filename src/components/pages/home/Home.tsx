import { useNavigate } from "react-router";
import { useAuth } from "../../../context/useAuth";
import { useEffect, useState, type FormEvent } from "react";
import List from "../../ui/List";
import { createProduct } from "../../../services/product.service";

export default function Home() {
    // Routing must-have
    const { user } = useAuth(); // Current user
    const navigate = useNavigate();

    // useState variables
    const [productName, setProductName] = useState<string>("");
    const [errorMessages, setErrorMessages] = useState<string>("");

    useEffect(() => {
        // Redirects the current and non logged in user to the login form.
        if (!user) navigate("/auth?form=login");
    }, [user, navigate]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        alert("handleSubmit");

        setErrorMessages("");

        try {
            await createProduct(productName);
            setProductName("");
        } catch (e: unknown) {
            if (e instanceof Error) {
                setErrorMessages(e.message);
            }
        }
    }

    return (
        <div>
            <h1>Bonjour {user?.user_metadata.first_name} !</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Lait" required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)} />
                <button>Ajouter</button>
                {errorMessages && (<p>{errorMessages}</p>)}
            </form>
            <br />
            <section>
                <List />
            </section>
        </div>
    )
}
