import React from 'react';
import InputField from '../../atoms/SignUp/InputField';

const FormFields = () => (
  <ul className="my-9 flex flex-col gap-7">
    <li className="flex justify-center">
      <InputField type="text" placeholder="First Name" />
    </li>
    <li className="flex justify-center">
      <InputField type="text" placeholder="Last Name" />
    </li>
    <li className="flex justify-center">
      <InputField type="email" placeholder="Email Address" />
    </li>
    <li className="flex justify-center">
      <InputField type="password" placeholder="Password" />
    </li>
    <li className="flex justify-center">
      <InputField type="password" placeholder="Confirm Password" />
    </li>
  </ul>
);

export default FormFields;