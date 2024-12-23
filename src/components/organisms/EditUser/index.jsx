import { useEffect, useState } from "react";
import { useOpenClose } from "../../../hooks/useOpenClose";
import Modal from "../../molecules/Modal";
import Button from "../../atoms/Button";
import IconEdit from "../../atoms/Icons/Edit";
import Form from "../../organisms/Form";
import TextInput from "../../atoms/TextInput";
import { getData } from "../../../utils/apiConnector.js";
import { useSession } from '../../../context/SessionContext';
import { showMessageDialog } from "../../../utils/customAlerts.jsx";

export default function EditUser({ accountData }) {
    const { isOpen, toggleModal } = useOpenClose();
    const {updateSessionState} = useSession();

    const [userData, setUserData] = useState(accountData);
    const [namePlaceholder, setNamePlaceholder] = useState("Full name");

    useEffect(() => {
        setUserData(accountData);

        if (accountData.userTypeId === "S") {
            setNamePlaceholder("Organization name");
        } else {
            setNamePlaceholder("Full name");
        }
    }, [isOpen]);

    const handleInputChange = ({ name, value }) => {
        setUserData((prevData) => {
            const newData = {
                ...prevData,
                [name]: value
            };
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userData === accountData){
            toggleModal();
            showMessageDialog("No se realizó ningun cambio", "success", "top");
        }
        else{
            try {
                const apiUrl = `https://www.APIPetrack.somee.com/User/EditUser/${accountData.id}`;
                const apiResponse = await getData(apiUrl, userData, true, "PUT");
    
                if(apiResponse.result){
                    updateSessionState();
                    showMessageDialog("Los cambios se guardaron exitosamente", "success", "top");
                    toggleModal();
                }else{
                    showMessageDialog(apiResponse.message, "warning", "top");
                }
            } catch (error) {
                toggleModal();
                console.error("Error al editar la mascota:", error);
                showMessageDialog("Error al editar la mascota", "warning", "top");
            }
        }
    }

    return (
        <>
            <Button variant="border-green" variant2="content-fit" size="extra-small" onClick={toggleModal}>
                <div className="flex items-center gap-1">
                    <IconEdit size="medium" /> <span>Editar</span>
                </div>
            </Button>

            <Modal isOpen={isOpen} toggleModal={toggleModal}>
                <Form title="Edit profile" type="edit" onSubmit={handleSubmit}>
                    <p className="px-5">Name</p>
                    <TextInput
                        size="medium"
                        placeholder={namePlaceholder} // Placeholder dinámico
                        name={userData.userTypeId === "O"? "completeName" : "name" }
                        value={userData.userTypeId === "O"? userData.completeName : userData.name}
                        onChange={handleInputChange}
                    />
                    <p className="px-5">Email</p>
                    <TextInput
                        size="medium"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                    <p className="px-5">Phone number</p>
                    <TextInput
                        size="medium"
                        placeholder="Phone number"
                        name="phoneNumber"
                        type="tel"
                        isRequired={false}
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                    />

                    {/* información exclusiva del refugio */}
                    {accountData.userTypeId === "S" && (
                        <>
                            <p className="px-5">Address</p>
                            <TextInput
                                size="medium"
                                placeholder="Address"
                                name="address"
                                value={userData.address}
                                onChange={handleInputChange}
                                isRequired={false}
                            />
                            <p className="px-5">Working Days</p>
                            <TextInput
                                size="medium"
                                placeholder="Working Days"
                                name="workingDays"
                                value={userData.workingDays}
                                onChange={handleInputChange}
                                isRequired={false}
                            />
                            <p className="px-5">Working Hours</p>
                            <TextInput
                                size="medium"
                                placeholder="Working Hours"
                                name="workingHours"
                                value={userData.workingHours}
                                onChange={handleInputChange}
                                isRequired={false}
                            />
                        </>
                    )}

                    <Button type="submit" size="small" variant="solid-green">
                        Save
                    </Button>
                </Form>
            </Modal>
        </>
    );
}
