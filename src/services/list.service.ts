import type { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

export type List = {
    id: number;
    user_id: string;
    is_closed: boolean;
    created_at: string;
    updated_at: string | null;
}

/**
 * Creates a list with a user.
 * 
 * @throws {Error} If list cannot be created.
 */
export const createList = async (
    user: User
): Promise<List[]> => {
    const { data, error } = await supabase
        .from("lists")
        .insert({ user_id: user.id })
        .select();

    if (error) throw new Error("List cannot be created.");

    return data;
}

/**
 * Fetches list with a user and a state ("opened" or "closed").
 * 
 * @throws {Error} If list does not exist.
 */
export const getListByUser = async (
    user: User,
    list_state: string
): Promise<List[]> => {
    const { data, error } = await supabase
        .from("lists")
        .select()
        .eq("user_id", user.id)
        .eq("is_closed", list_state === "closed");

    if (error) throw new Error("List cannot be fetched.");

    return data ?? [];
}