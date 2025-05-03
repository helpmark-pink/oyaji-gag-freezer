import { useState, useEffect } from 'react';
import Head from 'next/head';
import Snowfall from 'react-snowfall';
import JokeDisplay from '../components/JokeDisplay';
import JokeRating from '../components/JokeRating';
import ShareButton from '../components/ShareButton';

export default function Home() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [coldLevel, setColdLevel] = useState(0);
  const [snowflakeCount, setSnowflakeCount] = useState(50);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getJoke');
      const data = await response.json();
      setJoke(data.joke);
      setColdLevel(0); // Reset cold level on new joke
    } catch (error) {
      console.error('Error fetching joke:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRate = (rating) => {
    switch (rating) {
      case 'freezing':
        setColdLevel(3);
        setSnowflakeCount(200);
        break;
      case 'mild':
        setColdLevel(2);
        setSnowflakeCount(100);
        break;
      case 'lame':
        setColdLevel(1);
        setSnowflakeCount(50);
        break;
      default:
        setColdLevel(0);
        setSnowflakeCount(0);
    }
  };

  // Get background class based on cold level
  const getBgClass = () => {
    switch (coldLevel) {
      case 1: return 'cold-bg-1';
      case 2: return 'cold-bg-2';
      case 3: return 'cold-bg-3';
      default: return '';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center py-10 px-4 ${getBgClass()}`}>
      <Head>
        <title>オヤジギャグ冷凍庫 - クソ寒いオヤジギャグ集</title>
        <meta name="description" content="クソ寒いオヤジギャグで画面を凍らせよう" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* OGPメタタグ */}
        <meta property="og:title" content="オヤジギャグ冷凍庫 - クソ寒いオヤジギャグ集" />
        <meta property="og:description" content="クソ寒いオヤジギャグで画面を凍らせよう！寒さでTwitterが凍りつくかも？" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://oyaji-gag-freezer.vercel.app/" />
        <meta property="og:image" content="https://source.unsplash.com/400x400/?winter,snow,cold" />
        <meta property="og:site_name" content="オヤジギャグ冷凍庫" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="オヤジギャグ冷凍庫 - クソ寒いオヤジギャグ集" />
        <meta name="twitter:description" content="クソ寒いオヤジギャグで画面を凍らせよう！寒さでTwitterが凍りつくかも？" />
        <meta name="twitter:image" content="https://source.unsplash.com/400x400/?winter,snow,cold" />
      </Head>

      {coldLevel > 0 && (
        <Snowfall
          snowflakeCount={snowflakeCount}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 10,
          }}
        />
      )}

      <main className="flex flex-col items-center justify-center w-full flex-1 text-center z-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-blue-900">
          オヤジギャグ冷凍庫
          <span className="block text-lg md:text-xl text-blue-700 mt-2">クソ寒いオヤジギャグ製造機</span>
        </h1>

        <JokeDisplay joke={joke} loading={loading} />

        {joke && !loading && (
          <>
            <JokeRating onRate={handleRate} />
            <ShareButton joke={joke} />
          </>
        )}

        <button
          onClick={fetchJoke}
          disabled={loading}
          className="mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors text-lg shadow-lg disabled:opacity-50"
        >
          {loading ? '取得中...' : 'ギャグをください'}
        </button>
      </main>

      <footer className="w-full max-w-xl mt-8 text-center text-sm text-gray-600 z-20">
        <p>オヤジギャグで画面をクソ寒くしよう</p>
      </footer>
    </div>
  );
} 