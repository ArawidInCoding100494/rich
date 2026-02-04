// rrd imports
import { Link } from "react-router-dom"


// react imports
import { useState } from "react"

// custom hooks
import { UseSignUp } from "../../Hooks/UseSignUp"



const SignUp = () => {
  const {signUp} = UseSignUp()

  const [sUname, setSuName] = useState("")
  const [email, setSuEmail] = useState("")
  const [password, setSuPassword] = useState("")



  const handleSubmit = (e) => {
    e.preventDefault()

    signUp(
      sUname,
      email,
      password,
    );
    
    setSuName("")
    setSuEmail("")
    setSuPassword("")

  }



  return (
    <div className="h-screen w-full flex items-center justify-center">

       <form className="flex flex-col border-2 border-[#2D5F5D] p-4 rounded-2xl bg-[#2D5F5D] "
       onSubmit={handleSubmit}
       >
        <h1 className="title">royxatdan o'ting!</h1>

       <label className="formLabel">
        <span className="labelSpan">your name:</span>
        <input className="inp" type="text" placeholder="your name" required
        onChange={(e)=> setSuName(e.target.value)} value={sUname}
        />
       </label>

       <label className="formLabel">
        <span className="labelSpan">your email:</span>
        <input className="inp" type="email" placeholder="your email" required
        onChange={(e)=> setSuEmail(e.target.value)} value={email}
        />
       </label>

       <label className="formLabel">
        <span className="labelSpan">your password:</span>
        <input className="inp" type="password" placeholder="your password" required
        onChange={(e)=> setSuPassword(e.target.value)} value={password}
        />
       </label>

       <div className="btns lg:flex justify-between items-center">
        <Link to="/Login" >
        <p className="my-3 ml-3 text-white capitalize cursor-pointer lg:mr-2">if you've account!</p>
        </Link>
        <button className="btn">sign up</button>
       </div>

       </form> 
    </div>
  )
}

export default SignUp