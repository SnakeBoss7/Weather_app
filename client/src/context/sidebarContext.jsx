import { createContext, useState, useContext } from 'react';
const SidebarContext = createContext({
  showSidebar: '',
  setShowSidebar: () => {}
});

const SidebarContextProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 1024);
  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebarContext = () => useContext(SidebarContext);

export { SidebarContextProvider, useSidebarContext };
