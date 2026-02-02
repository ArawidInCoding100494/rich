// import { useState } from "react"



// const CreateProduct = () => {

//   const [chooseSize, setChooseSize] = useState({
//     sizes: [
//       {
//         size: xl,
//         count: 10
//       }
//     ]
//   })
//   console.log(chooseSize);
  


//   const allSizes = ["50", "52", "54", "56", "58", "60", "62", "64", "s", "m", "l", "xl", "2xl", "3xl", "4xl"]

//   const choosenSize = (e)=>{
//     const size = e.target.value
//     if(!size) return

//      setChooseSize((prev)=>({
//       ...prev,
//       [size]: prev[size] !== undefined ? prev[size] : 0
//      }))
//   }

//   return (
//     <div className='flex items-center justify-center h-full'>
//       <div className="content bg-[#2D5F5D] rounded-2xl p-2">
//         <h4 className="title">maxsulot qo'shing</h4>
//         <form className='forma w-75'>



//           <label className='formLabel'>
//             <span className='labelSpan'>maxsulot nomi:</span>
//             <input className='inp' type="text" placeholder="maxsulot nomi.." required />
//           </label>





//           <label className='formLabel'>
//             <span className='labelSpan'>maxsulot razmeri:</span>
//             <select className="inp"
//             onChange={choosenSize}
//             >
//               <option  value="">tanlang...</option>
//               {allSizes.map((size)=>(
//                 <option key={size} value={size}>{size.toUpperCase()}</option>
//               ))}
//             </select>
//           </label>

//           {chooseSize.map((size)=>(
//             <div>{size}</div>
//           ))}



//           {/* <label className='formLabel'>
//             <span className='labelSpan'>bren nomi:</span>
//             <input className='inp' type="text" placeholder="brend nomi.." />
//           </label> */}
//         </form>
//       </div>
//     </div>
//   )
// }

// export default CreateProduct

import { useEffect, useState } from "react";
import { UseFireStore } from "../../Hooks/UseFireStore";

const CreateProduct = ({setOpenCreateProduct}) => {
  const {addDocument: products} = UseFireStore("products")
  const [bName, setBname] = useState("")
  const [pName, setPname] = useState("")
  const [cPrice, setCprice] = useState("")
  // Tanlangan razmerlarni massiv sifatida saqlaymiz
  const [chooseSize, setChooseSize] = useState([]);
  const [itogo, setItogo] = useState("")

  // console.log(chooseSize);
  

  const allSizes = ["50", "52", "54", "56", "58", "60", "62", "64", "s", "m", "L", "xl", "2xl", "3xl", "4xl"];

  const handleSelectSize = (e) => {
    const selectedValue = e.target.value;
    if (!selectedValue) return;

    // Agar bu razmer allaqachon qo'shilgan bo'lsa, qayta qo'shmaymiz
    const exists = chooseSize.find((item) => item.size === selectedValue);
    if (exists) return;

    // Yangi razmerni massivga qo'shamiz
    setChooseSize([...chooseSize, { size: selectedValue, count: 0 }]);
    
    // Select qiymatini qayta tiklash
    e.target.value = "";
  };

  const handleCountChange = (size, value) => {
    const updatedSizes = chooseSize.map((item) => {
      if (item.size === size) {
        return { ...item, count: parseInt(value) || 0 };
      }
      return item;
    });
    setChooseSize(updatedSizes);
  };

  const removeSize = (size) => {
    setChooseSize(chooseSize.filter((item) => item.size !== size));
  };

const totalItems = chooseSize.reduce((total, item) => total + item.count, 0);

useEffect(()=>{
const allsums = Number(cPrice) * Number(totalItems)
setItogo(allsums)
}, [cPrice, totalItems])

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

      const hozir = new Date();

  const yil = hozir.getFullYear();
  const oy = hozir.getMonth() + 1; 
  const kun = hozir.getDate();
  const soat = hozir.getHours();
  const minut = hozir.getMinutes();

  const toliqSana = `${kun}.${oy}.${yil} ${soat}:${minut}`;


    await products({
      bName,
      pName,
      cPrice: Number(cPrice),
      sizes: chooseSize,
      mainCount: chooseSize,
      itogo: Number(itogo),      
      vaqt: {
      yil: yil,
      oy: oy,
      kun: kun,
      soat: soat,
      minut: minut,
      full: toliqSana
    }, 
    });

    alert("Maxsulot muvaffaqiyatli qo'shildi!");

    setBname("");
    setPname("");
    setCprice("");
    setItogo("");
    setChooseSize([]);
    setOpenCreateProduct(false)
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    alert("Xato: " + error.message);
  }
};


  return (
    <div className='flex items-center justify-center h-full'>
      <div className="content bg-[#2D5F5D] rounded-2xl p-6  text-white w-96 h-screen ml-3 lg:ml-0">
        <h4 className="title text-center mb-4 font-bold ">yangi maxsulot qo'shing!</h4>
        
        <form className='forma space-y-4 ' onSubmit={handleSubmit}>

          <label className='formLabel'>
            <span className='labelSpan'>brend nomi:</span>
            <input className='inp' 
            value={bName}
            type="text" placeholder="brend nomi.." onChange={(e)=>setBname(e.target.value)} />
          </label>


          <label className='formLabel'>
            <span className='labelSpan'>Maxsulot nomi:</span>
            <input className='inp' 
            value={pName}
            type="text" placeholder="Nomi.." required onChange={(e)=>setPname(e.target.value)} />
          </label>

          <label className='formLabel'>
            <span className='labelSpan'>maxsulot kelish narxi:</span>
            <input className='inp' 
            value={cPrice}
            type="text" placeholder="kelish narxi.." onChange={(e)=>setCprice(e.target.value)} onWheel={(e) => e.target.blur()} />
          </label>

          <label className='formLabel'>
            <span className='labelSpan'>Razmerni tanlang:</span>
            <select className="inp outline-none" onChange={handleSelectSize}>
              <option value="">Tanlang...</option>
              {allSizes.map((size) => (
                <option key={size} value={size}>{size.toUpperCase()}</option>
              ))}
            </select>
          </label>

          {/* Tanlangan razmerlar ro'yxati */}
          <div className="addCount formLabel p-0 m-0">
            {chooseSize.map((item) => (
              <div key={item.size} className="flex items-center justify-between bg-[#ffffff20]  rounded">
                <span className=" ">{item.size}:</span>
                <input 
                  type="number"
                  placeholder="Soni..."
                  className="inp w-20"
                  value={item.count === 0 ? "" : item.count}
                  onChange={(e) => handleCountChange(item.size, e.target.value)}
                  onWheel={(e) => e.target.blur()}
                />
                <button 
                  onClick={() => removeSize(item.size)}
                  className="bg-red-500 hover:bg-red-600 px-2 rounded"
                >✕</button>
              </div>
            ))}
          </div>

          
          <div className=" font-bold text-lg">
            <span>Umumiy miqdor:</span>
            <span className="text-white ml-5">{totalItems} ta</span>
          </div>

          <div className=" font-bold text-lg">
            <span>jami summa:</span>
            <span className="text-white ml-5">{itogo ? itogo : 0 } sum</span>
          </div>
        
            <div className="btns">
            <button className="btn" type="button" onClick={()=>setOpenCreateProduct(false)} >bekor qil</button>
              <button className=" btn ml-3">
              SAQLASH
            </button>
            </div>
            
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;