import Button from "../../atoms/Button";
import "./styles.css";


export default function CustomAlert({ message, type = "success", position="center", onAccept }) {
    return (
        <div className="bg-white flex flex-col fixed p-4 rounded-lg">
            <span className="mb-4">{message}</span>
            <Button onClick={onAccept} variant={"solid-green"} size="extra-small">Aceptar</Button>
        </div>
    );
}