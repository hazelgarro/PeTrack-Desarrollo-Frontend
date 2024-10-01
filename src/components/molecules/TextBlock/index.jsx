export default function ({ title, children }) {
    return (
        <div>
            <h2 className="text-2xl text-petrack-black font-semibold">{title}</h2>
            {children}
        </div>
    );
}