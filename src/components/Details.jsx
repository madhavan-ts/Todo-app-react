export default function Details({ noOfItemsLeft, dispatch, children }) {
  return (
    <div className="todo__options">
      <span className="todo__options-items-left">
        {noOfItemsLeft} Items left
      </span>
      {children}
      <span
        className="todo__options-items-clear"
        onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
      >
        Clear Completed
      </span>
    </div>
  );
}
