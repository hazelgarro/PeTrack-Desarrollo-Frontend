import React from 'react';
import SignUpForm from '../../organisms/SignUp/SignUpForm';
import logo from '../../../assets/img/logo.png';

const PageTemplate = () => (
  <div
    className="bg-[url(../../../assets/img/movil_Bg.png)] md:bg-[url(../../../assets/img/Bg.png)] bg-cover bg-no-repeat bg-center w-screen h-screen overflow-hidden"
  >
    <div className="md:px-96">
      <div className="flex justify-center mt-20">
        <img src={logo} alt="Logo" />
      </div>
      <SignUpForm />
    </div>
  </div>
);

export default PageTemplate;