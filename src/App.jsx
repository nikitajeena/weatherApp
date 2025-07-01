import WeatherApp from "./page";
import data from "./page/data.json";
import "./App.css";

function App() {
  function handleTheme() {}
  return (
    <>
      <div className="theme-button">
        <button onClick={handleTheme}>Day</button>
        <button onClick={handleTheme}>Night</button>
      </div>

      <WeatherApp data={data} />
    </>
  );
}

export default App;
