import { useEffect, useState } from "react";

const EditProduct = ({ editValue, setOpenEdit }) => {
  const [editData, setEditData] = useState(null);

  // props kelganda state ga ko‘chiramiz
  useEffect(() => {
    if (editValue) {
      setEditData(editValue);
    }
  }, [editValue]);

  // ===== mainCount update =====
  const handleMainChange = (index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      mainCount: prev.mainCount.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  // ===== sizes update =====
  const handleSizesChange = (index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      sizes: prev.sizes.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  // ===== itogo hisoblash =====
  useEffect(() => {
    if (!editData) return;

    const total = editData.mainCount.reduce(
      (sum, item) => sum + item.count * editData.cPrice,
      0,
    );

    setEditData((prev) => ({ ...prev, itogo: total }));
  }, [editData?.mainCount, editData?.cPrice]);

  // ===== submit =====
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("EDIT DATA (tayyor):", editData);

    // 🔥 bu yerda backend / firestore update qilasan
    setOpenEdit(false);
  };

  if (!editData) return null;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-[#2D5F5D] rounded-2xl p-6 text-white w-96 h-screen ml-3 lg:ml-0">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Brand */}
          <label className="formLabel">
            <span>Brand nomi</span>
            <input
              className="inp"
              value={editData.bName}
              onChange={(e) =>
                setEditData({ ...editData, bName: e.target.value })
              }
            />
          </label>

          {/* Product */}
          <label className="formLabel">
            <span>Mahsulot nomi</span>
            <input
              className="inp"
              value={editData.pName}
              onChange={(e) =>
                setEditData({ ...editData, pName: e.target.value })
              }
            />
          </label>

          {/* Price */}
          <label className="formLabel">
            <span>Kelish narxi</span>
            <input
              type="number"
              className="inp"
              value={editData.cPrice}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  cPrice: Number(e.target.value),
                })
              }
              onWheel={(e) => e.target.blur()}
            />
          </label>

          {/* Main Count */}
          <label className="formLabel">
            <span>Kelish soni</span>
            {editData.mainCount.map((item, index) => (
              <div key={index} className="flex gap-2 mt-1">
                <input
                  className="inp w-12"
                  value={item.size}
                  onChange={(e) =>
                    handleMainChange(index, "size", e.target.value)
                  }
                />
                <input
                  className="inp w-20"
                  type="number"
                  value={item.count}
                  onChange={(e) =>
                    handleMainChange(index, "count", Number(e.target.value))
                  }
                  onWheel={(e) => e.target.blur()}
                />
              </div>
            ))}
          </label>

          {/* Sizes */}
          <label className="formLabel">
            <span>Ombordagi son</span>
            {editData.sizes.map((item, index) => (
              <div key={index} className="flex gap-2 mt-1">
                <input
                  className="inp w-12"
                  value={item.size}
                  onChange={(e) =>
                    handleSizesChange(index, "size", e.target.value)
                  }
                />
                <input
                  className="inp w-20"
                  type="number"
                  value={item.count}
                  onChange={(e) =>
                    handleSizesChange(index, "count", Number(e.target.value))
                  }
                  onWheel={(e) => e.target.blur()}
                />
              </div>
            ))}
          </label>

          {/* Sold */}
          <label className="formLabel">
            <span>Sotilgan soni</span>
            <input
              type="number"
              className="inp"
              value={editData.soldAmount}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  soldAmount: Number(e.target.value),
                })
              }
              onWheel={(e) => e.target.blur()}
            />
          </label>

          {/* Itogo */}
          <label className="formLabel">
            <span>Itogo</span>
            <input className="inp" readOnly value={editData.itogo} />
          </label>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              className="btn"
              onClick={() => setOpenEdit(false)}
            >
              Bekor qilish
            </button>
            <button type="submit" className="btn">
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
