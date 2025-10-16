import { useNavigate } from "react-router";
import { useAuth } from "../../../context/useAuth";
import { useEffect, useState, type FormEvent } from "react";
import ListProduct from "../../ui/ListProduct";
import { createList, getListByUser, type List } from "../../../services/list.service";
import { createProduct, getProductByName, type Product } from "../../../services/product.service";
import { createListProduct, getListProductsByListAndProduct, type ListProduct as ListProductData } from "../../../services/list_product.service";

export default function Home() {
    // Routing must-have
    const { user } = useAuth(); // Current user
    const navigate = useNavigate();

    // useState variables
    const [productName, setProductName] = useState<string>("");
    const [openedList, setOpenedList] = useState<List|null>(null);

    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        // Redirects the current and non logged in user to the login form.
        if (!user) navigate("/auth?form=login");
    }, [user, navigate]);

    useEffect(() => {
        if (!user) return;
 
        const userOpenedList = async () => {
            try {
                const userList: List = (await getListByUser(user, "opened"))[0];

                if (userList) {
                    setOpenedList(userList);
                } else {
                    const newUserList: List = (await createList(user))[0];
                    setOpenedList(newUserList);
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setErrorMessage(e.message);
                }
            }
        }

        userOpenedList();
    }, [user]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        alert("handleSubmit");

        setErrorMessage("");

        if (!user) throw new Error("Not connected");

        try {
            // Fetches the existing product
            const p: Product = (await getProductByName(productName))[0];
            const product: Product = p ?? (await createProduct(productName))[0];

            if (openedList && product) {
                // Fetches the existing list product
                const lp: ListProductData = (await getListProductsByListAndProduct(openedList, product))[0];

                // If does not exist, creates a new list_product
                if (!lp) {
                    await createListProduct(openedList, product);
                }
            }

            setProductName("");
        } catch (e: unknown) {
            if (e instanceof Error) {
                setErrorMessage(e.message);
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
                {errorMessage && (<p>{errorMessage}</p>)}
            </form>
            <br />
            <section>
                <ListProduct list={openedList} />
            </section>
        </div>
    )
}
