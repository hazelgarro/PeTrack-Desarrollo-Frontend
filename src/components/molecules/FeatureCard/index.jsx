export default function FeatureCard({ children }) {
    return (
      <div className="flex flex-col justify-center items-center gap-8">
          { children }
      </div>
    );
  }