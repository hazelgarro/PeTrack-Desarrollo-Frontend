import "./styles.css";
import Image from "../../atoms/Image";

export default function Card({ link, children, imgSrc, imgAlt }) {
    return (
        <a href={link} className="block">
            <div className="relative bg-white rounded-xl overflow-hidden transform hover:scale-105 hover:shadow-xl transition-transform duration-300">
                <div className="w-full h-0 pb-[56.25%] relative">
                    <Image className="w-full h-full object-cover" imgSrc={imgSrc} imgAlt={imgAlt}></Image>
                </div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-end justify-center p-5">
                    <h2 className="text-white text-2xl font-bold">{children}</h2>
                </div>
            </div>
        </a>
    );
}