import { useContext, createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [appearance, setAppearance] = useState("light");
  const [isSidebar, setIsSidebar] = useState(true);
  const [searchString, setSearchString] = useState("");

  return (
    <StateContext.Provider
      value={{
        appearance,
        setAppearance,
        isSidebar,
        setIsSidebar,
        searchString,
        setSearchString,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
export const useStateContext = () => useContext(StateContext);
