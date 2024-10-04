import NavBar from "../../organisms/Nav"
import ProfileImage from "../../atoms/ProfileImage/index.jsx"
import IconLocation from "../../atoms/Icons/Location"
import CardsContainer from "../../organisms/cardsContainer"
import Card from "../../molecules/Card/index.jsx"
import petPicture from '../../../assets/img/pet_picture.webp';
import UserImage from "../../../assets/img/veterinary.webp";
import IconEmail from "../../atoms/Icons/Email"
import IconUser from "../../atoms/Icons/User"
import IconPhone from "../../atoms/Icons/Phone"

import Footer from "../../organisms/FooterContainer"

export default function PagePetOwner() {
    return (
        <>
            <NavBar isAuthenticated={true} variant={"menuHamburgerIcon"}></NavBar>
            <body className="relative mb-12 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-24 mx-4 my-5">

                <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="self-center">
                        <ProfileImage imageSrc={UserImage} size="extra-large"></ProfileImage>
                    </div>
                    <div className="flex flex-col justify-center text-center md:text-left">
                        <h1 className="text-petrack-green text-4xl md:text-6xl font-bold mb-2 font-outfit">Name</h1>
                        <div className="flex justify-center md:justify-start gap-2">
                            <IconLocation size="large" color="tertiary" variant="fill"></IconLocation>
                            <h2 className="text-petrack-black text-2xl md:text-3xl font-bold">Esparza, Costa Rica</h2>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-4">
                    <div>
                        <p className="text-center mb-2 sm:text-left">User type</p>
                        <div className="flex justify-center sm:justify-start gap-2 items-center">
                            <IconUser size="large"></IconUser>
                            <h4 className="text-xl">Pet Owner</h4>
                        </div>
                    </div>
                    <div>
                        <p className="text-center mb-2 sm:text-left">Email</p>
                        <div className="flex justify-center sm:justify-start gap-2 items-center">
                            <IconEmail size="large"></IconEmail>
                            <h4 className="text-xl">Email@gmail.com</h4>
                        </div>
                    </div>
                    <div>
                        <p className="text-center mb-2 sm:text-left ">Phone number</p>
                        <div className="flex justify-center sm:justify-start gap-2 items-center">
                            <IconPhone size="large"></IconPhone>
                            <h4 className="text-xl">8425-1992</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="flex font-outfit text-petrack-green text-2xl md:text-3xl font-bold mt-12 md:mt-24 mb-6 text-center">My pets</p>
                </div>
                <div>
                    <CardsContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card imgSrc={petPicture} ></Card>
                        <Card imgSrc={petPicture}></Card>
                        <Card imgSrc={petPicture}></Card>
                    </CardsContainer>
                </div>
            </body>
        </>
    )
}
