import React from 'react';

const Button = ({ text }) => (
  <button className="hover:border-[#E99003] focus:border-[#E99003] focus:outline-none border-2 bg-[#045D5A] text-[#FEFFFF] rounded-3xl text-2xl px-24 py-2 w-full md:w-max">
    {text}
  </button>
);

export default Button;