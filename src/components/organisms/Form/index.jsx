import PropTypes from "prop-types";
import Logo from "../../atoms/Logo";
import WhiteContainer from "../../atoms/WhiteContainer";

export default function Form({ title, subTitle, onSubmit, children, type = "default" }) {
    const Container = type === "default" ? WhiteContainer : "div";

    return (
        <Container className="m-4">
            <div className="flex flex-col items-center mb-5">
                <a href="./" title="Página de inicio"><Logo size="large" type="isotipo" /></a>
                
                <h1 className="text-4xl text-center mt-4">{title}</h1>
                <h2 className="text-lg text-center mt-2">{subTitle}</h2>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col justify-between w-full max-w-md mx-auto px-1">
                {children}
            </form>
        </Container>
    );
}

Form.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    children: PropTypes.any.isRequired,
    onSubmit: PropTypes.func,
    type: PropTypes.oneOf(["default", "edit"]),
};
