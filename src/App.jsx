import { arrayMove } from "@dnd-kit/sortable";
import Sortable from "./components/Sortable";
import { useSortableSensor } from "./hooks/useSortableSensors";
import Todo from "./components/Todo";
import { useTodo } from "./hooks/useTodo";

function App() {
  const [state, dispatch] = useTodo();

  const { category, todos } = state;

  function handleDragEnd(ev) {
    if (category !== "all") return;
    const { active, over } = ev;
    const activeId = todos.findIndex((item) => item.id === active.id);
    const overId = todos.findIndex((item) => item.id === over.id);

    dispatch({
      type: "REORDER_TODO",
      payload: arrayMove(todos, activeId, overId),
    });
  }

  const sensors = useSortableSensor();

  return (
    <Sortable todos={todos} sensors={sensors} handleDragEnd={handleDragEnd}>
      <Todo dispatch={dispatch} state={state} />
    </Sortable>
  );
}

export default App;
