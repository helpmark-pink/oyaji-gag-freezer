import { useState } from 'react';
import Head from 'next/head';
import Snowfall from 'react-snowfall';
import JokeDisplay from '../components/JokeDisplay';
import JokeRating from '../components/JokeRating';
import ShareButton from '../components/ShareButton';

export default function Home() {
  const [joke, setJoke] = useState('');
  const [originalJoke, setOriginalJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [coldLevel, setColdLevel] = useState(0);
  const [snowflakeCount, setSnowflakeCount] = useState(50);
  const [error, setError] = useState('');

  const fetchJoke = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/getJoke');
      
      if (!response.ok) {
        throw new Error(`APIエラー: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || !data.joke) {
        throw new Error('ジョークデータが見つかりません');
      }
      
      setJoke(data.joke);
      setOriginalJoke(data.original_joke || '');
      setColdLevel(0); // 新しいジョークが表示されたら寒さレベルをリセット
    } catch (error) {
      console.error('ジョークの取得中にエラーが発生しました:', error);
      setError(`ジョークの取得に失敗しました: ${error.message}`);
      // フォールバックとして日本語のジョークを表示
      const fallbackJokes = [
        "息子に「パパ、WiFiって何の略？」と聞かれたので「それを説明するのはワイ、難しい」と答えました。",
        "妻が「あなた、私の肩を叩いて」と言うので叩いたら「もっと下」と言うので叩いたら「もっと下」と言うので、私は言いました「それはもう腰だよ」",
        "なぜピアニストはドアを開けられないの？鍵がなくしちゃったから！",
        "野球選手が銀行に行く理由は？セーフティバントが必要だから！"
      ];
      setJoke(fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)]);
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

  // 寒さレベルに基づいて背景クラスを取得
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
        <title>オヤジギャグ冷凍庫 - 寒すぎるオヤジギャグ集</title>
        <meta name="description" content="クソ寒いオヤジギャグで画面を凍らせよう" />
        <link rel="icon" href="/favicon.ico" />
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-lg w-full">
            <p>{error}</p>
            <p className="text-sm mt-2">心配しないでください、日本語のジョークをお届けします！</p>
          </div>
        )}

        <JokeDisplay joke={joke} originalJoke={originalJoke} loading={loading} />

        {joke && !loading && (
          <>
            <JokeRating onRate={handleRate} />
            <ShareButton joke={joke} originalJoke={originalJoke} />
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
        <p>icanhazdadjoke.com API を使用しています</p>
      </footer>
    </div>
  );
} 