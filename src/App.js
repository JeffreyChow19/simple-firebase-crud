import ShowData from "./components/showData";
import AddData from "./components/addData";
import DelData from "./components/delData";

function App() {
  return (
    <div className="App">
      <h1>Student App</h1>
      <AddData />
      <DelData />
      <ShowData />
    </div>
  );
}

export default App;
