import { Routes, Route } from "react-router";
import Login from "./components/pages/login/Login";
import { AuthProvider } from "./context/AuthContext";
// import './App.css'

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/auth" element={<Login />} />
            </Routes>
        </AuthProvider>
    )
}

export default App