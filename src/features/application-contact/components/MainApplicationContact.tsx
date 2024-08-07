import { HeadDataHelmet, Header } from "../../../components";
import "../style/MainApplicationContact.css";
import { useState } from "react";
import emailjs from "@emailjs/browser";

function MainApplicationContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isConfirmed = window.confirm("お問い合せを行いますか？");
    if (!isConfirmed) {
      return;
    }

    const templateParams = {
      from_name: name,
      to_email: email,
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
        () => {
          alert("お問い合せを送信しました。");
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("お問い合せの送信に失敗しました。");
        }
      );
  };

  return (
    <div className="application-contact">
      <HeadDataHelmet pageTitle="お問い合せ" />
      <Header HeaderTitle="お問い合せ" />
      <main className="contact-content">
        <h2>お問い合せフォーム</h2>
        <p>ご質問やご意見がございましたら、以下のフォームにご記入ください。</p>
        <form
          className="contact-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
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
