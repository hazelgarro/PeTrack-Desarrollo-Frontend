import React from 'react';
import ContactInfo from '../atoms/ContactInfo';
import phoneIcon from '../../assets/img/Telephone.png';
import mapIcon from '../../assets/img/PinMapFill.png';
import emailIcon from '../../assets/img/Envelope.png';

const ContactDetails = () => (
  <div className="flex flex-col justify-evenly">
    <p className="text-4xl font-bold">Get In Touch</p>
    <ContactInfo icon={phoneIcon} text="+506 1234-7890" />
    <ContactInfo icon={mapIcon} text="Address" />
    <ContactInfo icon={emailIcon} text="emailaccount@email.com" />
  </div>
);

export default ContactDetails;