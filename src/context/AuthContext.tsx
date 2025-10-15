import type { Session } from "@supabase/supabase-js";
import { useState, type ReactNode, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { AuthContext } from "./auth-context.type";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session|null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => setSession(data.session));

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            listener.subscription.unsubscribe();    
        };
    }, []);

    const user = session?.user ?? null;

    return (
        <AuthContext.Provider value={{ session, user }}>
            { children }
        </AuthContext.Provider>
    );
}