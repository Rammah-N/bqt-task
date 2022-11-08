import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import 'reactflow/dist/style.css';
function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route exact path="*" element={<Home />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/register" element={<Register />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
