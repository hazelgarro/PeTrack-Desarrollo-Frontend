import { useState } from 'react';

export default function(){
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleContent = () => setIsExpanded(!isExpanded);

  return (
    <div className="border border-blue-400 rounded-lg p-4 my-2">
      <div className="text-sm text-blue-500">Datetime</div>
      <h3 className="font-bold text-xl">Title</h3>
      <p className={`text-gray-600 ${!isExpanded ? 'line-clamp-2' : ''}`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et justo sit amet orci volutpat luctus. Quis quis id in cum.
      </p>
      <button
        className="text-blue-500 hover:underline"
        onClick={toggleContent}
      >
        {isExpanded ? 'Show less' : 'Read more'}
      </button>
      <div className="flex justify-end">
        <span className="text-blue-500 text-xl">{'>'}</span>
      </div>
    </div>
  );
};
