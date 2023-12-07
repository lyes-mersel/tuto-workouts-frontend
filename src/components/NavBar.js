import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const NavBar = () => {
	const { logout } = useLogout();

	const handleClick = () => {
		logout();
	};

	return (
		<header>
			<div className="container">
				<Link to="/">
					<h1>Workout Buddy</h1>
				</Link>
				<nav>
					<div>
						<button onClick={handleClick}>Logout</button>
					</div>
					<div>
						<Link to="/login">Log in</Link>
						<Link to="/signup">Sign up</Link>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default NavBar;
