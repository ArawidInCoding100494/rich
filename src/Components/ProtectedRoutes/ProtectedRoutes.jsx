import { Navigate } from "react-router-dom"


const ProtectedRoutes = ({user, children}) => {
    if(user){
        return children
    } else{
        return <Navigate to="/login"/>
    }
  
}

export default ProtectedRoutes