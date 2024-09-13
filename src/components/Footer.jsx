import React from 'react';

const Footer = () => {
  return (
    <div className=" bg-slate-800 text-white flex flex-col justify-center items-center w-full">
      <div className="flex logo font-bold justify-center items-center text-2xl">
        <span className="text-black">&lt;</span>
        Pass<span className="text-green-700">Manager/&gt;</span>
      </div>

      

      <p className="text-center flex items-center mt-0">
       created with&nbsp;
        <lord-icon
          src="https://cdn.lordicon.com/ohfmmfhn.json"
          trigger="loop"
          delay="2000"
         
        ></lord-icon>
      </p>
    </div>
  );
};

export default Footer;
