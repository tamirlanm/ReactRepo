import { useState } from "react";
import AddItemForm from "./components/AddItemForm";
import FilterBar from "./components/FilterBar";
import DashboardItem from "./components/DashboardItem";
import "./App.css";

const initialItems = [
  {
    id: 1,
    title: "React Rendering",
    category: "React",
    difficulty: "Medium",
    status: "In Progress",
    resetVersion: 0,
  },
  {
    id: 2,
    title: "JavaScript Event Loop",
    category: "JavaScript",
    difficulty: "Hard",
    status: "Planned",
    resetVersion: 0,
  },
  {
    id: 3,
    title: "ASP.NET Core API",
    category: ".NET",
    difficulty: "Medium",
    status: "Completed",
    resetVersion: 0,
  },
];



function App() {
  console.log("App rendered");

  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState("All");

  function addItem(newItem) {
    const item = {
      id: crypto.randomUUID(),
      title: newItem.title,
      category: newItem.category,
      difficulty: newItem.difficulty,
      status: "Planned",
      resetVersion: 0,
    };

    setItems((currentItems) => [...currentItems, item]);
  }

  function removeItem(id) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  function changeStatus(id, newStatus) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, status: newStatus }
          : item
      )
    );
  }

  function reverseItems() {
    setItems((currentItems) => [...currentItems].reverse());
  }

  function resetItemState(id) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              resetVersion: item.resetVersion + 1,
            }
          : item
      )
    );
  }

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="subtitle">Task 3 — Rendering and State</p>
          <h1>Study Dashboard</h1>
          <p>
            Track your courses, progress and study sessions.
          </p>
        </div>

        <div className="total">
          {items.length} courses
        </div>
      </header>

      <section className="controls">
        <AddItemForm onAdd={addItem} />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          onReverse={reverseItems}
        />
      </section>

      <section className="items-grid">
        {items.map((item) => {
          const isVisible =
            filter === "All" || item.status === filter;

          return (
            <DashboardItem
              key={`${item.id}-${item.resetVersion}`}
              item={item}
              visible={isVisible}
              onRemove={removeItem}
              onStatusChange={changeStatus}
              onReset={resetItemState}
            />
          );
        })}
      </section>

      {items.length === 0 && (
        <div className="empty-message">
          No courses yet. Add your first course.
        </div>
      )}
    </main>
  );
}

export default App
