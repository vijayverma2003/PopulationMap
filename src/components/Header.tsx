import menuSVG from "../images/menu.svg";
import SearchInput from "./SearchInput";

function Header(): JSX.Element {
  const handleMenuClick = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("sidebar-expanded");
  };

  return (
    <header className="main-header">
      <SearchInput />
      <div>
        <button onClick={handleMenuClick}>
          <img className="burger-menu" src={menuSVG} alt="Menu" />
        </button>
      </div>
    </header>
  );
}

export default Header;
