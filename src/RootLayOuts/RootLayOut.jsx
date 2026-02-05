import { NavLink, Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

const RootLayOut = ({user}) => {
  const role = user.email;

  return (
    <div className="rootLayOut bg-[#2D5F5D] w-[99%] mx-auto h-screen lg:w-full overflow-hidden flex flex-col">

      <div className="hidden my-1 text-center  lg:flex justify-center items-center shrink-0">
        <Header />
        
      </div>

      <main className="flex flex-col lg:flex-row gap-2 flex-1 overflow-hidden p-1">


        <nav className="lg:w-[15%]">
          {role === ("ali@gmail.com" || "umarjon@gmail.com") ? (
            <div className="w-full p-2 grid grid-cols-3 gap-2 shrink-0
               lg:grid-cols-1 lg:w-full lg:flex lg:flex-col lg:overflow-y-auto"
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-2 border-white  p-1 px-2 capitalize font-bold bg-white text-[#2D5F5D] rounded-[10px] cursor-pointer duration-300 hover:bg-[#2D5F5D] hover:text-white"
                  : "border-2 p-1 px-2 capitalize font-bold rounded-[10px] cursor-pointer duration-300 bg-[#2D5F5D] text-white hover:bg-white hover:text-[#2D5F5D]"
              }
              to="/"
            >
              sotuv
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-2 border-white  p-1 px-2 capitalize font-bold bg-white text-[#2D5F5D] rounded-[10px] cursor-pointer duration-300 hover:bg-[#2D5F5D] hover:text-white"
                  : "border-2 p-1 px-2 capitalize font-bold rounded-[10px] cursor-pointer duration-300 bg-[#2D5F5D] text-white hover:bg-white hover:text-[#2D5F5D]"
              }
              to="/Products"
            >
              Products
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-2 border-white  p-1 px-2 capitalize font-bold bg-white text-[#2D5F5D] rounded-[10px] cursor-pointer duration-300 hover:bg-[#2D5F5D] hover:text-white"
                  : "border-2 p-1 px-2 capitalize font-bold rounded-[10px] cursor-pointer duration-300 bg-[#2D5F5D] text-white hover:bg-white hover:text-[#2D5F5D]"
              }
              to="/Xisobotlar"
            >
              xisobotlar
            </NavLink>
          </div>
          ) : (
            <div className="w-full p-2 grid grid-cols-3 gap-2 shrink-0
               lg:grid-cols-1 lg:w-full lg:flex lg:flex-col lg:overflow-y-auto"
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-2 border-white  p-1 px-2 capitalize font-bold bg-white text-[#2D5F5D] rounded-[10px] cursor-pointer duration-300 hover:bg-[#2D5F5D] hover:text-white"
                  : "border-2 p-1 px-2 capitalize font-bold rounded-[10px] cursor-pointer duration-300 bg-[#2D5F5D] text-white hover:bg-white hover:text-[#2D5F5D]"
              }
              to="/"
            >
              sotuv
            </NavLink>
            
          </div>
          ) }
          
        </nav>




        <div className="outlet_section flex-1 overflow-y-auto px-2 bg-white p-4 rounded-xl shadow-inner">
          <Outlet />
        </div>
      </main>
      <footer className="shrink-0 ">
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayOut;
