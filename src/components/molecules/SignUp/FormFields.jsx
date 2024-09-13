import React from 'react';
import InputField from '../../atoms/SignUp/InputField';

const FormFields = () => {

  return (
    <ul className="my-9 flex flex-col gap-7">
      <li className="flex justify-center">
        <InputField
          type="text"
          name="firstName"
          placeholder="First Name"
          id="firtsname-input"
        />
      </li>
      <li className="flex justify-center">
        <InputField
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
      </li>
      <li className="flex justify-center">
        <InputField
          type="email"
          name="email"
          placeholder="Email Address"
        />
      </li>
      <li className="flex justify-center">
        <InputField
          type="password"
          name="password"
          placeholder="Password"
        />
      </li>
      <li className="flex justify-center">
        <InputField
          type="password"
          name="confirmPassword"
          
          placeholder="Confirm Password"
        />
      </li>
    </ul>
  );
};

export default FormFields;
