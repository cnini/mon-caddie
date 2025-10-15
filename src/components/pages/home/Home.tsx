import { useNavigate } from "react-router";
import { useAuth } from "../../../context/useAuth";
import { useEffect } from "react";
import List from "../../ui/List";

export default function Home() {
    // Routing must-have
    const { user } = useAuth(); // Current user
    const navigate = useNavigate();

    useEffect(() => {
        // Redirects the current and non logged in user to the login form.
        if (!user) navigate("/auth?form=login");
    }, [user, navigate]);

    return (
        <div>
            <h1>Bonjour {user?.user_metadata.first_name} !</h1>
            <br />
            <form>
                <input type="text" placeholder="Lait" required />
                <button>Ajouter</button>
            </form>
            <br />
            <section>
                <List />
            </section>
        </div>
    )
}
