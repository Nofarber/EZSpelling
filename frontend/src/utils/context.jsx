import { useContext, useState,createContext, useEffect } from "react"


export const UserContext = createContext({
    currentUser:{},
    SetCurrentUser:()=>{}
})

export const useInfo = () => {
    return useContext(UserContext)
}

const UserProvider = ({ children }) => {
    
    const [currentUser,SetCurrentUser] = useState(localStorage.getItem("currentUser")||null)

    useEffect(()=>{
        localStorage.setItem('currentUser',currentUser)
    },[currentUser])

    return (
        <UserContext.Provider value={{SetCurrentUser,currentUser
        }}>
            {children}
        </UserContext.Provider>
    );
    ;
}

export default UserProvider;