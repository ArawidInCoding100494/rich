import { IoMdClose } from "react-icons/io";

function Modal({ children, width, close, bg, title }) {
  return (
    <>
      <div
        onClick={() => close(false)}
        className=" w-[50%] h-screen bg-[#aaa1] fixed top-0 left-0 opacity-0 animate-[overlay_0.3s_forwards] z-120 inset-0  " ></div>
      <div 
      className="fixed w-[70%] lg:w-[40%] h-screen bg-white top-0 right-0 py-7.5 px-0 opacity-100 animate-[model_0.3s_forwards] overflow-auto z-9999">


        <div className="flex items-center justify-between py-3.75 px-7.5 border-b-[0.4px] border-black/50 mb-3.75">
          <h3 className="model__title">{title}</h3>
          <button onClick={() => close(false)} className="model__btn">
            <IoMdClose />
          </button>
        </div>
        <div className="model__children"> {children}</div>
      </div>
    </>
  );
}

export default Modal;