import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function Sortable({ sensors, todos, handleDragEnd, children }) {
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

export default Sortable;
