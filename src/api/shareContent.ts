type shareContentProps = {
  title: string;
  text: string;
  url: string;
};

function shareContent({ title, text, url }: shareContentProps) {
  if (!navigator.share) {
    alert("このブラウザではシェアを利用できません。");
    return;
  }

  try {
    navigator.share({
      title: title,
      text: text,
      url: url,
    });
  } catch (error) {
    alert("シェアに失敗しました");
  }
}

export default shareContent;
