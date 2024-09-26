
import Logo from "../../../atoms/Logo";
import Button from "../../../atoms/Button";
import ProfileImage from "../../../atoms/ProfileImage";
import WhiteContainer from "../../../atoms/WhiteContainer";


export default function CreateAccount() {

    return (
        <WhiteContainer>
            <div className="flex flex-col justify-end mb-10">
                <Logo size="extra-large" />
                <h1 className="text-4xl text-center mt-8">Perfil</h1>
                <p className="text-center mt-4">Seleccione una imagen para de perfil</p>

            </div>
            <div className="flex flex-col w-96 h-96 items-center pt-6">
                <ProfileImage size="extra-large"></ProfileImage>
                <div className="flex  mb-14 w-48 justify-end ">
                    <Button size="extra-small" variant="solid-green" variant2="content-fit">+</Button>
                </div>
                <div className="flex flex-col w-96 h-96 justify-end pt-8 gap-2">
                    <Button size="small" variant="solid-green">Continuar</Button>
                    <Button size="small" >Omitir</Button>
                </div>
            </div>
        </WhiteContainer>
    );
}
