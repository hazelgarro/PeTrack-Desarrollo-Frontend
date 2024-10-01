import PropTypes from 'prop-types';
import "../styles.css";

export default function Pet({ petType="dog", size = 'medium', color = 'primary', ...props }) {
    return (
        petType === 'dog' ? (
            <svg className={`svg-icon svg-icon--${size} svg-icon--${color}`} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                <path fill="currentColor" d="m239.71 125l-16.42-88a16 16 0 0 0-19.61-12.58l-.31.09L150.85 40h-45.7L52.63 24.56l-.31-.09a16 16 0 0 0-19.61 12.58L16.29 125a15.77 15.77 0 0 0 9.12 17.52a16.3 16.3 0 0 0 6.71 1.48a15.5 15.5 0 0 0 7.88-2.16V184a40 40 0 0 0 40 40h96a40 40 0 0 0 40-40v-42.15a15.5 15.5 0 0 0 7.87 2.16a16.3 16.3 0 0 0 6.72-1.47a15.77 15.77 0 0 0 9.12-17.54M32 128l16.43-88L90.5 52.37Zm144 80h-40v-12.69l13.66-13.65a8 8 0 0 0-11.32-11.32L128 180.69l-10.34-10.35a8 8 0 0 0-11.32 11.32L120 195.31V208H80a24 24 0 0 1-24-24v-60.89L107.92 56h40.15L200 123.11V184a24 24 0 0 1-24 24m48-80l-58.5-75.63L207.57 40zm-120 12a12 12 0 1 1-12-12a12 12 0 0 1 12 12m72 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
            </svg>
        ) : (
            <svg className={`svg-icon svg-icon--${size} svg-icon--${color}`} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path d="M20 3v10a8 8 0 1 1-16 0V3l3.432 3.432A7.96 7.96 0 0 1 12 5c1.769 0 3.403.574 4.728 1.546z" /><path d="M2 16h5l-4 4m19-4h-5l4 4m-10-4a1 1 0 1 0 2 0a1 1 0 1 0-2 0m-2-5v.01m6-.01v.01" /></g>
        </svg>
        )
    );
}

Pet.propTypes = {
    size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
    color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
    petType: PropTypes.oneOf(["dog", "cat"]),
};