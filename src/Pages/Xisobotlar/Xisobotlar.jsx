import { UseCollection } from "../../Hooks/UseCollection"



const Xisobotlar = () => {
  const {data: soldProducts} = UseCollection("soldProduct")
  // console.log(soldProducts)


  return (
    <div>
      <table>
        <caption className="border bg-[#2D5F5D] text-white font-bold text-2xl py-2 rounded-md">
          xisobotlar
        </caption>
        <thead>
          <tr>
            <th>brend</th>
            <th>maxsulot</th>
            <th>razmeri</th>
            <th>soni</th>
            <th>kelishi</th>
            <th>sotilishi</th>
            <th>jami</th>
            <th>foyda</th>
          </tr>
        </thead>
        <tbody>
          {soldProducts && soldProducts.map((product)=>(
            <tr key={product.id}>
              <td>{product.bName}</td>
              <td>{product.pName}</td>
              <td>{product.size}</td>
              <td>{product.sellAmount}</td>
              <td>{product.cPrice}</td>
              <td>{product.sellPrice}</td>
              <td>{product.calcItogo}</td>
              <td>{product.calcingProfit}</td>
            </tr>
          ))}
        </tbody>
      </table>
        
    </div>
  )
}

export default Xisobotlar