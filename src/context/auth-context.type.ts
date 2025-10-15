import type { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";

type AuthContextType = {
    session: Session | null;
    user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null
});