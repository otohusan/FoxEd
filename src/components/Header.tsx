import "./style/Header.css";

function Header({ HeaderTitle }: { HeaderTitle: string }): JSX.Element {
  return (
    <div className="HeaderContainer">
      <div className="HeaderTitle">{HeaderTitle}</div>
    </div>
  );
}

export default Header;
