import { supabase } from "../supabaseClient";
import type { Session, User, WeakPassword } from "@supabase/supabase-js";

type AuthData = {
    session: Session | null;
    user: User | null;
    weakPassword?: WeakPassword | null;
} | {
    session: null;
    user: null;
    weakPassword?: null;
};

/**
 * Creates a new user in Supabase with a firstname, an email and a password.
 * 
 * @throws {Error} If the email is already in Supabase.
 * @returns The created user and session data.
 */
export const signUp = async (
    fisrtname: string, 
    email: string, 
    password: string
): Promise<AuthData> => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { first_name: fisrtname }
        }
    });

    if (error) throw new Error(error.message);

    return data;
}

/**
 * Signs in an existing user with an email and a password.
 * 
 * @throws {Error} If the account doesn't exist or the email and password combination is wrong.
 * @returns The matching user and session data.
 */
export const signIn = async (
    email: string,
    password: string
): Promise<AuthData> => {  
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) throw new Error(error.message);

    return data;
}

/**
 * Signs out the current user.
 * 
 * @throws {Error} 
 */
export const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
}