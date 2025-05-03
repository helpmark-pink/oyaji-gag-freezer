export default async function handler(req, res) {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Dad Joke Freezer (https://dadjokefreezer.example.com)'
      }
    });
    
    if (!response.ok) {
      console.error(`API エラー: ${response.status} ${response.statusText}`);
      throw new Error(`APIがステータス: ${response.status} で応答しました`);
    }
    
    // レスポンスの内容をログ出力
    const responseText = await response.text();
    console.log('API レスポンス:', responseText);
    
    let data;
    try {
      // テキストをJSONとしてパース
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSONパースエラー:', parseError);
      // API接続に問題がある場合は独自のジョークを使用
      data = { joke: "API接続に問題があります。独自のジョークを表示します。" };
    }
    
    // 英語ジョークを日本語に変換
    const translatedJoke = await translateJoke(data.joke || "ジョークを取得できませんでした");
    
    // 翻訳だけを返す
    res.status(200).json({
      ...data,
      joke: translatedJoke
    });
  } catch (error) {
    console.error('ジョークの取得中にエラーが発生しました:', error);
    // フォールバックとして日本語のジョークを提供
    const fallbackJokes = getRandomJapaneseJoke();
    res.status(200).json({ joke: fallbackJokes });
  }
}

// 英語ジョークを日本語に "翻訳" する簡易的な関数
const translateJoke = async (joke) => {
  // 英語ジョークの日本語訳のサンプル集
  const translatedJokes = {
    "I'm afraid for the calendar. Its days are numbered.": "カレンダーが心配です。日が限られていますから。",
    "Why did the scarecrow win an award? Because he was outstanding in his field!": "かかしがなぜ賞をもらったか？彼は畑で目立っていたからです！",
    "I made a pencil with two erasers. It was pointless.": "消しゴムを両端につけた鉛筆を作りました。全く意味がありませんでした。",
    "How do you make a tissue dance? Put a little boogie in it!": "ティッシュを踊らせるには？少しブギーを入れるんです！",
    "Why don't eggs tell jokes? They'd crack each other up.": "卵はなぜジョークを言わないの？お互いにヒビが入っちゃうから。",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.": "妻に眉毛を高く描きすぎだと言ったら、彼女は驚いた顔をしました。",
    "What do you call a fake noodle? An impasta!": "偽のヌードルって何て呼ぶ？ニセパスタ！",
    "Why did the math book look so sad? Because it had so many problems.": "なぜ数学の教科書はそんなに悲しそうなの？問題が多すぎるから。",
    "What do you call a belt made of watches? A waist of time!": "時計でできたベルトを何と呼ぶ？時間の無駄遣い！",
    "Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one!": "お父さんがゴルフに行くとき予備の靴下を持っていくのはなぜ？ホールインワンをする時のために！"
  };
  
  // ジョークが翻訳リストにあれば翻訳を返す
  if (translatedJokes[joke]) {
    return translatedJokes[joke];
  }
  
  return getRandomJapaneseJoke();
};

// ランダムな日本語のオヤジギャグを返す関数
const getRandomJapaneseJoke = () => {
  const defaultJokes = [
    "息子に「パパ、WiFiって何の略？」と聞かれたので「それを説明するのはワイ、難しい」と答えました。",
    "妻が「あなた、私の肩を叩いて」と言うので叩いたら「もっと下」と言うので叩いたら「もっと下」と言うので、私は言いました「それはもう腰だよ」",
    "なぜピアニストはドアを開けられないの？鍵がなくしちゃったから！",
    "野球選手が銀行に行く理由は？セーフティバントが必要だから！",
    "医者に「毎日リンゴを1個食べれば医者いらず」と言われたので、リンゴを投げつけ始めました。",
    "パンはパンでも食べられないパンは？フライパン！",
    "猫が家に入ってきた理由は？ドアが開いてたから！",
    "なぜ自転車は一人で立てないの？だって疲れてるから（タイヤだけに）！",
    "目が見えない人が魚釣りに行くとき持っていくものは？盲目（もうめ）",
    "「すいません、この電車は大阪に行きますか？」「いいえ、電車は線路の上しか行きません」",
    "カレーライスが好きな歌手は？Spice Girls（スパイス・ガールズ）",
    "プールの中で笑うとどうなる？水中毒（吹き中毒）になる"
  ];
  
  return defaultJokes[Math.floor(Math.random() * defaultJokes.length)];
}; 