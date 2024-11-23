import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
const categoryMap = {
  all: (todos) => todos,
  completed: (todos) => todos.filter((todo) => todo.isCompleted),
  active: (todos) => todos.filter((todo) => !todo.isCompleted),
};
const INITIAL_STATE = {
  category: "all",
  todos: [],
  currentlyVisible: [],
  noOfItemsLeft: 0,
};

function reducer(state, action) {

  switch (action.type) {
    case "ADD_TODO": {
      let newTodos = [
        ...state.todos,
        { id: uuidv4(), isCompleted: false, todo: action.payload.todo },
      ];
      return {
        ...state,
        todos: newTodos,
        noOfItemsLeft: state.noOfItemsLeft + 1,
        currentlyVisible: categoryMap[state.category](newTodos),
      };
    }
    case "DELETE_TODO": {
      let filteredItems = [
        ...state.todos.filter((item) => item.id !== action.payload.id),
      ];

      return {
        ...state,
        todos: filteredItems,
        currentlyVisible: filteredItems,
        noOfItemsLeft: filteredItems.reduce((acc, curr) => {
          return !curr.isCompleted ? acc + 1 : acc;
        }, 0),
      };
    }
    case "CHANGE_STATUS": {
      let index = state.todos.indexOf(action.payload);
      let newTodos = [
        ...state.todos.slice(0, index),
        { ...action.payload, isCompleted: !action.payload.isCompleted },
        ...state.todos.slice(index + 1, state.length),
      ];
      return {
        ...state,
        todos: newTodos,
        noOfItemsLeft: !action.payload.isCompleted
          ? state.noOfItemsLeft - 1
          : state.noOfItemsLeft + 1,
        currentlyVisible: categoryMap[state.category](newTodos),
      };
    }
    case "REORDER_TODO": {
      return {
        ...state,
        todos: [...action.payload],
        currentlyVisible: [...action.payload],
      };
    }

    case "CLEAR_COMPLETED": {
      let notCompletedItems = [
        ...state.todos.filter((item) => !item.isCompleted),
      ];
      return {
        ...state,
        todos: notCompletedItems,
        noOfItemsLeft: notCompletedItems.length,
        currentlyVisible: categoryMap[state.category](notCompletedItems),
      };
    }

    case "CHANGE_CATEGORY": {
      return {
        ...state,
        category: action.payload,
        currentlyVisible: categoryMap[action.payload](state.todos),
      };
    }

    case "SET_STATE": return { ...action.payload };
    default:
      console.warn("INVALID ACTION");
      return state;
  }
}


function getInitialState() {
  let localState = JSON.parse(localStorage.getItem("TODO_STATE"));
  console.log("Called getInitialState");
  console.log(localState);

  if (!localState) {
    return INITIAL_STATE;
  }
  return localState;
}


function useTodo() {

  let lastState = getInitialState();
  const [state, dispatch] = useReducer(reducer, lastState);

  // useEffect(() => {

  //   dispatch({ type: "SET_STATE", payload: getInitialState() });
  // }, [])

  useEffect(() => {
    localStorage.setItem("TODO_STATE", JSON.stringify(state));
  }, [state])


  return [state, dispatch];
}

export { useTodo };