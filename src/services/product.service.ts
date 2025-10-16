import { supabase } from "../supabaseClient";

export type Product = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string | null;
}

/**
 * Create a new product with a name.
 * 
 * @throws {Error} If the product cannot be created.
 */
export const createProduct = async (
    name: string
): Promise<Product[]> => {
    const { data, error } = await supabase
        .from("products")
        .insert({ name: name })
        .select();

    if (error) throw new Error("Product cannot be created.");

    return data;
}

/**
 * Fetches a product by its id.
 * 
 * @throws {Error} If the product does not exist.
 */
export const getProductById = async (
    id: number
): Promise<Product[]> => {
    const { data, error } = await supabase
        .from("products")
        .select()
        .eq("id", id);

    if (error) throw new Error("Product does not exists.");

    return data;
}

/**
 * Fetches a product by its name.
 * 
 * @throws {Error} If the product does not exist.
 */
export const getProductByName = async (
    name: string
): Promise<Product[]> => {
    const { data, error } = await supabase
        .from("products")
        .select()
        .ilike("name", name); // example success case : Water === water

    if (error) throw new Error("Product does not exists.");

    return data;
}