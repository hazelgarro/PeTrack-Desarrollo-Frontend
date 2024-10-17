import PropTypes from 'prop-types';

const ServiceCard = ({ image, text }) => (
    <div className="relative w-full sm:w-2/3 md:w-1/3 lg:w-1/2 xl:w-1/3 2xl:w-1/5 aspect-[3/2] rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300">
        <img 
            src={image} 
            alt={text} 
            className="absolute inset-0 w-full h-full object-cover rounded-3xl brightness-50" 
        />
        <div className="absolute inset-0 flex justify-center items-end pb-5">
        <p className="text-2xl font-bold text-center text-white z-10">{text}</p>
        </div>
    </div>
);

ServiceCard.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ServiceCard;
