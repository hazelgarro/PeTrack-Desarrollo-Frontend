import React from 'react';
import InputField from '../../atoms/SignUp/InputField';
import TextLink from '../../atoms/SignUp/Link';

const LoginFormFields = () => (
  <ul className="my-9 flex flex-col gap-7">
    <li className="flex justify-center">
      <InputField type="email" placeholder="Email Address" />
    </li>
    <li className="flex justify-center">
      <InputField type="password" placeholder="Password" />
    </li>
    <li className="flex justify-center">
      <TextLink href="!!!POR HACER!!!" text="Forgot password?" className="text-[#8E8E8E]" />
    </li>
  </ul>
);

export default LoginFormFields;