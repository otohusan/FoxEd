type Quiz = {
  question: string;
  choices: string[];
  answer: string;
  partOfSpeech: number;
};

type QuizFormat = {
  label: string;
  body: Quiz[];
};

export const quizData1: QuizFormat = {
  label: "ユメタン 181-240",
  body: [
    {
      question: "Civil",
      choices: ["自然の", "敵対的な", "市民の", "古代の"],
      answer: "市民の",
      partOfSpeech: 3,
    },
    {
      question: "Visible",
      choices: ["隠れる", "感じる", "見える", "聞こえる"],
      answer: "見える",
      partOfSpeech: 3,
    },
    {
      question: "Alternative",
      choices: ["伝統的な", "二次的な", "主要な", "代替の"],
      answer: "代替の",
      partOfSpeech: 3,
    },
    {
      question: "Intense",
      choices: ["平凡な", "速い", "穏やかな", "激しい"],
      answer: "激しい",
      partOfSpeech: 3,
    },
    {
      question: "Reverse",
      choices: ["一致する", "前進する", "逆の", "同じ"],
      answer: "逆の",
      partOfSpeech: 3,
    },
    {
      question: "Economic",
      choices: ["身体的な", "文化的な", "精神的な", "経済的な"],
      answer: "経済的な",
      partOfSpeech: 3,
    },
    {
      question: "Scary",
      choices: ["冷たい", "暖かい", "楽しい", "怖い"],
      answer: "怖い",
      partOfSpeech: 3,
    },
    {
      question: "Immediate",
      choices: ["間接的な", "即時の", "長期的な", "遅延した"],
      answer: "即時の",
      partOfSpeech: 3,
    },
    {
      question: "Minute",
      choices: ["緊急の", "一般的な", "微小な", "巨大な"],
      answer: "微小な",
      partOfSpeech: 3,
    },
    {
      question: "Due",
      choices: ["適切な", "支払われるべき", "余分な", "無関係の"],
      answer: "支払われるべき",
      partOfSpeech: 3,
    },
    {
      question: "Social",
      choices: ["秘密の", "社会的な", "個人的な", "自然の"],
      answer: "社会的な",
      partOfSpeech: 3,
    },
    {
      question: "Financial",
      choices: ["情緒的な", "教育的な", "健康的な", "財政的な"],
      answer: "財政的な",
      partOfSpeech: 3,
    },
    {
      question: "Wealthy",
      choices: ["幸せな", "裕福な", "中間の", "貧しい"],
      answer: "裕福な",
      partOfSpeech: 3,
    },
    {
      question: "Common",
      choices: ["特別な", "固有の", "珍しい", "一般的な"],
      answer: "一般的な",
      partOfSpeech: 3,
    },
    {
      question: "Inferior",
      choices: ["同等の", "劣った", "優れた", "競争的な"],
      answer: "劣った",
      partOfSpeech: 3,
    },
    {
      question: "Entire",
      choices: ["全体の", "断片的な", "部分の", "局所的な"],
      answer: "全体の",
      partOfSpeech: 3,
    },
    {
      question: "Permanent",
      choices: ["不安定な", "変わることのない", "一時的な", "永久の"],
      answer: "永久の",
      partOfSpeech: 3,
    },
    {
      question: "Minor",
      choices: ["二次的な", "大きい", "小さい", "主要な"],
      answer: "小さい",
      partOfSpeech: 3,
    },
    {
      question: "Major",
      choices: ["一般的な", "主要な", "無関係な", "二次的な"],
      answer: "主要な",
      partOfSpeech: 3,
    },
    {
      question: "Obscure",
      choices: ["人気のある", "不明瞭な", "明確な", "一般的な"],
      answer: "不明瞭な",
      partOfSpeech: 3,
    },
    {
      question: "Threat",
      choices: ["保証", "友情", "脅威", "機会"],
      answer: "脅威",
      partOfSpeech: 1,
    },
    {
      question: "Virtue",
      choices: ["無関心", "怒り", "美徳", "欠点"],
      answer: "美徳",
      partOfSpeech: 1,
    },
    {
      question: "Tension",
      choices: ["幸福", "緊張", "リラックス", "人間"],
      answer: "緊張",
      partOfSpeech: 1,
    },
    {
      question: "Gratitude",
      choices: ["恐怖", "嫌悪", "無関心", "感謝"],
      answer: "感謝",
      partOfSpeech: 1,
    },
    {
      question: "Violence",
      choices: ["協力", "暴力", "平和", "喜び"],
      answer: "暴力",
      partOfSpeech: 1,
    },
    {
      question: "Issue",
      choices: ["機会", "質問", "解決", "問題"],
      answer: "問題",
      partOfSpeech: 1,
    },
    {
      question: "Delight",
      choices: ["怒り", "喜び", "悲しみ", "戦争"],
      answer: "喜び",
      partOfSpeech: 1,
    },
    {
      question: "Viewpoint",
      choices: ["反対", "無関心", "同意", "視点"],
      answer: "視点",
      partOfSpeech: 1,
    },
    {
      question: "Protest",
      choices: ["支持", "賛成", "抗議", "無関心"],
      answer: "抗議",
      partOfSpeech: 1,
    },
    {
      question: "Grief",
      choices: ["驚き", "喜び", "心配", "悲しみ"],
      answer: "悲しみ",
      partOfSpeech: 1,
    },
    {
      question: "Scent",
      choices: ["色", "味", "音", "香り"],
      answer: "香り",
      partOfSpeech: 1,
    },
    {
      question: "Responsibility",
      choices: ["依存", "自由", "責任", "無責任"],
      answer: "責任",
      partOfSpeech: 1,
    },
    {
      question: "Education",
      choices: ["休息", "遊び", "教育", "仕事"],
      answer: "教育",
      partOfSpeech: 1,
    },
    {
      question: "Forecast",
      choices: ["現在", "歴史", "予報", "過去"],
      answer: "予報",
      partOfSpeech: 1,
    },
    {
      question: "Sensation",
      choices: ["感情", "無感覚", "感覚", "割り箸"],
      answer: "感覚",
      partOfSpeech: 1,
    },
    {
      question: "Sympathy",
      choices: ["反感", "同情", "喜び", "小説"],
      answer: "同情",
      partOfSpeech: 1,
    },
    {
      question: "Shame",
      choices: ["喜び", "誇り", "無関心", "恥"],
      answer: "恥",
      partOfSpeech: 1,
    },
    {
      question: "Impulse",
      choices: ["思考", "衝動", "計画", "反射"],
      answer: "衝動",
      partOfSpeech: 1,
    },
    {
      question: "Instinct",
      choices: ["無関心", "学習", "知識", "本能"],
      answer: "本能",
      partOfSpeech: 1,
    },
    {
      question: "Impact",
      choices: ["同意", "影響", "反対", "無関係"],
      answer: "影響",
      partOfSpeech: 1,
    },
    {
      question: "Criticize",
      choices: ["褒める", "賛成する", "批判する", "疑問視する"],
      answer: "批判する",
      partOfSpeech: 2,
    },
    {
      question: "Agree",
      choices: ["反対する", "疑問を抱く", "同意する", "無関心"],
      answer: "同意する",
      partOfSpeech: 2,
    },
    {
      question: "Hesitate",
      choices: ["急ぐ", "確信する", "躊躇する", "同意する"],
      answer: "躊躇する",
      partOfSpeech: 2,
    },
    {
      question: "Amuse",
      choices: ["退屈させる", "楽しませる", "怒らせる", "混乱させる"],
      answer: "楽しませる",
      partOfSpeech: 2,
    },
    {
      question: "Disturb",
      choices: ["邪魔する", "安心させる", "支援する", "確認する"],
      answer: "邪魔する",
      partOfSpeech: 2,
    },
    {
      question: "Confuse",
      choices: ["混乱させる", "明確にする", "強化する", "安定させる"],
      answer: "混乱させる",
      partOfSpeech: 2,
    },
    {
      question: "Fascinate",
      choices: ["退屈させる", "怖がらせる", "魅了する", "驚かせる"],
      answer: "魅了する",
      partOfSpeech: 2,
    },
    {
      question: "Suspect",
      choices: ["信じる", "否定する", "疑う", "承認する"],
      answer: "疑う",
      partOfSpeech: 2,
    },
    {
      question: "Praise",
      choices: ["批判する", "褒める", "分析する", "無視する"],
      answer: "褒める",
      partOfSpeech: 2,
    },
    {
      question: "Realize",
      choices: ["夢見る", "実現する", "忘れる", "食べる"],
      answer: "実現する",
      partOfSpeech: 2,
    },
    {
      question: "Reject",
      choices: ["受け入れる", "眠る", "考慮する", "拒絶する"],
      answer: "拒絶する",
      partOfSpeech: 2,
    },
    {
      question: "Celebrate",
      choices: ["悲しむ", "祝う", "批判する", "無視する"],
      answer: "祝う",
      partOfSpeech: 2,
    },
    {
      question: "Blame",
      choices: ["褒める", "非難する", "分析する", "掴む"],
      answer: "非難する",
      partOfSpeech: 2,
    },
    {
      question: "Suppose",
      choices: ["確認する", "退く", "疑う", "仮定する"],
      answer: "仮定する",
      partOfSpeech: 2,
    },
    {
      question: "Fade",
      choices: ["強くなる", "薄れる", "続く", "無視する"],
      answer: "薄れる",
      partOfSpeech: 2,
    },
    {
      question: "Attract",
      choices: ["遠ざける", "引き付ける", "怒らせる", "無視する"],
      answer: "引き付ける",
      partOfSpeech: 2,
    },
    {
      question: "Guess",
      choices: ["確認する", "心配する", "知る", "推測する"],
      answer: "推測する",
      partOfSpeech: 2,
    },
    {
      question: "Approve",
      choices: ["拒否する", "承認する", "疑う", "叩く"],
      answer: "承認する",
      partOfSpeech: 2,
    },
    {
      question: "Cherish",
      choices: ["軽視する", "大切にする", "忘れる", "選ぶ"],
      answer: "大切にする",
      partOfSpeech: 2,
    },
    {
      question: "Astonish",
      choices: ["驚かせる", "安心させる", "無視する", "悲しませる"],
      answer: "驚かせる",
      partOfSpeech: 2,
    },
  ],
};
