import { useEffect, useState } from "react";
import Modal from "../../molecules/Modal";
import Form from "../Form";
import PasswordInput from "../../molecules/PasswordInput";
import Button from "../../atoms/Button";
import { getData } from "../../../utils/apiConnector";

export default function ChangePassword({ userId, isOpen, toggleModal }) {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) { // Solo reiniciar cuando se abre el modal
            setPasswords({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            });
            setError(""); // Limpiar el error al abrir el modal
        }
    }, [isOpen]);

    const handleInputChange = ({ name, value }) => {

        setPasswords((prevData) => {
            const newData = {
                ...prevData,
                [name]: value,
            };

            if (newData.newPassword === newData.confirmNewPassword) {
                setError("");
            } else {
                setError("New password and confirmation do not match.");
            }

            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmNewPassword) {
            setError("New password and confirmation do not match.");
            return;
        } else if(passwords.newPassword.length < 8){
            setError("The password must be a minimum of 8 characters.");
            return;
        }

        const apiUrl = `https://www.APIPetrack.somee.com/User/ChangePassword/${userId}`;
        const body = {
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword
        };

        try {
            const apiResponse = await getData(apiUrl, body, true, "PUT");

            if (apiResponse.result) {
                alert(apiResponse.message);
                toggleModal();
            } else {
                alert(apiResponse.message);
            }
        } catch (error) {
            console.log("Error changing password: ", error);
            alert("Error changing password");
        }
    };

    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <Form title="Change password" type="edit" onSubmit={handleSubmit}>
                <p className="px-5">Current password</p>
                <PasswordInput
                    size="medium"
                    placeholder="Current password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handleInputChange}
                />
                <hr className="my-2 border-t-2 border-gray-300" />

                <p className="px-5">New password</p>
                <PasswordInput
                    size="medium"
                    placeholder="New password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleInputChange}
                />
                <p className="px-5">Confirm new password</p>
                <PasswordInput
                    size="medium"
                    placeholder="Confirm new password"
                    name="confirmNewPassword"
                    value={passwords.confirmNewPassword}
                    onChange={handleInputChange}
                />
                {error && <p className="my-2 text-red-500">{error}</p>}
                <Button type="submit" size="small" variant="solid-green">
                    Change
                </Button>
            </Form>
        </Modal>
    );
}