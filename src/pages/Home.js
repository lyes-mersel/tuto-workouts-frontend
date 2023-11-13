import { useEffect, useState } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";

const Home = () => {
	const [workouts, setWorkouts] = useState(null);

	useEffect(() => {
		const fechWorkouts = async () => {
			const response = await fetch("/api/workouts");
			response.json().then((data) => {
				setWorkouts(data);
			});
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
		</div>
	);
};

export default Home;
