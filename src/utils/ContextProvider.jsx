import { createContext, useContext, useState } from "react"

const StateContext = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [dataUser, setDataUser] = useState(null)
    const [dataProduct, setDataProduct] = useState(null)

    return (
        <StateContext.Provider value={{
            showDropdown,
            setShowDropdown,
            dataUser,
            setDataUser,
            dataProduct,
            setDataProduct,
        }}>
            {children}
        </StateContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)
