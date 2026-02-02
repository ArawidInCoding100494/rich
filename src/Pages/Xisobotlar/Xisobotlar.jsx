import { useState } from "react";
import { UseCollection } from "../../Hooks/UseCollection";
import { FaSearch } from "react-icons/fa";

const Xisobotlar = () => {
  const { data: soldProducts } = UseCollection("soldProduct");
  const [searchTerm, setSearchTerm] = useState("");
  
  const now = new Date();
  const isToday = now.getDate();
  const isMonth = now.getMonth() + 1;
  const isYear = now.getFullYear();

  // ASOSIY MANTIQ:
  const filteredData = soldProducts?.filter((product) => {
    const matchesSearch = 
      product.pName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  return (
    <div >
      

      <table className="w-full border-collapse shadow-lg">
        <caption className="bg-[#2D5F5D] text-white  py-3 rounded-t-md ">
          <div className="flex justify-between items-center w-[60%] ml-auto pr-3">
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
        <thead>
          <tr className="bg-gray-200">
            <th>Brend</th>
            <th>Maxsulot</th>
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
              <tr key={product.id}>
                <td >{product.bName}</td>
                <td >{product.pName}</td>
                <td >{product.size}</td>
                <td >{product.sellAmount}</td>
                <td >{product.cPrice}</td>
                <td >{product.sellPrice}</td>
                <td >{product.calcItogo}</td>
                <td >{product.calcingProfit}</td>
                <td >{product.vaqt?.full}</td>
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
    </div>
  );
};

export default Xisobotlar;