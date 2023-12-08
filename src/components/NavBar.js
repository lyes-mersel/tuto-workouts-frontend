import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
	const { user } = useAuthContext();
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
					{user ? (
						<div>
							<span>{user.email}</span>
							<button onClick={handleClick}>Logout</button>
						</div>
					) : (
						<div>
							<Link to="/login">Log in</Link>
							<Link to="/signup">Sign up</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};

export default NavBar;
