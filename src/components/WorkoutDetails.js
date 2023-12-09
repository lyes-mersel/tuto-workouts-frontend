import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns";

const WorkoutDetails = ({ workout }) => {
	const { user } = useAuthContext();
	const { dispatch } = useWorkoutsContext();

	const handleClick = async () => {
		if (!user) {
			return;
		}

		const response = await fetch("https://tuto-workout-api.onrender.com/api/workouts/" + workout._id, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_WORKOUT", payload: json });
		}
	};

	return (
		<div className="workout-details">
			<h4>{workout.title}</h4>
			<p>
				Load (kg): <strong>{workout.load}</strong>
			</p>
			<p>
				Reps : <strong>{workout.reps}</strong>
			</p>
			<p>
				{formatDistanceToNow(new Date(workout.createdAt), {
					addSuffix: true,
				})}
			</p>
			<span className="material-symbols-outlined" onClick={handleClick}>
				delete
			</span>
		</div>
	);
};

export default WorkoutDetails;
