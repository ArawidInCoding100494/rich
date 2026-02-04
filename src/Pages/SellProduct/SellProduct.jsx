import { useState } from "react";
import { UseCollection } from "../../Hooks/UseCollection";
import SellingProduct from "../../Components/SellingProduct/SellingProduct";
import Modal from "../../Components/Modal/Modal";
import { FaSearch } from "react-icons/fa";

const SellProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [getProductValue, setGetProductValue] = useState();
  const { data: products } = UseCollection("products");

  return (
    <div >

      <div className="flex justify-between items-center ">
        <h3 className="font-bold text-2xl capitalize text-[#2D5F5D]">savdo bolimi</h3>
        <div className="flex justify-between items-center px-3">
          <div className="relative">
            <input
              type="text"
              placeholder="qidirish..."
              className="inp  p-0 w-38 lg:w-auto"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-2 text-[#2D5F5D]" />
          </div>
        </div>
      </div>
      <div className="cards lg:grid grid-cols-2 gap-1.5">
      {products &&
        products
          .filter((product) => {
          if (searchTerm.trim() === "") return product;
          return (
            product.pName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.pColor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.bName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
          .map((product) => (
            <div
              className="card border cursor-pointer bg-[#2D5F5D] text-white capitalize relative my-2 p-3 rounded-2xl lg:my-1 duration-400 hover:bg-white hover:text-[#2D5F5D]"
              key={product.id}
            >
              <h3 className="capitalize font-bold text-2xl">{product.bName}</h3>
              <div className="flex justify-between items-center ml-12 w-[70%] my-3">
                <h3 className="text-[18px] font-bold">{product.pName}</h3>
                <h3 className="text-[18px] font-bold">{product?.pColor}</h3>
                <h3>{product.cPrice}</h3>
              </div>
              <h3 className="flex items-center justify-between w-[50%] ml-12">
                {product.sizes?.map((size) => (
                  <p key={size.size}>
                    {size.size}={size.count}
                  </p>
                ))}
              </h3>
              <button
                className="btn absolute bottom-2 right-12"
                onClick={() => setGetProductValue(product)}
              >
                sell
              </button>
            </div>
          ))}

      {getProductValue && (
        <Modal
          close={() => {
            setGetProductValue(null);
            // setBasket([]);
          }}
          title="Mahsulot sotish"
        >
          <SellingProduct
            productValue={getProductValue}
            setGetProductValue={setGetProductValue}
          />
        </Modal>
      )}
      </div>
    </div>
  );
};

export default SellProduct;