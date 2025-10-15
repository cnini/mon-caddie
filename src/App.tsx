import Login from "./components/pages/login/Login";
import { AuthProvider } from "./context/AuthContext";
// import './App.css'

function App() {
    return (
        <AuthProvider>
            <Login />
        </AuthProvider>
    )
}

export default App