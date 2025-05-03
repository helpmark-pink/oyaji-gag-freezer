import React from 'react';

const JokeRating = ({ onRate }) => {
  return (
    <div className="mt-4 flex flex-col items-center">
      <h3 className="text-lg mb-2 font-medium text-blue-800">このギャグの寒さは？</h3>
      <div className="flex space-x-2 md:space-x-4">
        <button
          onClick={() => onRate('lame')}
          className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors flex items-center"
        >
          <span className="text-xl mr-2">😏</span>
          ちょっと寒い
        </button>
        <button
          onClick={() => onRate('mild')}
          className="px-4 py-2 bg-blue-200 text-blue-700 rounded-full hover:bg-blue-300 transition-colors flex items-center"
        >
          <span className="text-xl mr-2">🥶</span>
          かなり寒い
        </button>
        <button
          onClick={() => onRate('freezing')}
          className="px-4 py-2 bg-blue-300 text-blue-800 rounded-full hover:bg-blue-400 transition-colors flex items-center"
        >
          <span className="text-xl mr-2">❄️</span>
          凍えるほど寒い
        </button>
      </div>
    </div>
  );
};

export default JokeRating; 