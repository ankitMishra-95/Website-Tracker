import { useGlobalContext } from "./Context";
function SearchBar() {
  const { userInput, getInputData, setuserInput, userInputCorrect } =
    useGlobalContext();
  return (
    <>
      <div className="wrapper">
        <form className="searchBar" onSubmit={(e) => getInputData(e)}>
          <div className={`input-control ${userInputCorrect && "errmessage"}`}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setuserInput(e.target.value)}
              placeholder="Input with URL Validation"
            />
            <span>Please enter a valid Url, eg. 'https://example.com'.</span>
          </div>
          <button type="submit">ADD WEBSITE</button>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
