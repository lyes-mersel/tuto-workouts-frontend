import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
	const { dispatch: dispatchAuth } = useAuthContext();
	const { dispatch: dispatchWorkouts } = useWorkoutsContext();

	const logout = () => {
		// delete user from storage
		localStorage.removeItem("user");

		// dispatch logout action
		dispatchAuth({ type: "LOGOUT" });

		// delete the workouts from the WorkoutContext
		dispatchWorkouts({ type: "SET_WORKOUTS", payload: null });
	};

	return { logout };
};
