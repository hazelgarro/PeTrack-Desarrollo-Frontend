import "./styles.css";
import Card from "../../molecules/Card";
import veterinary from "../../../assets/img/veterinary.webp"

export default function CardsContainer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card typeCard={"service"} link="#" imgSrc={veterinary} imgAlt="Veterinary" title={"Veterinary"}></Card>
        <Card typeCard={"pet"} link="#" imgSrc={veterinary} imgAlt="Veterinary" title={"Veterinary"}></Card>
        <Card typeCard={"adoption_pet"} link="#" imgSrc={veterinary} imgAlt="Veterinary" title={"Veterinary"}></Card>
        <Card typeCard={"service"} link="#" imgSrc={veterinary} imgAlt="Veterinary" title={"Veterinary"}></Card>
    </div>
  );
}