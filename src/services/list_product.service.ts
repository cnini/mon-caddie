import { supabase } from "../supabaseClient";
import type { List } from "./list.service";
import type { Product } from "./product.service";

export type ListProduct = {
    id: number;
    list_id: number;
    product_id: number;
    quantity: number;
    is_checked: boolean;
    created_at: string;
    updated_at: string | null;
}

/**
 * Creates a new list_product with a list and a product.
 * 
 * @throws {Error} If the list_product cannot be created.
 */
export const createListProduct = async (
    list: List,
    product: Product
): Promise<ListProduct[]> => {
    const { data, error } = await supabase
        .from("list_products")
        .insert({ list_id: list.id, product_id: product.id })
        .select();
    
    if (error) throw new Error("ListProduct cannot be created.");

    return data;
}

/**
 * Fetches list_products with a list.
 * 
 * @throws {Error} If list_products do not exist.
 */
export const getListProductsByList = async (
    list: List
): Promise<ListProduct[]> => {
    const { data, error } = await supabase
        .from("list_products")
        .select("*, lists(id, is_closed)")
        .eq("list_id", list.id)
        .eq("lists.is_closed", false);

    if (error) throw new Error("ListProducts cannot be fetched.");

    return data;
}

/**
 * Fetches list_products with a list and a product.
 * 
 * @throws {Error} If list_products do not exist.
 */
export const getListProductsByListAndProduct = async (
    list: List,
    product: Product
): Promise<ListProduct[]> => {
    const { data, error } = await supabase
        .from("list_products")
        .select("*, lists(id, is_closed), products(id)")
        .eq("list_id", list.id)
        .eq("lists.is_closed", false)
        .eq("product_id", product.id);

    if (error) throw new Error("ListProducts cannot be fetched.");

    return data;
}

export const increaseProductQuantity = async (
    listProduct: ListProduct
): Promise<void> => {
    const { error } = await supabase
        .from("list_products")
        .update({ 
            quantity: listProduct.quantity + 1,
            updated_at: new Date().toISOString()
         })
        .eq("id", listProduct.id);

    if (error) throw new Error(error.message);
}