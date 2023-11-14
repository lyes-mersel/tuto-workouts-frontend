import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";

export const useWorkoutsContext = () => {
	const context = useContext(WorkoutsContext);

	if (!context) {
		throw Error(
			"useWorkoutsContext must be used inside a WourkoutsContextProvider"
		);
	}

	return context;
};
