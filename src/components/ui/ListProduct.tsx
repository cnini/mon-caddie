import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import type { List } from "../../services/list.service";
import { getListProductsByList, type ListProduct } from "../../services/list_product.service";

type ListProductProps = {
    list: List|null;
};

export default function ListProduct({ list }: ListProductProps) {
    // useState variables
    const [listProducts, setListProducts] = useState<ListProduct[]>([]);

    useEffect(() => {
        if (!list) return;

        const getListProducts = async () => {
            try {
                const lps: ListProduct[] = await getListProductsByList(list);
                setListProducts(lps);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
            }
        }

        getListProducts();
    }, [list, listProducts]);

    return (
        <ul>
            { listProducts && listProducts.map((listProduct: ListProduct) => {
                return (<ProductItem key={listProduct.product_id} listProduct={listProduct} />)
            }) }
        </ul>
    )
}
