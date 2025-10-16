import { useEffect, useState } from "react";
import type { ListProduct } from "../../services/list_product.service";
import { getProductById, type Product } from "../../services/product.service";

type ProductProps = {
    key: number;
    listProduct: ListProduct|null;
};

export default function ProductItem({ listProduct }: ProductProps) {
    // useState variables
    const [product, setProduct] = useState<Product|null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (!listProduct) return;

        const getProduct = async () => {
            try {
                setProduct((await getProductById(listProduct.product_id))[0]);
                setQuantity(listProduct.quantity);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
            }
        }

        getProduct();
    }, [listProduct]);


    return (
        <li>{quantity}x {product?.name}</li>
    )
}
