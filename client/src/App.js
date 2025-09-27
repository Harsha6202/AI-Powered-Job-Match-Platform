import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { useEffect } from "react";
import "./styles/theme.css";

function App() {
	const user = localStorage.getItem("token");
	const location = useLocation();
	
	useEffect(() => {
		// Handle OAuth callback
		const params = new URLSearchParams(location.search);
		const token = params.get('token');
		const isAdmin = params.get('isAdmin');
		
		if (token) {
			localStorage.setItem("token", token);
			localStorage.setItem("isAdmin", isAdmin);
			window.location.href = "/";
		}
	}, [location]);

	return (
		<ThemeProvider>
			<Routes>
				{user && <Route path="/" exact element={<Main />} />}
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/forgot-password" exact element={<ForgotPassword />} />
				<Route path="/reset-password" exact element={<ResetPassword />} />
				<Route path="/" element={<Navigate replace to="/login" />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
