import { useState } from 'react';
import { useEffect } from 'react';
import FormFields from '../../molecules/SignUp/FormFields';
import FormFooter from '../../molecules/SignUp/FormFooter';
import Text from '../../atoms/SignUp/Text';

import createAccount from "../../../utils/register";
import loginUser from "../../../utils/authentication";

export default function SignUpForm() {

  const handleUserData = (event) => {
    event.preventDefault();
    /*
    const form = event.target
    const inputs = form.elements
    let dataForm = {}

    Array.from(inputs).forEach(input => {
      if (input.name !== "") {
        dataForm[input.name] = input.value
        console.log(dataForm)
      }
    });*/

    /*  createAccount("branjox@ejemplo.com", "12345678", "O", "profilePicture", "88881111", { CompleteName: "Brandon Josué Brenes Arias" })
    .then(response => {
      alert(response.message);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while creating the account.');
    });*/

    loginUser("branjox@ejemplo.com", "12345678")
    .then(response => {
      alert(response.result ? "Successful login" : "Login error");
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while login the account.');
    });
  };

  return (
    <form className="bg-[#FEFFFF] my-16 mx-5 xl:mx-20 2xl:mx-96 rounded-3xl py-10 2xl:py-16 px-4" onSubmit={handleUserData}>
      <Text className="text-3xl 2xl:text-6xl font-semibold text-center" text="Sign up" />
      <FormFields />
      <FormFooter />
    </form>
  );
} 