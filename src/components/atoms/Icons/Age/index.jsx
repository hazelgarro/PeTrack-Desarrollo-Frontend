import PropTypes from 'prop-types';
import "../styles.css";

export default function Delete({ size = 'medium', color = 'primary', thickness = '2', ...props }) {
    return (
        /* <svg className={`svg-icon svg-icon--${size} svg-icon--${color}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
             <path d="M13.5 4.5C13.5 5.32843 12.8284 6 12 6C11.1716 6 10.5 5.32843 10.5 4.5C10.5 3.67157 12 2 12 2C12 2 13.5 3.67157 13.5 4.5Z" stroke="currentColor" strokeWidth={thickness} strokeLinejoin="round" />
             <path d="M12 6V9" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
             <path d="M17.6667 14C19.2315 14 20.5 12.8807 20.5 11.5C20.5 10.1193 19.2315 9 17.6667 9H6.33333C4.76853 9 3.5 10.1193 3.5 11.5C3.5 12.8807 4.76853 14 6.33333 14C7.70408 14 8.90415 13.1411 9.16667 12C9.42919 13.1411 10.6293 14 12 14C13.3707 14 14.5708 13.1411 14.8333 12C15.0959 13.1411 16.2959 14 17.6667 14Z" stroke="currentColor" strokeWidth={thickness} strokeLinejoin="round" />
             <path d="M5 14L5.52089 16.5796C6.04532 19.1768 6.30754 20.4754 7.19608 21.2377C8.08462 22 9.33608 22 11.839 22H12.161C14.6639 22 15.9154 22 16.8039 21.2377C17.6925 20.4754 17.9547 19.1768 18.4791 16.5796L19 14" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
         </svg>*/

        /*<svg className={`svg-icon svg-icon--${size} svg-icon--${color}`} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
            <g fill="currentColor"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                <path fill="currentColor" d="M18 9a3 3 0 0 1 2.995 2.824L21 12v3c0 .64-.379 1.139-.882 1.367l-.118.047V20a2 2 0 0 1-1.85 1.995L18 22H6a2 2 0 0 1-1.995-1.85L4 20v-3.585a1.49 1.49 0 0 1-.993-1.27L3 15v-3a3 3 0 0 1 2.824-2.995L6 9zm-.067 6.7a1 1 0 0 0-1.09-.072l-.11.072l-.266.2a3 3 0 0 1-3.429.12l-.171-.12l-.267-.2a1 1 0 0 0-1.09-.072l-.11.072l-.267.2a3 3 0 0 1-3.428.12l-.172-.12l-.266-.2a1 1 0 0 0-1.09-.072l-.11.072l-.067.05V20h12v-4.25zM18 11H6a1 1 0 0 0-1 1v2.005a3 3 0 0 1 3.467.095l.266.2a1 1 0 0 0 1.2 0l.267-.2a3 3 0 0 1 3.6 0l.267.2a1 1 0 0 0 1.2 0l.266-.2A3 3 0 0 1 19 14.005V12a1 1 0 0 0-1-1m-5.4-8.8a9 9 0 0 1 1.147 1.073C14.271 3.862 15 4.855 15 6a3 3 0 1 1-6 0c0-1.145.73-2.138 1.253-2.727A9 9 0 0 1 11.4 2.2a1 1 0 0 1 1.2 0M12 4.334a6 6 0 0 0-.253.268C11.271 5.138 11 5.645 11 6a1 1 0 1 0 2 0c0-.355-.27-.862-.747-1.398A6 6 0 0 0 12 4.334" /></g>
        </svg>*/
        <svg className={`svg-icon svg-icon--${size} svg-icon--${color}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
            <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth={thickness} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3.5 8H20.5" stroke="currentColor" strokeWidth={thickness} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth={thickness} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 8H21" stroke="currentColor" strokeWidth={thickness} stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

Delete.propTypes = {
    size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
    color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
    thickness: PropTypes.string, // Ancho del trazo del ícono
};