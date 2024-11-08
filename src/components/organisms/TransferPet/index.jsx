import { useState } from "react";
import { useOpenClose } from "../../../hooks/useOpenClose";
import TextInput from "../../atoms/TextInput";
import Form from "../../organisms/Form";
import Modal from "../../molecules/Modal";
import Button from "../../atoms/Button";
import TransferIcon from "../../atoms/Icons/Transfer";
import PasswordInput from "../../molecules/PasswordInput";
import { getData } from "../../../utils/apiConnector";

export default function TrasferPet({isAuthenticated, petAccountData }) {
    const { isOpen, toggleModal } = useOpenClose();

    const [transferData, setTransferData] = useState({ email: "", password: "" });

    const handleInputChange = ({ name, value }) => {
        setTransferData((prevData) => {
            const newData = {
                ...prevData,
                [name]: value
            };
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            alert("Por favor, inicie sesión para enviar una solicitud de adopción.");
            return;
        }

        const transferRequestData = {
            petId: petAccountData.id,
            currentOwnerId: petAccountData.ownerId,
            newOwnerEmail: transferData.email,
            password: transferData.password
        }

        console.log(transferRequestData);

        try {
            const apiUrl = "https://www.APIPetrack.somee.com/Transfer/RequestTransfer";
            const response = await getData(apiUrl, transferRequestData, true, "POST");

            if (response.result) {
                alert(response.message);
            } else {
                alert(response.message || "Ocurrió un error al enviar la solicitud de adopción.");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud de adopción:", error);
            alert("Error al enviar la solicitud de adopción. Intente más tarde.");
        }
    }

    return (
        <>
            <Button onClick={toggleModal} variant="border-green" variant2="content-fit" size="extra-small">
                <div className="flex items-center gap-1">
                    <TransferIcon size="medium"></TransferIcon> <span>Transfer</span>
                </div>
            </Button>

            <Modal isOpen={isOpen} toggleModal={toggleModal}>
                <Form title="Reasignar hogar" subTitle="Ingresa el correo del nuevo dueño de la mascota y tu contraseña" type="edit" onSubmit={handleSubmit}>
                    <TextInput
                        size="medium"
                        placeholder="Correo"
                        name="email"
                        type="email"
                        value={transferData.email}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        size="medium"
                        placeholder="Contraseña"
                        name="password"
                        value={transferData.password}
                        onChange={handleInputChange}
                    />
                    <Button type="submit" size="small" variant="solid-green">
                        Transferir
                    </Button>
                </Form>
            </Modal>
        </>
    );
}