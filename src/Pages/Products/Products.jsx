import { useState } from "react"
import { UseCollection } from "../../Hooks/UseCollection"
import CreateProduct from "../CreateProduct/CreateProduct"
import Modal from "../../Components/Modal/Modal"
import { FaSearch } from "react-icons/fa";
import EditProduct from "../../Components/EditProduct/EditProduct";




const Products = () => {
  const {data: readProducts} = UseCollection("products")
  const [openCreateProduct, setOpenCreateProduct] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [openEdit, setOpenEdit] = useState(false)
  // console.log(openEdit);
  








  return (
    <div>
      
      {openCreateProduct &&
       <Modal
            close={() => {
            setOpenCreateProduct(null);
          }}
          title="Yangi mahsulot yaratish"
       >
        <CreateProduct setOpenCreateProduct={setOpenCreateProduct}/>
      </Modal> }

      {openEdit &&
      <Modal
      close={() => {
          setOpenEdit(null);
          }}
          title="Mahsulotni taxrirlash"
          >
            <EditProduct editValue={openEdit} setOpenEdit={setOpenEdit} />
      </Modal>
      }
    <table className="responsive-table">
  {/* ===== CAPTION ===== */}
  <caption className="border bg-[#2D5F5D] text-white py-2 rounded-md">
    <div className="flex w-full justify-between items-center px-3 gap-2">
      <button
        className="btn"
        onClick={() => setOpenCreateProduct(true)}
      >
        new product
      </button>

      <h4 className="hidden lg:flex font-bold text-2xl capitalize">
        maxsulotlar
      </h4>

      <div className="relative">
        <input 
          type="text"
          placeholder="qidirish..."
          className="inp p-0 pr-2 w-32 lg:w-auto"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute right-2 top-2 text-[#2D5F5D]  "  />
      </div>
    </div>
  </caption>

  {/* ===== TABLE HEAD ===== */}
  <thead className="table-head">
    <tr>
      <th>brend</th>
      <th>maxsulot</th>
      <th>rangi</th>
      <th>narxi</th>
      <th>keldi</th>
      <th>omborda</th>
      <th>sotildi</th>
      <th>sana</th>
      <th>tahrir</th>
    </tr>
  </thead>

  {/* ===== TABLE BODY ===== */}
  <tbody>
    {readProducts &&
      readProducts
        .filter((product) => {
          if (searchTerm.trim() === "") return product;
          return (
            product.pName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.bName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
        .map((product) => (
          <tr key={product.id} className="table-card-row">

            {/* Brend */}
            <td data-label="Brend" className="table-card-cell">
              {product.bName}
            </td>

            {/* Maxsulot */}
            <td data-label="Maxsulot" className="table-card-cell">
              {product.pName}
            </td>

            <td data-label="rangi" className="table-card-cell">
              {product?.pColor}
            </td>

            {/* Narxi */}
            <td data-label="Narxi" className="table-card-cell">
              {product.cPrice}
            </td>

            {/* Keldi */}
            <td
              data-label="Keldi"
              className="table-card-cell normal-case"
            >
              {product.mainCount?.map((item) => (
                <div key={item.size}>
                  {item.size} = {item.count} ta
                </div>
              ))}
            </td>

            {/* Omborda */}
            <td
              data-label="Omborda"
              className="table-card-cell normal-case"
            >
              {product.sizes?.map((item) => (
                <div key={item.size}>
                  {item.size} = {item.count} ta
                </div>
              ))}
            </td>

            {/* Sotildi */}
            <td data-label="Sotildi" className="table-card-cell">
              {product.soldAmount}
            </td>

            {/* Sana */}
            <td data-label="Sana" className="table-card-cell">
              {product.vaqt?.full}
            </td>

            {/* Edit */}
            <td
              data-label="Tahrir"
              className="table-card-cell"
            >
              <button
                className="cursor-pointer"
                onClick={() => setOpenEdit(product)}
              >
                🖊
              </button>
            </td>

          </tr>
        ))}
  </tbody>
</table>






      {/* <div className="cards">
        <div className="cards-up border  bg-[#2D5F5D] text-white  py-2 rounded-md ">
                <div className="flex w-full  justify-between items-center px-3">
                <button className="btn" onClick={()=>setOpenCreateProduct(true)} >new product</button>
                <h4 className="font-bold text-2xl capitalize">maxsulotlar</h4>
                <div className="relative">
                        <input
                          type="text"
                          placeholder="qidirish..."
                          className="inp  p-0 w-24"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute right-3 top-2 text-[#2D5F5D]" />
                           </div>
                 
              </div>
        </div>
      </div> */}
      
    </div>
  )
}

export default Products