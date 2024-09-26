import { useState } from "react";

import TextInput from "../../atoms/TextInput";
import PasswordInput from "../../molecules/PasswordInput";
import Button from "../../atoms/Button";
import Form from "../../organisms/Form";
import AccountForm from "../../templates/AccountForm";
import loginUser from "../../../utils/authentication";

export default function Login() {

    const [accountData, setAdditionalData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = ({ name, value }) => {
        setAdditionalData({
            ...accountData,
            [name]: value  // Actualiza solo el campo que cambió
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(accountData)); // Aquí puedes manejar el envío del formulario
    };

    return (
        // <Form title="Welcome back! ">
        //     <TextInput size="medium" placeholder="Email" />
        //     <PasswordInput size="medium" placeholder="Password" />
        //     <h2 className="text-right text-sm text-gray-500 mb-2">Forgot your password?</h2>
        //     <ButtonLogin size="small" variant="solid-green">Log In</ButtonLogin>
        //     <h3 className="text-center pt-5">Don't have an account? <a className="font-bold text-petrack-green" href="/SignUp">Sign Up</a></h3>
        // </Form>
        <AccountForm>
            <Form title="Welcome back!" onSubmit={handleSubmit}>
                <TextInput
                    size="medium"
                    placeholder="Email"
                    name="email"
                    value={accountData.email}
                    onChange={handleInputChange}
                />
                <PasswordInput
                    size="medium"
                    placeholder="Password"
                    name="password"
                    value={accountData.password}
                    onChange={handleInputChange} />

                <h2 className="text-right text-sm text-gray-500 mb-2">Forgot your password?</h2>
                <Button type="submit" size="small" variant="solid-green">Log In</Button>
                <h3 className="text-center pt-5">Don't have an account? <a className="font-bold text-petrack-green" href="/SignUp">Sign Up</a></h3>
            </Form>
        </AccountForm>
    );
}