import { useState } from "react";
import { deleteHabit, updateHabit, createCheckin } from "../../services/api";
import {} from "../../services/api";

function HabitList({ habits, loading, onDeleted }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [checkedToday, setCheckedToday] = useState(() => new Set());

  if (loading) return <p>Loading Habits...</p>;
  if (!habits.length) return <p>No habits yet</p>;

  const handleDelete = async (id) => {
    try {
      const result = await deleteHabit(id);
      if (!result.error && onDeleted) {
        onDeleted();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (habit) => {
    setEditingId(habit.id);
    setEditName(habit.name);
  };

  const saveEdit = async (id) => {
    const result = await updateHabit(id, { name: editName });

    if (result.error) {
      console.error(result.error);
      return;
    }
    setEditingId(null);
    onDeleted?.();
  };

  const handleCheckin = async (habitId) => {
    const result = await createCheckin(habitId);

    if (result.error) {
      if (String(result.error).toLowerCase().includes("already")) {
        setCheckedToday((prev) => new Set(prev).add(habitId));
        return;
      }
      console.error(result.error);
      return;
    }

    setCheckedToday((prev) => new Set(prev).add(habitId));
  };

  return (
    <div className="habits">
      {habits.map((habit) => (
        <div key={habit.id} className="habit-card">
          {editingId === habit.id ? (
            <div>
              <input value={editName} onChange={(event) => setEditName(event.target.value)} />
              <button onClick={() => saveEdit(habit.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p> {habit.name}</p>
              <p>{habit.frequency_per_week} / 7</p>
              <button onClick={() => handleCheckin(habit.id)} disabled={checkedToday.has(habit.id)}>
                {checkedToday.has(habit.id) ? "Checked Today ✅" : "Check in today"}
              </button>
              <button
                onClick={() => {
                  startEditing(habit);
                }}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm("Delete this habit?")) {
                    handleDelete(habit.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HabitList;
