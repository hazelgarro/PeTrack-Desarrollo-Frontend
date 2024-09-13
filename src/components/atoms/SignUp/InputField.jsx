import React from 'react';

const InputField = ({ type, placeholder, name }) => (
  <input
    className="hover:border-[#E99003] focus:border-[#E99003] focus:outline-none border-2 border-black rounded-3xl text-2xl px-5 py-2"
    type={type}
    placeholder={placeholder}
    name={name}
  />
);

export default InputField;