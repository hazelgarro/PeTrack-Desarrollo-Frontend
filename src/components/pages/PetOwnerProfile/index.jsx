import ProfileImage from "../../atoms/ProfileImage/index.jsx";
import IconLocation from "../../atoms/Icons/Location"
import IconExit from "../../atoms/Icons/Exit"

export default function PagePetOwner() {
    return (
        <>
            <main className="relative 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-24 mx-4 my-5">
                <div className="flex gap-8 mb-10">
                    <div>
                        <ProfileImage size="extra-large"></ProfileImage>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="justify-center mb-2 text-petrack-green text-6xl font-bold">Name</h1>
                        <div className="flex gap-2">
                            <IconLocation size="large" color="tertiary" variant="fill"></IconLocation>
                            <h2 className="justify-center text-petrack-black text-3xl font-bold">Esparza, Costa Rica </h2>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-12 mb-4">
                    <div>
                        <p>User type</p>
                        <div className="flex gap-2 align-middle ">
                            <IconExit></IconExit>
                            <h4 className="text-xl">Pet Owner</h4>
                        </div>
                    </div>
                    <div>
                        <p>Email</p>
                        <div className="flex gap-2 align-middle ">
                            <IconExit></IconExit>
                            <h4 className="text-xl">Email@gmail.com</h4>
                        </div>
                    </div>
                    <div>
                        <p>Phone number</p>
                        <div className="flex gap-2 align-middle ">
                            <IconExit></IconExit>
                            <h4 className="text-xl">8425-1992</h4>
                        </div>
                    </div>
                    <div>
                        <p>Idioma</p>
                        <div className="flex gap-2 align-middle ">
                            <IconExit></IconExit>
                            <h4 className="text-xl">Español</h4>
                        </div>
                    </div>
                    <div className="flex gap-2 align-middle">
                        <IconExit></IconExit>
                        <h4 className="text-xl">Log out</h4>
                    </div>
                    <div className="flex gap-2 align-middle">
                        <IconExit></IconExit>
                        <h4 className="text-xl">Delete account</h4>
                    </div>
                </div>
            </main>
        </>
    )
}
