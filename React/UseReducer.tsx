/**
 * The useReducer is an alternative to the useState hook for managing state in functional components.
 *  The useReducer hook is better suited for managing complex state logic while useState is best for simple state changes.
 * Helps centralize state logic.
 * Makes state transitions predictable.
 * Suitable for complex state management.
 * Optimizes performance.
 */


import { useReducer } from 'react'

const initialState = {
    count: 0
}
type State = {
    count: number;
}
type Action = {
    type: string;
    payload: number;
}

const reducer = (state: State, action:Action) => {
    switch(action.type){
        case "increment": {
            return {...state, count: state.count+action.payload};
        }
        case "decrement": {
            return {...state, count: state.count-action.payload};
        }
        default:
            return state;
    }
}

const UseReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
        <h1>UseReducer Demo</h1>
        <h2>{state.count}</h2>
        <button onClick={() => dispatch({type: "increment", payload: 10})}>Increment</button>
        <button onClick={() => dispatch({type: "decrement", payload: 5})}>Decrement</button>

    </div>
  )
}

export default UseReducer