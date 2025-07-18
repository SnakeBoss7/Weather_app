import { createContext,useContext, useState } from "react"
const sidebarContext = createContext({
    showSidebar:'',
    setShowSidebar:()=>{}
});

const SidebarContextProvider = ({children})=>{
    const [showSidebar,setShowSidebar] = useState(window.innerWidth >= 1024);
    return (
        <sidebarContext.Provider value={{showSidebar,setShowSidebar}}>
            {children}
        </sidebarContext.Provider>
    );
} 

const useSidebarContext = ()=> useContext(sidebarContext);

export  {SidebarContextProvider,useSidebarContext};