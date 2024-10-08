export default function ThreeColContainer({ children }) {
    return (
      <div className="w-full grid grid-cols-3 place-items-center my-20">
          { children }
      </div>
    );
  }