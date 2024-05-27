type InfoBadgeProps = {
  text: string;
  color: string;
  backgroundColor: string;
};

const InfoBadge = ({ text, color, backgroundColor }: InfoBadgeProps) => {
  const badgeStyle = {
    color: color || "white",
    backgroundColor: backgroundColor || "blue",
    padding: "5px 10px",
    borderRadius: "5px",
    display: "inline-block",
  };

  return <span style={badgeStyle}>{text}</span>;
};

export default InfoBadge;
