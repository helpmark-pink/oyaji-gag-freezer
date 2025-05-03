import React from 'react';

const ShareButton = ({ joke }) => {
  // 共有テキストの最適化
  const getShareText = () => {
    // 140文字制限に収まるようにテキストを調整
    const maxLength = 100; // ハッシュタグやURLの長さを考慮
    let shareText = joke;
    
    if (shareText.length > maxLength) {
      shareText = shareText.substring(0, maxLength) + '...';
    }
    
    return `${shareText} #オヤジギャグ冷凍庫 #クソ寒い`;
  };

  const handleTwitterShare = () => {
    // Twitterの共有URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`;
    // 新しいウィンドウでTwitter共有画面を直接開く
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleTwitterShare}
        className="mt-4 flex items-center px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
        Twitter(X)で共有
      </button>
    </div>
  );
};

export default ShareButton; 