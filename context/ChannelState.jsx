import { useContext, createContext } from "react";
export const StateContext = createContext();

export const ChannelStateProvider = ({ children }) => {
  return (
    <StateContext.Provider
      value={{
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ChannelStateProvider;
export const useChannelState = () => useContext(ChannelState);
