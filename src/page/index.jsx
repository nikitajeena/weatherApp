import { useCallback, useEffect, useMemo, useState } from "react";
import RowComponent from "../component/row";
import "./style.css";
import SearchInput from "../component/search";

export function useDebouce(input, time) {
  const [debouceValue, setDebounce] = useState("");
  let timer;
  useEffect(() => {
    timer = setTimeout(() => {
      setDebounce(input);
    }, time);

    if (timer) clearTimeout(time);
  }, [debouceValue]);

  return debouceValue;
}

export default function WeatherApp(data) {
  const [weatherData, setWeatherData] = useState([...data.data]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");

  const SearchData = useCallback(
    (input) => {
      let newSearchData = data.data?.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      return newSearchData;
    },
    [searchInput]
  );
  function handleSearch({ target }) {
    setSearchInput(() => target.value);
    localStorage.setItem("search", searchInput);

    if (!target.value) {
      setWeatherData([...data.data]);
      setSearchError("");
      return;
    }
    const check = SearchData(target.value);
    if (check.length == 0 || !check) {
      setSearchError("No Data Found");
      return;
    }
    setWeatherData([...check]);
    setSearchError("");
  }

  useEffect(() => {
    const data = localStorage.getItem("search");
    setSearchInput(() => data);
    const check = SearchData(data);
    if (check.length == 0 || !check) {
      setSearchError("No Data Found");
      return;
    }
    setWeatherData([...check]);
    setSearchError("");
  }, []);

  function handleKeyDown(e) {
    const newSearchData = data.data?.filter((item) => item.name == searchInput);
  }

  return (
    <>
      <div>
        <div className="search-input">
          <SearchInput
            handleSearch={handleSearch}
            handleKeyDown={handleKeyDown}
            placeholder="Search your city"
            value={searchInput}
          />
        </div>
        <table>
          <tr>
            <th>name</th>
            <th>Temperature</th>
            <th>Temperature</th>
          </tr>
          <tbody>
            {!!searchError ? (
              <tr>
                <td colSpan={3}>{searchError}</td>
              </tr>
            ) : (
              weatherData.map((i) => {
                return <RowComponent data={i} />;
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
