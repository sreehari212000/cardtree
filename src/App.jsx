import React, { useState } from "react";

export default function SyncedGrid() {
  const [items, setItems] = useState(["0", "1", "2", "3", "4", "5"]);
  const [dragged, setDragged] = useState(null);

  const handleDragStart = (id) => {
    setDragged(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (id) => {
    if (!dragged) return;
    const newItems = [...items];
    const from = newItems.indexOf(dragged);
    const to = newItems.indexOf(id);
    newItems.splice(from, 1);
    newItems.splice(to, 0, dragged);
    setItems(newItems);
    setDragged(null);
  };

  return (
    <div className="grid">
      {items.map((id) => (
        <div
          key={id}
          className="grid-item"
          draggable
          onDragStart={() => handleDragStart(id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(id)}
        >
          {id}
        </div>
      ))}
    </div>
  );
}
