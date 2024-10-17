export default function Image({ imgSrc, imgAlt }) {
  return (
    <div className="w-full h-0 pb-[56.25%] relative">
      <img src={imgSrc} alt={imgAlt} className="absolute top-0 left-0 w-full h-full object-cover" />
    </div>
  );
}