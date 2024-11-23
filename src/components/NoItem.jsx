function NoItem() {
  return (
    <div className="todo__no-item">
      <div>
        <svg
          className="todo__no-item-img"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 14V7C20 5.34315 18.6569 4 17 4H12M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20M13.5 20H7C5.34315 20 4 18.6569 4 17V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 4V7M7 10V7M7 7H4M7 7H10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p>Add Todos</p>
    </div>
  );
}

export default NoItem;
