import { useState } from "react";
import { createHabit } from "../../services/api";

function CreateHabit() {
  const [habit, setHabit] = useState({ name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setHabit({ name: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await createHabit(habit);
      if (response.errors) {
        setError(response.errors.error || "Couldn't create habit");
        return;
      }
      setHabit({ name: "" });
    } catch (err) {
      setError(err.message || "Couldn't create habut");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Create Habit</h3>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Habit name: </label>
        <input name="name" value={habit.name} onChange={handleChange} placeholder="10 pushups daily" />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Habit..." : "Create Habit"}
        </button>
      </form>
    </div>
  );
}

export default CreateHabit;
