import DesktopBgLight from "/bg-desktop-light.jpg";
import DesktopBgDark from "/bg-desktop-dark.jpg";
import MobileBgLight from "/bg-mobile-light.jpg";
import MobileBgDark from "/bg-mobile-dark.jpg";
import IconSun from "/icon-sun.svg";
import IconMoon from "/icon-moon.svg";

import { useTheme } from "../provider/ThemeProvider";

import "../Application.scss";

import { useEffect, useState } from "react";

import DraggableTodoItem from "./DraggableTodoItem";
import Details from "./Details";
import Options from "./Options";
import NoItem from "./NoItem";

function Todo({ state, dispatch }) {
  const { theme, toggleTheme } = useTheme();

  const [isOptionsVisible, setOptionsVisible] = useState(false);

  const [todoInput, setTodoInput] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    if (!todoInput.trim()) {
      window.alert("Enter a valid Todo");
      setTodoInput("");
      return;
    }
    dispatch({ type: "ADD_TODO", payload: { todo: todoInput } });
    setTodoInput("");
  }

  const { category, noOfItemsLeft, currentlyVisible, todos } = state;

  const imageMap = {
    light: [DesktopBgLight, MobileBgLight],
    dark: [DesktopBgDark, MobileBgDark],
  };

  const [DesktopImage, MobileImage] = imageMap[theme];

  useEffect(() => {
    const windowResizeHandler = () => {
      setOptionsVisible(window.innerWidth > 600);
    };

    windowResizeHandler();
    window.addEventListener("resize", windowResizeHandler);
    return () => window.removeEventListener("resize", windowResizeHandler);
  }, []);

  return (
    <div data-theme={theme} className="todo todo__container">
      <picture className="todo__background">
        <source media="(min-width: 600px)" srcSet={DesktopImage} />
        <img src={MobileImage} />
      </picture>
      <main className="todo__content">
        <header className="todo__header">
          <h1 className="todo__header-heading">TODO</h1>
          <span
            className="todo__header-toggletheme"
            onClick={() => toggleTheme(theme)}
          >
            <img src={theme === "light" ? IconMoon : IconSun} />
          </span>
        </header>

        <form className="todo__form" onSubmit={handleSubmit}>
          <div className="todo__form-field">
            <span></span>
            <input
              onChange={(event) => {
                setTodoInput(event.target.value);
              }}
              value={todoInput}
              className="todo__form-input"
              type="text"
              placeholder="Create a todo"
            />
          </div>
          {isEmpty ? <p>Enter a valid Todo</p> : null}
        </form>
        <div className="todo__wrapper">
          {todos.length === 0 ? (
            <NoItem />
          ) : (
            <>
              <ul className="list todo__list">
                {currentlyVisible.map((item) => (
                  <DraggableTodoItem
                    key={item.id}
                    item={item}
                    dispatch={dispatch}
                    category={category}
                  />
                ))}
              </ul>
              <Details
                noOfItemsLeft={noOfItemsLeft}
                category={category}
                isOptionsVisible={isOptionsVisible}
                dispatch={dispatch}
              >
                {isOptionsVisible && (
                  <Options dispatch={dispatch} category={category} />
                )}
              </Details>
            </>
          )}
        </div>

        {todos.length !== 0 && !isOptionsVisible ? (
          <div className="todo__options-wrapper">
            <Options category={category} dispatch={dispatch} />
          </div>
        ) : null}
      </main>
      <span className="todo__note">Drag items to reorder</span>
    </div>
  );
}

export default Todo;
