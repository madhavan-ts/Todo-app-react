import { v4 as uuidv4 } from "uuid";
function Options({ category, dispatch }) {
  const options = ["All", "Completed", "Active"];
  return (
    <ul className="list todo__options-list">
      {options.map((item) => {
        return (
          <li
            key={uuidv4()}
            className={
              item.toLowerCase() === category
                ? "todo__options-list--active"
                : ""
            }
            onClick={() =>
              dispatch({
                type: "CHANGE_CATEGORY",
                payload: item.toLowerCase(),
              })
            }
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default Options;
