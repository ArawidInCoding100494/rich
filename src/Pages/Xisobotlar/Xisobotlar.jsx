import { useState } from "react";
import { UseCollection } from "../../Hooks/UseCollection";
import { FaSearch } from "react-icons/fa";

const Xisobotlar = () => {
  const { data: soldProducts } = UseCollection("soldProduct");
  const [searchTerm, setSearchTerm] = useState("");
  const [showXisobotText, setShowXisobotText] = useState(false)
  
  const now = new Date();
  const isToday = now.getDate();
  const isMonth = now.getMonth() + 1;
  const isYear = now.getFullYear();

  const filteredData = soldProducts?.filter((product) => {
    const matchesSearch = 
      product.pName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.pColor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.bName.toLowerCase().includes(searchTerm.toLowerCase());

    if (searchTerm.trim() !== "") {
      // 1. Agar qidiruv yozilayotgan bo'lsa, hamma vaqt ichidan qidiradi
      return matchesSearch;
    } else {
      // 2. Agar qidiruv bo'sh bo'lsa, faqat bugungi kunni ko'rsatadi
      return product.vaqt?.kun === isToday && 
             product.vaqt?.oy === isMonth && 
             product.vaqt?.yil === isYear;
    }
  });

  const todaySold = soldProducts?.filter(item =>
  item.vaqt?.kun === isToday &&
  item.vaqt?.oy === isMonth &&
  item.vaqt?.yil === isYear
);


  // today-------------------------------
    const todayAllAmounts = todaySold
  ? todaySold.reduce((acc, item) => acc + Number(item.sellAmount || 0), 0)
  : 0;

  const todayAllsums = todaySold
  ? todaySold.reduce((acc, item) => acc + Number(item.calcItogo || 0), 0)
  : 0;

    const todayAllProfits = todaySold
  ? todaySold.reduce((acc, item) => acc + Number(item.calcingProfit || 0), 0)
  : 0;

  // -------------------------------------------------------------


  const allAmounts = soldProducts
  ? soldProducts.reduce((acc, item) => acc + Number(item.sellAmount || 0), 0)
  : 0;

  const allsums = soldProducts
  ? soldProducts.reduce((acc, item) => acc + Number(item.calcItogo || 0), 0)
  : 0;

    const allProfits = soldProducts
  ? soldProducts.reduce((acc, item) => acc + Number(item.calcingProfit || 0), 0)
  : 0;

  return (
    <div >
      

      <table className="responsive-table">
        <caption className="bg-[#2D5F5D] text-white  py-3 rounded-t-md ">
          <div className="flex justify-between items-center lg:w-[60%] ml-auto px-3">
           <h3 className="font-bold text-xl">Xisobotlar</h3>
          <div className="relative">
        <input
          type="text"
          placeholder="qidirish..."
          className="inp  p-0"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute right-3 top-2 text-[#2D5F5D]" />
           </div>
           </div>

        </caption>
        <thead className="table-head">
          <tr>
            <th>Brend</th>
            <th>Maxsulot</th>
            <th>rangi</th>
            <th>Razmer</th>
            <th>Soni</th>
            <th>Kelishi</th>
            <th>Sotilishi</th>
            <th>Jami</th>
            <th>Foyda</th>
            <th>Sana</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((product) => (
              <tr key={product.id} className="table-card-row">
                <td  data-label="Brend" className="table-card-cell" >{product.bName}</td>
                <td  data-label="Maxsulot" className="table-card-cell" >{product.pName}</td>
                <td  data-label="rangi" className="table-card-cell" >{product?.pColor}</td>
                <td  data-label="razmeri" className="table-card-cell" >{product.size}</td>
                <td  data-label="soni" className="table-card-cell" >{product.sellAmount}</td>
                <td  data-label="kelishi" className="table-card-cell" >{product.cPrice}</td>
                <td  data-label="sotilishi" className="table-card-cell" >{product.sellPrice}</td>
                <td  data-label="jami" className="table-card-cell" >{product.calcItogo}</td>
                <td  data-label="foyda" className="table-card-cell" >{product.calcingProfit}</td>
                <td  data-label="sana" className="table-card-cell" >{product.vaqt?.full}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-10 text-gray-200">
                {searchTerm ? "Hech narsa topilmadi!" : "Bugun hali savdo bo'lmadi!"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="today mt-5">
        <div>
        <h2 className="capitalize font-bold">bugungi jami xisobotlar</h2>
        <h3>bugun sotilgan maxsulotlar soni: {todayAllAmounts}ta</h3>
        <h3>bugun qilingan savdo: {todayAllsums}sum</h3>
        <h3>bugun qilingan jami foyda: {todayAllProfits}sum</h3>
        </div>
        <div className="kalendar"></div>
      </div>

      <div className="mt-10">
        <div>
          <button className="btn" onClick={()=>setShowXisobotText(true)}>jami xisobotlar</button>
          <button className="btn" onClick={()=>setShowXisobotText(false)}>hide</button>
        </div>

        {showXisobotText && <div>
        <h2 className="capitalize font-bold">shu kungacha jami xisobotlar</h2>
        <h3>shu kungacha sotilgan maxsulotlar soni: {allAmounts}ta</h3>
        <h3>shu kungacha qilingan savdo: {allsums}sum</h3>
        <h3>shu kungacha qilingan jami foyda: {allProfits}sum</h3>
        </div>}

      </div>


    </div>
  );
};

export default Xisobotlar;