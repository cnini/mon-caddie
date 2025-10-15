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
 * @throws {Error} If the product already exists by its name.
 */
export const createProduct = async (
    name: string
): Promise<void> => {
    const { error } = await supabase
        .from("products")
        .insert({ name: name });

    if (error) throw new Error("Il existe déjà.");
}