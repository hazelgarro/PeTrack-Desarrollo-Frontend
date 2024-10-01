export default function WhiteContainer({ children }) {
    return (
        <div className="flex flex-col p-6 sm:p-8 lg:p-12 bg-white bg-opacity-90 rounded-3xl m-4 sm:m-10 lg:m-20">
            {children}
        </div>
    );
}
