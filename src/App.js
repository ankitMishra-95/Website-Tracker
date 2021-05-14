import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Url from "./Url";
import Footer from "./Footer";
import Loading from "./Loading";
import { useGlobalContext } from "./Context";

function App() {
  const { isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <>
        <Navbar />
        <SearchBar />
        <Loading />
        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <SearchBar />
      <Url />
      <Footer />
    </>
  );
}

export default App;
