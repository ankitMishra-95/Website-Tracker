import loading from "./loading.gif";
function Loading() {
  return (
    <div className="loading">
      <div className="wrapper">
        <img src={loading} alt="Loading" />
        <h4>Fetching Website Details</h4>
      </div>
    </div>
  );
}

export default Loading;
