import { createContext } from "react";
import { doctors } from "../../../frontend/src/assets/assets";

export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{
    const value ={
        
        
        


    }
    return (
        <DoctorContext.Provider  value={value}>
            {props.children}

        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider