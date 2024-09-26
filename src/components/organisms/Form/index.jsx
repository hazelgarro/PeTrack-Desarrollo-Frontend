import PropTypes from "prop-types";
import Logo from "../../atoms/Logo";
import WhiteContainer from "../../atoms/WhiteContainer";

export default function Form({ title, onSubmit, children }) {
    return (
        <WhiteContainer>
            <div className="mb-10">
                <Logo size="extra-large" />
                <h1 className="text-4xl text-center mt-6">{title}</h1>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col justify-between w-96 mx-auto">
                {children}
            </form>
        </WhiteContainer>
    );
}

Form.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    onSubmit: PropTypes.func.isRequired,
};