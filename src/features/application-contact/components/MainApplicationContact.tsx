import { HeadDataHelmet, Header } from "../../../components";
import "../style/MainApplicationContact.css";
import { useState } from "react";
import emailjs from "@emailjs/browser";

function MainApplicationContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("お問合せを送信しました。");
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("お問合せの送信に失敗しました。");
        }
      );
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

          <button type="submit" className="contact-submit-btn">
            送信
          </button>
        </form>
      </main>
    </div>
  );
}

export default MainApplicationContact;
