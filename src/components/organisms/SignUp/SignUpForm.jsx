import { useState } from 'react';
import { useEffect } from 'react';
import FormFields from '../../molecules/SignUp/FormFields';
import FormFooter from '../../molecules/SignUp/FormFooter';
import Text from '../../atoms/SignUp/Text';

import createPetOwnerAccount from "../../../utils/register";

export default function SignUpForm() {

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '',
  });

  const handleUserData = (event) => {
    event.preventDefault();

    const form = event.target
    const inputs = form.elements
    let dataForm = {}

    Array.from(inputs).forEach(input => {
      if(input.name !== ""){
        dataForm[input.name] = input.value
        console.log(dataForm)
      }
    });
    
    
    createPetOwnerAccount(dataForm.firstName, dataForm.lastName, dataForm.email, dataForm.password)
    .then(response => {
        console.log('Respuesta recibida:', response);
    })
    .catch(error => {
        console.error('Error al crear la cuenta:', error);
    });
  };

  return (
    <form className="bg-[#FEFFFF] my-16 mx-5 xl:mx-20 2xl:mx-96 rounded-3xl py-10 2xl:py-16 px-4" onSubmit={handleUserData}>
      <Text className="text-3xl 2xl:text-6xl font-semibold text-center" text="Sign up" />
      <FormFields/>
      <FormFooter />
    </form>
  );
}