import "./styles.css";
import Card from "../../molecules/Card";
import veterinary from "../../../assets/img/veterinary.webp"

export default function CardsContainer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card link="#" imgSrc={veterinary} imgAlt="Veterinary">Veterinary</Card>
        <Card link="#" imgSrc={veterinary} imgAlt="Veterinary">Veterinary</Card>
        <Card link="#" imgSrc={veterinary} imgAlt="Veterinary">Veterinary</Card>
    </div>
  );
}