import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch("/api/user/login", {
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

	return { login, isLoading, error };
};
