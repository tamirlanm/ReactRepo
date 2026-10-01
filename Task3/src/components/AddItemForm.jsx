
import { useState } from "react";

function AddItemForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("React");
  const [difficulty, setDifficulty] = useState("Easy");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd({
      title,
      category,
      difficulty,
    });

    setTitle("");
    setCategory("React");
    setDifficulty("Easy");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add course</h2>

      <div className="form-fields">
        <input
          type="text"
          placeholder="Course title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
        />

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        >
          <option>React</option>
          <option>JavaScript</option>
          <option>.NET</option>
          <option>Java</option>
          <option>Other</option>
        </select>

        <select
          value={difficulty}
          onChange={(event) =>
            setDifficulty(event.target.value)
          }
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button type="submit">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddItemForm;