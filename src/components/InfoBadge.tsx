import "./style/InfoBadge.css";

type InfoBadgeProps = {
  text: string;
};

const InfoBadge = ({ text }: InfoBadgeProps) => {
  return <span className="info-badge">{text}</span>;
};

export default InfoBadge;
