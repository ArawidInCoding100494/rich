import { useState } from "react";
import { Link } from "react-router-dom";

//  custom hooks
import { UseLogin } from "../../Hooks/UseLogin";

const Login = () => {
  const { login } = UseLogin();

  const [email, setSuEmail] = useState("");
  const [password, setSuPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);

    setSuEmail("");
    setSuPassword("");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center ">
      <form
        className="flex flex-col border-2 border-[#2D5F5D] p-4 rounded-2xl bg-[#2D5F5D] "
        onSubmit={handleSubmit}
      >
        <h1 className="title">saytga kiring!</h1>

        <label className="formLabel">
          <span className="labelSpan">your email:</span>
          <input
            className="inp"
            type="email"
            placeholder="your email"
            required
            onChange={(e) => setSuEmail(e.target.value)}
            value={email}
          />
        </label>

        <label className="formLabel">
          <span className="labelSpan">your password:</span>
          <input
            className="inp"
            type="password"
            placeholder="your password"
            required
            onChange={(e) => setSuPassword(e.target.value)}
            value={password}
          />
        </label>

        <div className="btns lg:flex justify-between items-center my-3">
          <Link to="/SignUp">
            <p className="my-3 ml-3 text-white capitalize cursor-pointer lg:mr-2">
              if you've not account!
            </p>
          </Link>
          <button className="btn">login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;