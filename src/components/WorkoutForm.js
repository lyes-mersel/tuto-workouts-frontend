import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
	const { user } = useAuthContext();
	const { dispatch } = useWorkoutsContext();
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	const [error, setError] = useState(null);
	const [emptyFileds, setEmptyFields] = useState([]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!user) {
			setError("You must be logged in");
			return;
		}

		const workout = { title, load, reps };

		const response = await fetch("https://tuto-workout-api.onrender.com/api/workouts", {
			method: "POST",
			body: JSON.stringify(workout),
			headers: {
				Authorization: `Baerer ${user.token}`,
				"Content-Type": "application/json",
			},
		});
		const json = await response.json();

		if (response.ok) {
			setTitle("");
			setLoad("");
			setReps("");
			setError(null);
			setEmptyFields([]);
			dispatch({ type: "CREATE_WORKOUT", payload: json });
		} else {
			setError(json.error);
			setEmptyFields(json.emptyFields);
		}
	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h2>Add a New Workout</h2>

			<label>Exercice Title:</label>
			<input
				type="text"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				className={emptyFileds.includes("title") ? "error" : ""}
			/>

			<label>Load (in Kg):</label>
			<input
				type="number"
				value={load}
				onChange={(event) => setLoad(event.target.value)}
				className={emptyFileds.includes("load") ? "error" : ""}
			/>

			<label>Reps:</label>
			<input
				type="number"
				value={reps}
				onChange={(event) => setReps(event.target.value)}
				className={emptyFileds.includes("reps") ? "error" : ""}
			/>

			<button>Add Workout</button>

			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default WorkoutForm;
