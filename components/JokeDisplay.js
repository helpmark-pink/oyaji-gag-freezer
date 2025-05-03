import React from 'react';

const JokeDisplay = ({ joke, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-2xl">
        <div className="animate-pulse h-6 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
        <div className="animate-pulse h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    );
  }

  if (!joke) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-2xl">
        <p className="text-gray-500 italic">「ギャグをください」ボタンを押してオヤジギャグを表示</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-2xl">
      <p className="text-xl md:text-2xl font-medium leading-relaxed">{joke}</p>
      <div className="mt-4 text-right">
        <span className="text-blue-500 text-sm">クソ寒いギャグ集</span>
      </div>
    </div>
  );
};

export default JokeDisplay; 