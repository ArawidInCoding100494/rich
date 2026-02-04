import {UseGlobalContext} from "../../Hooks/UseGlobalContext"
import { NavLink } from 'react-router-dom'
import {SignOutfrom} from "../../Hooks/UseSignOut"


const Footer = () => {
  const {user} = UseGlobalContext()
    const {signOutUser} = SignOutfrom()

  return (
    <div>
       {user && ( 
            <div className='flex justify-end items-center'>
                <button className='btn mr-5' onClick={signOutUser}>Log Uout </button>
            </div>
        )}

        {!user && (
            <nav className='flex justify-between items-center  w-[40%] lg:w-[15%]'>
                <NavLink className="btn" to="/Login">login</NavLink>
                <NavLink className="btn" to="/SignUp">sign up</NavLink>
            </nav>
        )}
    </div>
  )
}

export default Footer