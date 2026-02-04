import { useEffect, useState } from "react";
import { UseFireStore } from "../../Hooks/UseFireStore";




const SellingProduct = ({ productValue, setGetProductValue }) => {
    const {addDocument: addSoldProduct} = UseFireStore("soldProduct")
    const {editDocument: editProducts} = UseFireStore("products")
    const [sellPrice, setSellPrice] = useState("")
    const [sellAmount, setSellAmount] = useState("")
    const [calcItogo, setCalcItogo] = useState("")
    const [calcingProfit, setCalcingProfit] = useState("")
    const [selectedSize, setSelectedSize] = useState("")


    useEffect(()=>{
        const calcingItogo = Number(sellAmount) * Number(sellPrice)
        const calcProfit = Number(sellPrice) - Number(productValue.cPrice)
        setCalcingProfit(calcProfit)
        setCalcItogo(calcingItogo)
    }, [sellAmount, sellPrice])



    const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Razmer tanlanganini tekshiramiz
  if (!selectedSize) {
    alert("Iltimos, razmerni tanlang!");
    return;
  }

try {
  const hozir = new Date();

  const yil = hozir.getFullYear();
  const oy = hozir.getMonth() + 1; 
  const kun = hozir.getDate();
  const soat = hozir.getHours();
  const minut = hozir.getMinutes();

  const toliqSana = `${kun}.${oy}.${yil} ${soat}:${minut}`;

  await addSoldProduct({
    bName: productValue.bName,
    pName: productValue.pName,
    pColor: productValue.pColor,
    size: selectedSize,
    sellAmount: Number(sellAmount),
    cPrice: Number(productValue.cPrice),
    sellPrice: Number(sellPrice),
    calcingProfit: Number(calcingProfit),
    calcItogo: Number(calcItogo),
    
    vaqt: {
      yil: yil,
      oy: oy,
      kun: kun,
      soat: soat,
      minut: minut,
      full: toliqSana
    },
    
    timestamp: hozir 
  });

    const updatedSizes = productValue.sizes.map((item) => {
      if (item.size === selectedSize) {
        const newCount = item.count - Number(sellAmount);
        return { ...item, count: newCount < 0 ? 0 : newCount }; 
      }
      return item;
    });

    const allSold = (productValue.soldAmount || 0) + Number(sellAmount);


    await editProducts(productValue.id, {
      sizes: updatedSizes,
      soldAmount: allSold
    });

    alert("Mahsulot sotildi va ombor yangilandi!");

    setSellAmount("");
    setSellPrice("");
    setCalcItogo("");
    setGetProductValue(null);

  } catch (error) {
    console.error("Xatolik:", error);
    alert("Xatolik yuz berdi: " + error.message);
  }
};





  return (
    <div className="p-6 bg-[#2D5F5D] h-screen">
      <div className="bg-white p-3 rounded-2xl">

        <div className="flex items-center justify-between lg:w-70">
            <span>Brend nomi:</span>
        <h3 className="font-bold lg:text-2xl text-[#2D5F5D] capitalize"> {productValue.bName}</h3>
        </div>

        <div className="flex items-center justify-between lg:w-70">
            <span>Max nomi:</span>
        <h3 className="font-bold lg:text-2xl text-[#2D5F5D] capitalize">{productValue.pName}</h3>
        </div>

        <div className="flex items-center justify-between lg:w-70">
            <span>Maxsulot rangi:</span>
        <h3 className="font-bold lg:text-2xl text-[#2D5F5D] capitalize">{productValue?.pColor}</h3>
        </div>


        <form onSubmit={handleSubmit}>

          <label className="formLabel px-0  ">
            <span className="labelSpan text-[#2D5F5D] ">Razmerni tanlang:</span>
            <select className="inp outline-none"
            value={selectedSize}
            onChange={(e)=>setSelectedSize(e.target.value)}
            >
              <option value="">Tanlang...</option>
              {productValue.sizes.map((size) => (
                <option key={size.size} value={size.size}>
                  {size.size.toUpperCase()}
                </option>
              ))}
            </select>
          </label>

          <label className="formLabel px-0">
            <span className="labelSpan text-[#2D5F5D]">sotish soni:</span>
            <input
              className="inp"
              type="number"
              required
              placeholder="sotish soni..."
              value={sellAmount}
              onChange={(e)=>setSellAmount(e.target.value)}
              onWheel={(e) => e.target.blur()}
            />
          </label>

          <label className="formLabel px-0">
            <span className="labelSpan text-[#2D5F5D]">sotish narxi:</span>
            <input
              className="inp"
              type="number"
              required
              placeholder="sotish narxi..."
              value={sellPrice}
              onChange={(e)=>setSellPrice(e.target.value)}
              onWheel={(e) => e.target.blur()}
            />
          </label>


          <label className="formLabel px-0">
            <span className="labelSpan text-[#2D5F5D]">jami summa:</span>
            <input
              className="inp"
              type="number"
              readOnly
              placeholder={calcItogo}
            />
          </label>


          <div className="btns my-3">
            <button className="btn" onClick={()=>setGetProductValue(null)} type="button">bekor qil</button>
            <button className="btn">sotish</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SellingProduct;
