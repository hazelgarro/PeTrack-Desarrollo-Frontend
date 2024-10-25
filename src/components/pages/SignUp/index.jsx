import { useState } from "react";
import TextInput from "../../atoms/TextInput";
import SelectInput from "../../molecules/SelectInput";
import PasswordInput from "../../molecules/PasswordInput";
import AccountForm from "../../templates/AccountForm";
import Form from "../../organisms/Form";
import Button from "../../atoms/Button";
import { CSSTransition } from "react-transition-group";
import './styles.css';
import { useNavigate } from 'react-router-dom';
import Loader from "../../atoms/Loader/index.jsx";
import LoadImage from "../../organisms/LoadImage/index.jsx";
import { getData } from "../../../utils/apiConnector.js";
import { loginUser } from "../../../utils/sessionManager.js";
import { uploadImage } from '../../../utils/imageManager.js';
import { useSession } from '../../../context/SessionContext';

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false);//maneja la visibilidad de la animación
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let isSkipping = false;

    const { updateSessionState } = useSession();

    const options = [
        { value: "O", label: "Personal" },
        { value: "S", label: "Adoption/Shelter Service" },
    ];

    const [accountData, setAccountData] = useState({
        name: "",
        email: "",
        password: "",
        userTypeId: "",
        phoneNumber: "",
        confirmPassword: "",
        address: "",
        workingDays: "",
        workingHours: "",
    });

    const [tempImages, setTempImagenes] = useState({ tempProfile: "", tempCover: "" });

    //cambia el placeholdel del name según el tipo de usuario
    const [namePlaceholder, setNamePlaceholder] = useState("Full name");

    const navigate = useNavigate();

    const handleInputChange = ({ name, value }) => {
        if (name !== "tempProfile" && name !== "tempCover") {
            setAccountData((prevData) => {
                const newData = {
                    ...prevData,
                    [name]: value
                };

                if (newData.password === newData.confirmPassword) {
                    setErrorMessage("");
                } else {
                    setErrorMessage("Passwords do not match");
                }

                // Cambia el placeholder si el tipo de usuario es "2" o "3"
                if (name === "userTypeId") {
                    value === "O" ? setNamePlaceholder("Full name") : setNamePlaceholder("Organization name");
                }

                return newData;
            });
        } else {
            setTempImagenes((prevData) => {
                const newData = {
                    ...prevData,
                    [name]: value
                };

                return newData;
            });
        }
    };

    const handleFirtsSubmit = (e) => {
        e.preventDefault();

        if (accountData.password !== accountData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            setIsFormSubmitted(false);
            return;
        } else if (accountData.password.length < 8) {
            setErrorMessage("The password must be a minimum of 8 characters.");
            return;
        }

        setIsFormSubmitted(true);
    };

    const handleSkip = (e) => {
        e.preventDefault();
        const userResponse = confirm("Additional information will not be saved.\nAre you sure you want to continue?");

        if (userResponse) {
            isSkipping = true;
            setAccountData((prevData) => ({
                ...prevData,
                address: "",
                workingDays: "",
                workingHours: "",
            }));
            setTempImagenes({ tempProfile: "", tempCover: "" });

            handleFinalSubmit(e);
        }
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();

        let additionalData;
        let profileUploadResult = null;
        let coverUploadResult = null;
        let body;

        // Verifica si al menos un campo o la imagen han sido completados
        if (!isSkipping) {
            if (!tempImages.tempProfile && !tempImages.tempCover && !accountData.address && !accountData.workingDays && !accountData.workingHours) {
                const errorMessage = userTypeId === "0" ? "Please select an image" : "Please select an image or enter a data";

                setErrorMessage(errorMessage);

                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                return;
            }
        }

        setIsLoading(true);

        try {
            if (tempImages.tempProfile) {
                console.log("Uploading profile image...");
                profileUploadResult = await uploadImage(tempImages.tempProfile);
                console.log("Profile image uploaded:", profileUploadResult);
            }

            if (tempImages.tempCover) {
                console.log("Uploading cover image...");
                coverUploadResult = await uploadImage(tempImages.tempCover);
                console.log("Cover image uploaded:", coverUploadResult);
            }
        } catch (error) {
            setIsLoading(false);
            alert("There was an issue uploading the image. Please try again.");
            setErrorMessage("There was an issue uploading the image. Please try again.");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return;
        }

        if (accountData.userTypeId === "O") {
            additionalData = { completeName: accountData.name };
        } else {
            additionalData = {
                name: accountData.name,
                address: accountData.address,
                coverPicture: coverUploadResult ? coverUploadResult.imageUrl : "",
                imagePublicIdCover: coverUploadResult ? coverUploadResult.publicId : "",
                workingDays: accountData.workingDays,
                workingHours: accountData.workingHours,
            };
        }

        body = {
            email: accountData.email,
            password: accountData.password,
            userTypeId: accountData.userTypeId,
            profilePicture: profileUploadResult ? profileUploadResult.imageUrl : "",
            imagePublicId: profileUploadResult ? profileUploadResult.publicId : "",
            phoneNumber: accountData.phoneNumber,
            additionalData: additionalData
        }

        try {
            const apiUrl = "https://www.APIPetrack.somee.com/User/CreateAccount";
            const apiResponse = await getData(apiUrl, body, false, "POST");

            setIsLoading(false);

            if (apiResponse.result) {
                const userResponse = confirm("The user has been created successfully.\nDo you want to log in with your new user?");
                if (userResponse) {
                    try {
                        const loginResult = await loginUser(accountData.email, accountData.password);
                        if (!loginResult.result) {
                            alert(loginResult.message);
                        }
                        updateSessionState();
                    } catch (error) {
                        console.log(error);
                        alert("An error occurred while trying to log in.");
                    } finally {

                        navigate("/");
                    }
                } else {
                    navigate("/");
                }
            } else {
                alert(apiResponse.message);
                setIsFormSubmitted(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during registration:", error);
            alert("Error during registration:");
        }
        finally {
            isSkipping = false;
        }
    }

    return (
        <AccountForm className="relative flex justify-center items-center min-h-screen">
            {isLoading && <Loader />} {/* Muestra el loader mientras se carga */}

            <CSSTransition in={!isFormSubmitted} timeout={500} classNames="form-slide" unmountOnExit>
                <Form title="Create account" subTitle="What type of account do you want to register?" onSubmit={handleFirtsSubmit}>
                    <SelectInput
                        size="medium"
                        placeholder="Tipo de Usuario"
                        options={options}
                        name="userTypeId"
                        value={accountData.userTypeId}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        size="medium"
                        placeholder={namePlaceholder} // Placeholder dinámico
                        name="name"
                        value={accountData.name}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        size="medium"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={accountData.email}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        size="medium"
                        placeholder="Phone number"
                        name="phoneNumber"
                        type="tel"
                        isRequired={false}
                        value={accountData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        size="medium"
                        placeholder="Password"
                        name="password"
                        value={accountData.password}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        size="medium"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={accountData.confirmPassword}
                        onChange={handleInputChange}
                    />

                    {errorMessage && <p className="m-1 text-red-500">{errorMessage}</p>}

                    <Button type="submit" size="small" variant="solid-green">
                        Sign Up
                    </Button>
                    <h3 className="text-center pt-5">
                        Don't have an account?{" "}
                        <a className="font-bold text-petrack-green" href="/Login">
                            Sign In
                        </a>
                    </h3>
                </Form>
            </CSSTransition>
            <CSSTransition in={isFormSubmitted} timeout={500} classNames="images-slide" unmountOnExit>
                <Form title="Perfil" subTitle={`${accountData.userTypeId === "O" ? 'Add a profile picture' : 'Add extra information'}`} onSubmit={handleFinalSubmit}>
                    <div className="relative w-full flex flex-col items-center">

                        {accountData.userTypeId === "S" && (
                            <div className="absolute w-full -top-2 flex justify-center z-0">
                                <LoadImage name="tempCover" image={tempImages.tempCover} imageType="rectangular" onChange={handleInputChange} />
                            </div>
                        )}

                        <div className={`relative mb-5 z-10 mt-${accountData.userTypeId === "O" ? '' : '16'}`}>
                            <LoadImage name="tempProfile" image={tempImages.tempProfile} imageType="rounded" onChange={handleInputChange} />
                        </div>

                        {/* información exclusiva del refugio */}
                        {accountData.userTypeId === "S" && (
                            <>
                                <TextInput
                                    size="medium"
                                    placeholder="Address"
                                    name="address"
                                    value={accountData.address}
                                    onChange={handleInputChange}
                                    isRequired={false}
                                />
                                <TextInput
                                    size="medium"
                                    placeholder="Working Days"
                                    name="workingDays"
                                    value={accountData.workingDays}
                                    onChange={handleInputChange}
                                    isRequired={false}
                                />
                                <TextInput
                                    size="medium"
                                    placeholder="Working Hours"
                                    name="workingHours"
                                    value={accountData.workingHours}
                                    onChange={handleInputChange}
                                    isRequired={false}
                                />
                            </>
                        )}

                        {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}

                        <div className="flex flex-col w-full max-w-xs justify-end pt-4 gap-2">
                            <Button size="small" variant="solid-green" type="submit">Save</Button>
                            <Button onClick={handleSkip} size="small">Skip</Button>
                        </div>
                    </div>
                </Form>
            </CSSTransition>
        </AccountForm>
    );
}