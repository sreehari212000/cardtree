import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import React, { useMemo, useState } from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function App() {
  const [items, setItems] = useState(["0", "1", "2", "3", "4", "5"]);

  const layouts = useMemo(() => {
    const webLayout = items.map((id, idx) => ({
      i: id,
      x: idx, // horizontal for web
      y: 0,
      w: 1,
      h: 1
    }));

    const mobileLayout = items.map((id, idx) => ({
      i: id,
      x: 0,   // vertical for mobile
      y: idx,
      w: 1,
      h: 1
    }));

    return { lg: webLayout, sm: mobileLayout };
  }, [items]);

  // const handleLayoutChange = (current, allLayouts) => {
  //   const active = Object.values(allLayouts)[0] 
  //   const sorted = [...active].sort((a, b) =>
  //     a.y === b.y ? a.x - b.x : a.y - b.y
  //   );
  //   setItems(sorted.map((l) => l.i));
  // };
  const handleLayoutChange = (current, allLayouts) => {
    // Detect active layout (mobile or web)
    let activeLayout = current;

    // Determine orientation: vertical if x = 0
    const isVertical = activeLayout[0]?.x === 0;

    const sorted = [...activeLayout].sort((a, b) =>
      isVertical ? a.y - b.y : a.x - b.x
    );

    setItems(sorted.map((l) => l.i));
  };

  console.log(items);
  
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 768, sm: 0 }}
      cols={{ lg: items.length, sm: 1 }}
      rowHeight={80}
      margin={[20, 20]}            
      containerPadding={[20, 20]}  
      onLayoutChange={handleLayoutChange}
      isResizable={false}
    >
      {items.map((id) => (
        <div key={id} className="grid-item">
          {id}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
