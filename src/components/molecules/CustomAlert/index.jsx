import Button from "../../atoms/Button";
import "./styles.css";


export default function CustomAlert({ message, type = "success", position = "center", onAccept }) {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
            <div className="bg-white flex flex-col fixed p-4 rounded-lg border-2 border-petrack-green z-50">
                <span className="mb-4 text-petrack-green">{message}</span>
                <Button onClick={onAccept} variant={"solid-green"} size="extra-small">Aceptar</Button>
            </div>
        </>
    );
}