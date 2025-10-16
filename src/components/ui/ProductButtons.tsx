import { decreaseProductQuantity, increaseProductQuantity, type ListProduct } from "../../services/list_product.service";

type ProductButtonsProps = {
    listProduct: ListProduct|null;
};

export default function ProductButtons({ listProduct }: ProductButtonsProps) {
    const handleIncrease = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (listProduct) increaseProductQuantity(listProduct);
    }

    const handleDecrease = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (listProduct) decreaseProductQuantity(listProduct);
    }

    return (
        <div>
            <button>Modifier</button>
            <button onClick={handleIncrease}>Ajouter</button>
            <button onClick={handleDecrease}>Retirer</button>
        </div>
    )
}
