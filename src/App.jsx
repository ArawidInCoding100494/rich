

// rrd imports
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayOut from "./RootLayOuts/RootLayOut"
import SellProduct from "./Pages/SellProduct/SellProduct"
import CreateProduct from "./Pages/CreateProduct/CreateProduct"
import Xisobotlar from "./Pages/Xisobotlar/Xisobotlar"


function App() {

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route  element={<RootLayOut/>} >
        <Route path="/" element={<SellProduct/>} />
        <Route path="/CreateProduct" element={<CreateProduct/>} />
        <Route path="/Xisobotlar" element={<Xisobotlar/>} />
        </Route>
      </Route>
    )
  )

  return <RouterProvider router={routes} />
}

export default App

        {/* <button className="bg-[#B7E1E4] p-4">close</button>
    <button className="bg-[#FF7F50] p-4">close</button>
    <button className="bg-[#F2994A] p-4">close</button>
    <button className="bg-[#2D5F5D] p-4">close</button>
    <button className="bg-[#1B263B] p-4">close</button>
    <button className="bg-[#62AAB0] p-4">close</button>
    <button className="bg-[#1B4965] p-4">close</button>
    <button className="bg-[#E76F51] p-4">close</button>
    <button className="bg-[#457B9D] p-4">close</button> */}



