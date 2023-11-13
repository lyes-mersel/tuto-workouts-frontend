import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & routes
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<div className="pages">
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
