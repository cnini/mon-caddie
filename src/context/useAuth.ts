import { useContext } from "react";
import { AuthContext } from "./auth-context.type";

export const useAuth = () => useContext(AuthContext);