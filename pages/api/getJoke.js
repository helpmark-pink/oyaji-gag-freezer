export default async function handler(req, res) {
  try {
    // 英語のジョークを取得
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Dad Joke Freezer (https://dadjokefreezer.example.com)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    const originalJoke = data.joke;
    
    // 翻訳APIを使用して日本語に翻訳
    try {
      const langPair = `en|ja`;
      const params = new URLSearchParams({
        q: originalJoke,
        langpair: langPair
      });
      
      const translationResponse = await fetch(`https://api.mymemory.translated.net/get?${params.toString()}`);
      const translationData = await translationResponse.json();
      
      // 日本語に翻訳されたジョークを取得
      const translatedJoke = translationData?.responseData?.translatedText || originalJoke;
      
      // 特殊な文字をエスケープ
      const cleanedJoke = translatedJoke.replace(/&#39;/g, "'").replace(/&quot;/g, '"');
      
      // 親父ギャグっぽい定型の接頭辞をランダムに追加
      const prefixes = [
        "",
        "今日の親父ギャグ: ",
        "本日のオヤジギャグ: ",
        "朝イチで聞いた: ",
        "昨日の会議で言われた: ",
        "職場の上司が言ってました: "
      ];
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      
      res.status(200).json({ 
        ...data,
        joke: randomPrefix + cleanedJoke
      });
    } catch (translationError) {
      console.error('翻訳エラー:', translationError);
      
      // 翻訳に失敗した場合は、固定の日本語ギャグをランダムに返す
      const japaneseJokes = [
        "どうして猫は魚が好きなの？ニャンとも言えない理由があるんです！",
        "お寿司を見た時、何て言うか知ってる？「巻いてるね〜」",
        "パンはパンでも食べられないパンって何？フライパン！",
        "ゴリラが履いている下着って何？ゴリラのパンツ！",
        "カレーの好きな場所はどこ？カレースペース！",
        "トイレットペーパーがなくなったらどうなる？紙一重の状態！",
        "タピオカが溺れた！どうする？タピオ株を買う！",
        "ナスが好きな有名人は？ナス大好き（ナスダック）！",
        "牛が空を飛ぶと何になる？ビーフライ！",
        "お風呂に入りながらおかしを食べると何になる？バスチー！"
      ];
      
      const randomJoke = japaneseJokes[Math.floor(Math.random() * japaneseJokes.length)];
      
      res.status(200).json({ 
        ...data,
        joke: randomJoke
      });
    }
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.status(500).json({ error: 'ギャグの取得に失敗しました', message: error.message });
  }
} 