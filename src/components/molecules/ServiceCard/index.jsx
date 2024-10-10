import PropTypes from 'prop-types';

const ServiceCard = ({ image, text }) => (
    <div className="relative w-3/4 aspect-[3/2] rounded-3xl overflow-hidden hover:scale-110 hover:brightness-110 transition-transform duration-300">
        <div
            className="absolute inset-0 bg-cover bg-center brightness-50"
            style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 flex justify-center items-end pb-5">
            <p className="text-2xl font-bold text-center text-white brightness-100 z-10">{text}</p>
        </div>
  </div>
  
);

ServiceCard.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ServiceCard;