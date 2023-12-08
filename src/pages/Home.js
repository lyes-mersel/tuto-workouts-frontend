import { useEffect } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
// hooks
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
	const { user } = useAuthContext();
	const { workouts, dispatch } = useWorkoutsContext();

	useEffect(() => {
		const fechWorkouts = async () => {
			const response = await fetch("/api/workouts", {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			const json = await response.json();
			if (response.ok) {
				dispatch({ type: "SET_WORKOUTS", payload: json });
			}
		};
		if (user) {
			fechWorkouts();
		}
	}, [dispatch, user]);

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => (
						<WorkoutDetails key={workout._id} workout={workout} />
					))}
			</div>
			<WorkoutForm />
		</div>
	);
};

export default Home;
