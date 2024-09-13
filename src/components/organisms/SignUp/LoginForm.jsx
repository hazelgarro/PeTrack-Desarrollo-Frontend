import React from 'react';
import LoginFormFields from '../../molecules/SignUp/LoginFormFields';
import Button from '../../atoms/Button';
import TextLink from '../../atoms/SignUp/Link';

const LoginForm = () => (
  <div className="md:px-2">
    <div className="flex justify-center mt-20">
    </div>
    <form
      className="bg-[#FEFFFF] my-16 mx-5 xl:mx-20 2xl:mx-96 rounded-3xl py-10 2xl:py-16 px-4"
      method="post"
    >
      <h1 className="text-3xl 2xl:text-6xl font-semibold text-center">Welcome back!</h1>
      <p className="mt-6 text-lg 2xl:text-xl font-semibold text-center">Please enter your details</p>
      
      <LoginFormFields />
      
      <li className="flex justify-center">
        <Button variant="solid-green" size='medium' >Sign In</Button>
      </li>

      <li className="flex justify-center">
        <div className="flex flex-row justify-items-center justify-center mt-5">
          <p className="text-[#8E8E8E]">Don't have an account?</p>
          <TextLink href="!!!POR HACER!!!" text="Sign Up" className="text-[#E99003] ml-1" />
        </div>
      </li>
    </form>
  </div>
);

export default LoginForm;