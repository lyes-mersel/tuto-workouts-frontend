import { useState } from "react";

const WorkoutForm = () => {
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const workout = { title, load, reps };

		const response = await fetch("/api/workouts", {
			method: "POST",
			body: JSON.stringify(workout),
			headers: {
				"content-type": "application/json",
			},
		});
		if (response.ok) {
			setTitle("");
			setLoad("");
			setReps("");
			setError(null);
		} else {
			response.json().then((data) => {
				setError(data.error);
			});
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
			/>

			<label>Load (in Kg):</label>
			<input
				type="number"
				value={load}
				onChange={(event) => setLoad(event.target.value)}
			/>

			<label>Reps:</label>
			<input
				type="number"
				value={reps}
				onChange={(event) => setReps(event.target.value)}
			/>

			<button>Add Workout</button>

			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default WorkoutForm;
