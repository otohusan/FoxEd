type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

type QuizFormat = {
  label: string;
  body: Quiz[];
};

export const quizData2: QuizFormat = {
  label: "ユメタン 360~480",
  body: [
    {
      question: "Resolve",
      choices: ["無視する", "解決する", "複雑にする", "拒否する"],
      answer: "解決する",
    },
    {
      question: "Operate",
      choices: ["操作する", "壊す", "停止する", "無視する"],
      answer: "操作する",
    },
    {
      question: "Allow",
      choices: ["許可する", "禁止する", "無視する", "強制する"],
      answer: "許可する",
    },
    {
      question: "Suspend",
      choices: ["続ける", "中止する", "開始する", "無視する"],
      answer: "中止する",
    },
    {
      question: "Overlook",
      choices: ["見過ごす", "注目する", "評価する", "無視する"],
      answer: "見過ごす",
    },
    {
      question: "Achieve",
      choices: ["失敗する", "達成する", "諦める", "無視する"],
      answer: "達成する",
    },
    {
      question: "Direct",
      choices: ["間接的な", "直接的な", "無関係な", "間違った"],
      answer: "直接的な",
    },
    {
      question: "Handle",
      choices: ["放棄する", "取り扱う", "無視する", "壊す"],
      answer: "取り扱う",
    },
    {
      question: "Forbid",
      choices: ["許可する", "禁止する", "無視する", "強制する"],
      answer: "禁止する",
    },
    {
      question: "Forgive",
      choices: ["許す", "罰する", "忘れる", "無視する"],
      answer: "許す",
    },
    {
      question: "Omit",
      choices: ["含む", "省略する", "強調する", "無視する"],
      answer: "省略する",
    },
    {
      question: "Quit",
      choices: ["続ける", "辞める", "開始する", "無視する"],
      answer: "辞める",
    },
    {
      question: "Acquire",
      choices: ["手に入れる", "失う", "無視する", "拒否する"],
      answer: "手に入れる",
    },
    {
      question: "Occupy",
      choices: ["占める", "空ける", "無視する", "壊す"],
      answer: "占める",
    },
    {
      question: "Force",
      choices: ["強制する", "許可する", "無視する", "説得する"],
      answer: "強制する",
    },
    {
      question: "Require",
      choices: ["必要とする", "無視する", "持っている", "拒否する"],
      answer: "必要とする",
    },
    {
      question: "Deserve",
      choices: ["受けるに値する", "拒否する", "無視する", "失う"],
      answer: "受けるに値する",
    },
    {
      question: "Retire",
      choices: ["退職する", "続ける", "始める", "無視する"],
      answer: "退職する",
    },
    {
      question: "Persuade",
      choices: ["説得する", "強制する", "無視する", "反対する"],
      answer: "説得する",
    },
    {
      question: "Claim",
      choices: ["主張する", "拒否する", "無視する", "確認する"],
      answer: "主張する",
    },
    {
      question: "Absolute",
      choices: ["絶対的な", "相対的な", "無視する", "一時的な"],
      answer: "絶対的な",
    },
    {
      question: "Former",
      choices: ["以前の", "現在の", "未来の", "無視する"],
      answer: "以前の",
    },
    {
      question: "Latter",
      choices: ["後者の", "前者の", "無関係な", "無視する"],
      answer: "後者の",
    },
    {
      question: "Responsible",
      choices: ["責任がある", "無責任な", "無関係な", "無視する"],
      answer: "責任がある",
    },
    {
      question: "Actual",
      choices: ["実際の", "想像の", "無関係な", "理想的な"],
      answer: "実際の",
    },
    {
      question: "Correct",
      choices: ["正しい", "間違った", "無関係な", "不完全な"],
      answer: "正しい",
    },
    {
      question: "Approximate",
      choices: ["おおよその", "正確な", "無関係な", "完全な"],
      answer: "おおよその",
    },
    {
      question: "Following",
      choices: ["次の", "前の", "無関係な", "同時の"],
      answer: "次の",
    },
    {
      question: "Initial",
      choices: ["初期の", "最終の", "無視する", "途中の"],
      answer: "初期の",
    },
    {
      question: "Ultimate",
      choices: ["最終の", "初期の", "一時的な", "無視する"],
      answer: "最終の",
    },

    {
      question: "Plain",
      choices: ["複雑な", "明白な", "装飾的な", "抽象的な"],
      answer: "明白な",
    },
    {
      question: "Tight",
      choices: ["緩い", "厳しい", "柔らかい", "広い"],
      answer: "厳しい",
    },
    {
      question: "Complete",
      choices: ["部分的な", "完全な", "未完成の", "基本的な"],
      answer: "完全な",
    },
    {
      question: "Steady",
      choices: ["不安定な", "急速な", "変動的な", "安定した"],
      answer: "安定した",
    },
    {
      question: "Political",
      choices: ["政治的な", "経済的な", "個人的な", "宗教的な"],
      answer: "政治的な",
    },
    {
      question: "Temporary",
      choices: ["恒久的な", "短期的な", "定期的な", "無期限の"],
      answer: "短期的な",
    },
    {
      question: "Considerable",
      choices: ["微小な", "重要な", "無視できる", "平均的な"],
      answer: "重要な",
    },
    {
      question: "Principal",
      choices: ["副次的な", "主要な", "無関係な", "一時的な"],
      answer: "主要な",
    },
    {
      question: "Specific",
      choices: ["曖昧な", "特定の", "一般的な", "無関係な"],
      answer: "特定の",
    },
    {
      question: "Concrete",
      choices: ["具体的な", "抽象的な", "理論的な", "間接的な"],
      answer: "具体的な",
    },
    {
      question: "Legend",
      choices: ["事実", "伝説", "現実", "噂"],
      answer: "伝説",
    },
    {
      question: "Profit",
      choices: ["損失", "利益", "投資", "コスト"],
      answer: "利益",
    },
    {
      question: "Destination",
      choices: ["出発点", "目的地", "経路", "過程"],
      answer: "目的地",
    },
    {
      question: "Fare",
      choices: ["無料", "運賃", "割引", "手数料"],
      answer: "運賃",
    },
    {
      question: "Origin",
      choices: ["目的", "起源", "結果", "進行"],
      answer: "起源",
    },

    {
      question: "District",
      choices: ["地区", "国", "都市", "建物"],
      answer: "地区",
    },
    {
      question: "Slave",
      choices: ["奴隷", "主人", "労働者", "自由人"],
      answer: "奴隷",
    },
    {
      question: "Treasure",
      choices: ["宝物", "廃棄物", "負債", "平凡"],
      answer: "宝物",
    },
    {
      question: "Mankind",
      choices: ["動物", "人類", "機械", "自然"],
      answer: "人類",
    },
    {
      question: "Term",
      choices: ["条件", "期間", "解決", "契約"],
      answer: "期間",
    },
    {
      question: "Atmosphere",
      choices: ["大気", "海洋", "土地", "宇宙"],
      answer: "大気",
    },
    {
      question: "Immigrant",
      choices: ["観光客", "移民", "市民", "難民"],
      answer: "移民",
    },
    {
      question: "Boundary",
      choices: ["中心", "境界", "接点", "距離"],
      answer: "境界",
    },
    {
      question: "Evolution",
      choices: ["進化", "退化", "停滞", "変化"],
      answer: "進化",
    },
    {
      question: "Biography",
      choices: ["伝記", "小説", "詩", "レポート"],
      answer: "伝記",
    },
    {
      question: "Nationality",
      choices: ["性格", "国籍", "職業", "年齢"],
      answer: "国籍",
    },
    {
      question: "Source",
      choices: ["結果", "源", "目的", "方法"],
      answer: "源",
    },
    {
      question: "Colony",
      choices: ["帝国", "都市", "植民地", "共和国"],
      answer: "植民地",
    },
    {
      question: "Media",
      choices: ["媒体", "文学", "技術", "政府"],
      answer: "媒体",
    },
    {
      question: "Destiny",
      choices: ["選択", "運命", "偶然", "計画"],
      answer: "運命",
    },
    {
      question: "Heritage",
      choices: ["遺産", "負債", "贈り物", "借金"],
      answer: "遺産",
    },
    {
      question: "Climate",
      choices: ["気候", "地形", "文化", "経済"],
      answer: "気候",
    },
    {
      question: "Transportation",
      choices: ["通信", "交通", "教育", "娯楽"],
      answer: "交通",
    },
    {
      question: "Prosperity",
      choices: ["貧困", "繁栄", "不安", "平和"],
      answer: "繁栄",
    },
    {
      question: "Citizen",
      choices: ["外国人", "市民", "観光客", "指導者"],
      answer: "市民",
    },
    { question: "Province", choices: ["都市", "国", "州", "村"], answer: "州" },
    {
      question: "Peninsula",
      choices: ["島", "半島", "大陸", "山脈"],
      answer: "半島",
    },
    {
      question: "Pavement",
      choices: ["建物", "道路", "橋", "公園"],
      answer: "道路",
    },
    {
      question: "Ancestor",
      choices: ["子孫", "先祖", "友人", "敵"],
      answer: "先祖",
    },
    {
      question: "Descendant",
      choices: ["祖先", "子孫", "減少", "認識"],
      answer: "子孫",
    },

    {
      question: "Voyage",
      choices: ["旅行", "滞在", "探求", "停滞"],
      answer: "旅行",
    },
    {
      question: "Outlook",
      choices: ["展望", "内観", "過去", "予測"],
      answer: "展望",
    },
    {
      question: "Occupation",
      choices: ["趣味", "職業", "休息", "教育"],
      answer: "職業",
    },
    {
      question: "Tradition",
      choices: ["革新", "伝統", "変化", "現代性"],
      answer: "伝統",
    },
    {
      question: "Civilization",
      choices: ["野蛮", "文明", "自然", "単純さ"],
      answer: "文明",
    },
    {
      question: "Progress",
      choices: ["後退", "進歩", "停滞", "減少"],
      answer: "進歩",
    },
    {
      question: "Decade",
      choices: ["世紀", "年", "月", "十年"],
      answer: "十年",
    },
    { question: "Era", choices: ["瞬間", "時代", "日", "週"], answer: "時代" },
    {
      question: "Congress",
      choices: ["会社", "議会", "集会", "団体"],
      answer: "議会",
    },
    {
      question: "Tribe",
      choices: ["国家", "部族", "集団", "家族"],
      answer: "部族",
    },
    {
      question: "Afford",
      choices: ["拒否する", "提供する", "要求する", "節約する"],
      answer: "提供する",
    },
    {
      question: "Assume",
      choices: ["確認する", "想定する", "拒否する", "調査する"],
      answer: "想定する",
    },
    {
      question: "Approach",
      choices: ["離れる", "接近する", "避ける", "無視する"],
      answer: "接近する",
    },
    {
      question: "Found",
      choices: ["創設する", "破壊する", "失う", "放棄する"],
      answer: "創設する",
    },
    {
      question: "Separate",
      choices: ["結合する", "分離する", "混合する", "一致する"],
      answer: "分離する",
    },
    {
      question: "Translate",
      choices: ["無視する", "翻訳する", "削除する", "保存する"],
      answer: "翻訳する",
    },
    {
      question: "Declare",
      choices: ["隠す", "宣言する", "拒否する", "疑問を抱く"],
      answer: "宣言する",
    },
    {
      question: "Ruin",
      choices: ["改善する", "破壊する", "構築する", "修復する"],
      answer: "破壊する",
    },
    {
      question: "Remain",
      choices: ["去る", "残る", "変化する", "進化する"],
      answer: "残る",
    },
    {
      question: "Appear",
      choices: ["消える", "現れる", "隠れる", "変わる"],
      answer: "現れる",
    },
    {
      question: "Exchange",
      choices: ["保持する", "交換する", "拒否する", "単独で行う"],
      answer: "交換する",
    },
    {
      question: "Organize",
      choices: ["混乱させる", "組織する", "破壊する", "無視する"],
      answer: "組織する",
    },
    {
      question: "Excel",
      choices: ["失敗する", "優れる", "平均的である", "後退する"],
      answer: "優れる",
    },
    {
      question: "Decrease",
      choices: ["増加する", "減少する", "安定する", "変化しない"],
      answer: "減少する",
    },
    {
      question: "Conduct",
      choices: ["無視する", "実施する", "拒否する", "中止する"],
      answer: "実施する",
    },
    {
      question: "Develop",
      choices: ["後退する", "発展する", "停止する", "減少する"],
      answer: "発展する",
    },
    {
      question: "Invade",
      choices: ["退却する", "侵略する", "保護する", "無視する"],
      answer: "侵略する",
    },
    {
      question: "Delay",
      choices: ["急ぐ", "遅延する", "無視する", "前進する"],
      answer: "遅延する",
    },
    {
      question: "Ban",
      choices: ["許可する", "禁止する", "奨励する", "無視する"],
      answer: "禁止する",
    },
    {
      question: "Bet",
      choices: ["保証する", "賭ける", "拒否する", "無視する"],
      answer: "賭ける",
    },
    {
      question: "Cease",
      choices: ["続ける", "停止する", "開始する", "加速する"],
      answer: "停止する",
    },
    {
      question: "Adjust",
      choices: ["無視する", "調整する", "破壊する", "拒否する"],
      answer: "調整する",
    },
    {
      question: "Undergo",
      choices: ["避ける", "経験する", "無視する", "拒否する"],
      answer: "経験する",
    },
    {
      question: "Conquer",
      choices: ["敗北する", "征服する", "逃げる", "協力する"],
      answer: "征服する",
    },
    {
      question: "Advance",
      choices: ["後退する", "進む", "停止する", "無視する"],
      answer: "進む",
    },
    {
      question: "Submit",
      choices: ["拒否する", "提出する", "隠す", "無視する"],
      answer: "提出する",
    },
    {
      question: "Transfer",
      choices: ["保持する", "転送する", "拒否する", "破棄する"],
      answer: "転送する",
    },
    {
      question: "Unite",
      choices: ["分離する", "統合する", "競争する", "無視する"],
      answer: "統合する",
    },
    {
      question: "Release",
      choices: ["保持する", "放出する", "拒否する", "抑制する"],
      answer: "放出する",
    },
    {
      question: "Participate",
      choices: ["避ける", "参加する", "無視する", "観察する"],
      answer: "参加する",
    },
    {
      question: "Raise",
      choices: ["下げる", "上げる", "維持する", "無視する"],
      answer: "上げる",
    },
    {
      question: "Trace",
      choices: ["無視する", "追跡する", "放棄する", "拒否する"],
      answer: "追跡する",
    },
    {
      question: "Cancel",
      choices: ["確認する", "キャンセルする", "進める", "無視する"],
      answer: "キャンセルする",
    },
    {
      question: "Rule",
      choices: ["従う", "支配する", "拒否する", "無視する"],
      answer: "支配する",
    },
    {
      question: "Disappear",
      choices: ["現れる", "消える", "変化する", "停止"],
      answer: "消える",
    },
    {
      question: "Manage",
      choices: ["無視する", "管理する", "放棄する", "破壊する"],
      answer: "管理する",
    },
    {
      question: "Surround",
      choices: ["避ける", "取り囲む", "分離する", "結合する"],
      answer: "取り囲む",
    },
    {
      question: "Intend",
      choices: ["意図する", "無視する", "拒否する", "忘れる"],
      answer: "意図する",
    },
    {
      question: "Reserve",
      choices: ["解放する", "予約する", "拒否する", "破棄する"],
      answer: "予約する",
    },
    {
      question: "Cost",
      choices: ["利益", "価格", "損失", "報酬"],
      answer: "価格",
    },
  ],
};
