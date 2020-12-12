import { createContext, useContext, useReducer } from 'react';
import { initialState, stateReducer } from './stateReducer';

const StateContext = createContext();

export const useGlobalState = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}