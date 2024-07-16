import { HeadDataHelmet, Header } from "../../../components";
import "../style/MainApplicationContact.css";
import { useState } from "react";

function MainApplicationContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信のロジックを追加します（例：API呼び出し）
    console.log({ name, email, message });
    alert("お問合せを送信しました。");
  };

  return (
    <div className="application-contact">
      <HeadDataHelmet pageTitle="お問合せ" />
      <Header HeaderTitle="お問合せ" />
      <main className="contact-content">
        <h2>お問合せフォーム</h2>
        <p>ご質問やご意見がございましたら、以下のフォームにご記入ください。</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">お名前:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">お客様メールアドレス:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="message">メッセージ:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
          />

          <button type="submit">送信</button>
        </form>
      </main>
    </div>
  );
}

export default MainApplicationContact;
