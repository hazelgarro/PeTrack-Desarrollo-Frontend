import "./styles.css";

export default function Image({imgSrc, imgAlt}) {
  return (
    <img src={imgSrc} alt={imgAlt}/>
  );
}