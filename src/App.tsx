import { Routes, Route } from "react-router";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import { AuthProvider } from "./context/AuthContext";
import Error404 from "./components/pages/error/Error404";
// import './App.css'

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/auth" element={<Login />} />

                <Route path="*" element={<Error404 />} />
            </Routes>
        </AuthProvider>
    )
}

export default App