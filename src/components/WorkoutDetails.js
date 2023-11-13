const WorkoutDetails = ({ workout }) => {
	return (
		<div className="workout-details">
			<h4>{workout.title}</h4>
			<p>
				Load (kg): <strong>{workout.load}</strong>
			</p>
			<p>
				Reps : <strong>{workout.reps}</strong>
			</p>
			<p>{workout.createdAt}</p>
		</div>
	);
};

export default WorkoutDetails;
