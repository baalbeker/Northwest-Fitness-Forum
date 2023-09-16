import{ useState } from "react";

const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [exercise, setExercise] = useState("");
  const [oneRepMax, setOneRepMax] = useState("");

  const handleWeightChange = (event) => {
    const value = event.target.value;
    if (value >= 1) {
      setWeight(value);
    }
  };

  const handleRepsChange = (event) => {
    const value = event.target.value;
    if (value >= 1 && value <= 10) {
      setReps(value);
    }
  };

  const handleExerciseChange = (event) => {
    setExercise(event.target.value);
  };

  const calculateOneRepMax = () => {
    let result;
    switch (exercise) {
      case "Squat":
        result = weight / (1.0278 - 0.0278 * reps);
        break;
      case "Bench Press":
        result = weight / (1.0278 - 0.0368 * reps);
        break;
      case "Deadlift":
        result = weight / (0.9678 - 0.0146 * reps);
        break;
      default:
        result = null;
    }
    if (result !== null) {
      setOneRepMax(result.toFixed(2));
    }
  };

  return (
    <div>
      <label>
        Weight:
        <input type="number" value={weight} onChange={handleWeightChange} />
      </label>
      <label>
        Reps:
        <input type="number" value={reps} onChange={handleRepsChange} />
      </label>
      <label>
        Exercise:
        <select value={exercise} onChange={handleExerciseChange}>
          <option value="">Select an exercise</option>
          <option value="Squat">Squat</option>
          <option value="Bench Press">Bench Press</option>
          <option value="Deadlift">Deadlift</option>
        </select>
      </label>
      <button onClick={calculateOneRepMax}>Calculate 1RM</button>
      {oneRepMax && <p>Your 1RM for {exercise} is {oneRepMax} kg</p>}
    </div>
  );
};

export default OneRepMaxCalculator;
