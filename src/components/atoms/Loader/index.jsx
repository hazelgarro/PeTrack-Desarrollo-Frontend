import "./styles.css"; // Asegúrate de importar el CSS del loader

const Loader = () => {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="loader"></div>
        </div>
    );
};

export default Loader;

