import Logo from '../../atoms/Logo';
import SocialMedia from '../../atoms/Icons/SocialMedia';
import Phone from '../../atoms/Icons/Phone';
import Adress from '../../atoms/Icons/Location';
import Email from '../../atoms/Icons/Email';
const Footer = () => (
  <footer className="bg-[#045D5A] text-white">
      <div className='grid grid-cols-1 md:grid-cols-3 py-10'>
          <div className='flex flex-col items-center gap-3 md:col-span-1'>
              <Logo size="large" type="imageWithLogo"/>
              <p className='font-semibold'>Connecting Pets, Owners, and <br /> 
              Caregivers for a Healthier Future.</p>
              <div className='flex gap-3 justify-start items-start'>
                <SocialMedia variant='instagram' href='#' ></SocialMedia>
                <SocialMedia variant='youtube' href='#' ></SocialMedia>
                <SocialMedia variant='x' href='#' ></SocialMedia>
              </div>
              <p className='font-semibold invisible md:visible'>© 2024 Petrack. All rights reserved</p>
          </div>
          <div className='flex flex-col gap-4 items-center justify-center md:col-span-1 md:mt-2'>
            <p className='text-2xl font-semibold'>Our Services</p>
            <a href="#">Home Page</a>
            <a href="#">Adoption Catalog</a>
            <a href="#">QR Identification Service</a>
          </div>
          <div className='flex flex-col gap-4 items-center justify-center md:col-span-1 mt-6 md:mt-2'>
            <p className='text-2xl font-semibold'>Get In Touch</p>
            <div className='flex gap-3 items-center'>
              <Phone size='small' color='white'></Phone>
              <p>(123) 456-7890</p>
            </div>
            <div className='flex gap-3 items-center'>
              <Adress size='small' color='white'></Adress>
              <p>Veterinary Directory</p>
            </div>
            <div className='flex gap-3 items-center'>
              <Email size='small' color='white'></Email>
              <p>emailaccount@email.com</p>
            </div>
            <p className='font-semibold visible md:invisible'>© 2024 Petrack. All rights reserved</p>
          </div>
      </div>
  </footer>
);

export default Footer;