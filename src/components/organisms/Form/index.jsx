import PropTypes from "prop-types";
import Logo from "../../atoms/Logo";
import WhiteContainer from "../../atoms/WhiteContainer";

export default function Form({ title, subTitle, onSubmit, children }) {
    return (
        <WhiteContainer>
    <div className="mb-10">
        <Logo size="extra-large" />
        <h1 className="text-4xl text-center mt-4">{title}</h1>
        <h2 className="text-lg font-mono text-center mt-2">{subTitle}</h2>
    </div>
    <form onSubmit={onSubmit} className="flex flex-col justify-between w-full max-w-md mx-auto px-1">
        {children}
    </form>
</WhiteContainer>
    );
}

Form.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    onSubmit: PropTypes.func,
};