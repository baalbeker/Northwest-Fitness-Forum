import { useState } from "react";

const CalorieCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goal, setGoal] = useState("maintain");
  const [rate, setRate] = useState("0.0");
  const [calories, setCalories] = useState("");


  const calculateCalories = () => {
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let activityFactor;
    if (activityLevel === "sedentary") {
      activityFactor = 1.2;
    } else if (activityLevel === "lightlyActive") {
      activityFactor = 1.375;
    } else if (activityLevel === "moderatelyActive") {
      activityFactor = 1.55;
    } else if (activityLevel === "veryActive") {
      activityFactor = 1.725;
    } else {
      activityFactor = 1.9;
    }

    let calorieGoal;
    if (goal === "lose") {
      calorieGoal = bmr - (parseFloat(rate) * 1000);
    } else if (goal === "gain") {
      calorieGoal = bmr + (parseFloat(rate) * 1000);
    } else {
      calorieGoal = bmr;
    }

    const result = Math.round(calorieGoal * activityFactor);
    setCalories(result);
  };
  return (
    <div>
      <label>
        Weight (kg):
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </label>
      <label>
        Height (cm):
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Activity Level:
        <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
          <option value="sedentary">Sedentary</option>
          <option value="lightlyActive">Lightly Active</option>
          <option value="moderatelyActive">Moderately Active</option>
          <option value="veryActive">Very Active</option>
          <option value="extraActive">Extra Active</option>
        </select>
      </label>
      <label>
        Weight Goal:
        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="maintain">Maintain</option>
          <option value="lose">Lose Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
      </label>
      {goal !== "maintain" && (
        <label>
          Rate:
          <select value={rate} onChange={(e) => setRate(e.target.value)}>
            <option value="0.25">Lose/Gain 0.25 kg per week</option>
            <option value="0.5">Lose/Gain 0.5 kg per week</option>
            <option value="0.75">Lose/Gain 0.75 kg per week</option>
            <option value="1.0">Lose/Gain 1 kg per week</option>
          </select>
        </label>
      )}
      <button onClick={calculateCalories}>Calculate Calories</button>
      {calories && (
        <p>
          You need {calories} calories per day to {goal === "maintain" ? "maintain your weight" : `${goal === "lose" ? "lose" : "gain"} ${rate} kg per week`}
        </p>
      )}
    </div>
  );
      }
  
      export default CalorieCalculator