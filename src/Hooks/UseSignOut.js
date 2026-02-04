
import { signOut } from "firebase/auth";
import {auth} from "../FireBase/FireBaseConfig"


export const SignOutfrom =()=>{

    const signOutUser=()=>{
signOut(auth).then(() => {
    console.log("yana koriwamiz")
}).catch((error) => {
    console.log(error.message)
});
    }

    return {signOutUser}
}