
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase/FireBaseConfig";

import { UseGlobalContext } from "./UseGlobalContext"


export const UseLogin = ()=>{
    const {dispatch} = UseGlobalContext()

    
    const login = (email, password)=>{
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    dispatch({type: "LOGIN", payload: user})
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
    
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });
    }
    return {login}
}