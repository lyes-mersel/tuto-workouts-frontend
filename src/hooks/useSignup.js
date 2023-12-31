import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const signup = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch("https://tuto-workout-api.onrender.com/api/user/signup", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const json = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(json.mssg);
		}
		if (response.ok) {
			//save the user (email + token) to lacal storage
			localStorage.setItem("user", JSON.stringify(json));

			// update the Auth Context
			dispatch({ type: "LOGIN", payload: json });

			setIsLoading(false);
		}
	};

	return { signup, isLoading, error };
};
