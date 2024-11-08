import Logo from '../../atoms/Logo';
import SocialMedia from '../../atoms/Icons/SocialMedia';
import Phone from '../../atoms/Icons/Phone';
import Adress from '../../atoms/Icons/Location';
import Email from '../../atoms/Icons/Email';

const Footer = () => (
  <footer className="bg-[#045D5A] text-white">
    <div className='flex flex-col md:flex-row justify-center items-center p-12 gap-12 md:gap-24'>
      <div className='flex flex-col items-center gap-3'>
        <Logo size="large" type="imageWithLogo" />
        <p className='font-semibold text-center  '>
          Conectando Mascotas y Dueños
        </p>
        <div className='flex gap-8 justify-center items-center'>
          <SocialMedia variant='instagram' href='#' />
          <SocialMedia variant='youtube' href='#' />
          <SocialMedia variant='x' href='#' />
        </div>
      </div>

      <div className='flex flex-col gap-4 items-center justify-center mt-6 md:mt-0'>
        <p className='text-2xl font-semibold text-center'>Nuestros Servicios</p>
        <a href="/" className='text-center'>Página de Inicio</a>
        <a href="/ShelterListPage" className='text-center'>Catálogo de Adopciones</a>
      </div>

      <div className='flex flex-col gap-4 items-center justify-center mt-6 md:mt-0'>
        <p className='text-2xl font-semibold'>Contáctanos</p>
        <div className='flex gap-3 items-center'>
          <Phone size='small' color='white' />
          <p>(123) 456-7890</p>
        </div>
        <div className='flex gap-3 items-center'>
          <Email size='small' color='white' />
          <a href="mailto:novateam.novateam.nt@gmail.com">novateam.novateam.nt@gmail.com</a>
        </div>
      </div>
    </div>

    <p className='font-semibold text-center p-2'>© 2024 Petrack. Todos los derechos reservados</p>
  </footer>
);

export default Footer;
