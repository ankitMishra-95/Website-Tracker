import { useGlobalContext } from "./Context";
function Navbar() {
  const { urlList, isLoading } = useGlobalContext();
  return (
    <header>
      <div className="wrapper">
        <nav>
          <h2>Live Website Tracking</h2>
          <p>Currently tracking {!isLoading && urlList.length + " Websites"}</p>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
