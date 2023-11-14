import { useEffect } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext();

	useEffect(() => {
		const fechWorkouts = async () => {
			const response = await fetch("/api/workouts");
			const json = await response.json();
			if (response.ok) {
				dispatch({ type: "SET_WORKOUTS", payload: json });
			}
		};
		fechWorkouts();
	}, []);

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => (
						<WorkoutDetails key={workout._id} workout={workout}>
							{workout.title}
						</WorkoutDetails>
					))}
			</div>
			<WorkoutForm />
		</div>
	);
};

export default Home;
