import React from 'react';
import Link from '../../atoms/SignUp/Link';
import Button from '../../atoms/SignUp/Button';
import Text from '../../atoms/SignUp/Text';

const FormFooter = () => (
  <div>
    <li className="flex justify-center mb-3">
      <Link className="text-[#8E8E8E]" href="!!!POR HACER!!!" text="Forgot password?" />
    </li>
    <li className="flex justify-center">
      <Button text="Sign Up" />
    </li>
    <li className="flex justify-center">
      <div className="flex flex-row justify-items-center justify-center m-3">
        <Text className="text-[#8E8E8E]" text="Already have an account?" />
        <Link className="text-[#E99003] ml-1" href="!!!POR HACER!!!" text="Sign in" />
      </div>
    </li>
  </div>
);

export default FormFooter;