import { useSortable } from "@dnd-kit/sortable";
import IconCross from "/icon-cross.svg";
import CheckBox from "./CheckBox";
function DraggableTodoItem({ item, dispatch, category }) {
  const { id, todo, isCompleted } = item;

  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
    active,
    activeIndex,
    overIndex,
  } = useSortable({
    id: id,
    transition: {
      duration: 150, // milliseconds
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  console.log("active", activeIndex, "over", overIndex);

  const style = transform
    ? {
        zIndex: isDragging ? 1000 : 999,
        // backgroundColor: ,
        // opactiy: active ? 1 : 0,
        transform: `translate3d(0, ${transform.y}px, 0)`,
        transition: transition,
      }
    : undefined;

  return (
    <li
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      key={id}
      style={category === "all" ? style : undefined}
      className="todo__list-item"
    >
      <div className="todo__list-item-content">
        <CheckBox
          isChecked={isCompleted}
          onClick={() => dispatch({ type: "CHANGE_STATUS", payload: item })}
        />

        <p
          className={`todo__list-item-todo ${
            isCompleted ? "todo__list-item-todo--completed" : ""
          }`}
        >
          {isCompleted ? <s>{todo}</s> : todo}
        </p>
      </div>
      <button
        role="button"
        className="todo__list-delete-btn"
        onClick={(event) => {
          event.preventDefault();
          dispatch({ type: "DELETE_TODO", payload: item });
        }}
      >
        <img src={IconCross} alt="" />
      </button>
    </li>
  );
}
export default DraggableTodoItem;
