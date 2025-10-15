import { supabase } from "../supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

type AuthData = {
    session: Session | null;
    user: User | null;
} | {
    session: null;
    user: null;
};

/**
 * Creates a new user in Supabase with a firstname, an email and a password.
 * 
 * @throws {Error} If the email is already in Supabase.
 * @returns The created user and session data.
 */
export const signUp = async (
    userFisrtname: string, 
    userEmail: string, 
    userPassword: string
): Promise<AuthData> => {
    const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
        options: {
            data: { first_name: userFisrtname }
        }
    });

    if (error) {
        throw new Error(error?.message);
    }

    return data;
}

/**
 * Signs out the current user.
 * 
 * @throws {Error} 
 */
export const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error?.message);
    }
}