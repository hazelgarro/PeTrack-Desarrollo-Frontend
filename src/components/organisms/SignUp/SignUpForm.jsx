import React from 'react';
import FormFields from '../../molecules/SignUp/FormFields';
import FormFooter from '../../molecules/SignUp/FormFooter';
import Text from '../../atoms/SignUp/Text';

const SignUpForm = () => (
  <form className="bg-[#FEFFFF] my-16 mx-5 xl:mx-20 2xl:mx-96 rounded-3xl py-10 2xl:py-16 px-4" method="post">
    <Text className="text-3xl 2xl:text-6xl font-semibold text-center" text="Sign up" />
    <FormFields />
    <FormFooter />
  </form>
);

export default SignUpForm;