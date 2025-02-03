import "./App.css";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <>
      <div className="main_container">
        <div
          className="container"
          style={{ maxWidth: "992px", padding: "20px 20px 20px" }}
        >
          <Layout />
        </div>
      </div>
    </>
  );
}

export default App;
