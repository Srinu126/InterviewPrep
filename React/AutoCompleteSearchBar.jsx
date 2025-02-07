import { useState, useEffect } from "react";


function useDebounce(value, delay = 2000) {
  const [data, setData] = useState(value);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setData(value);
    }, delay);

    return () => clearTimeout(timerID);
  }, [value, delay]);

  return data;
}



export default function AutoCompleteSearchBar() {
  const [recipe, setRecipe] = useState("");
  const data = useDebounce(recipe, 1000);
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(true);
  const [cache, setCache] = useState({});

  const handleInputChange = (e) => {
    setRecipe(e.target.value);
  };
  async function fetchResults() {
    if (cache[data]) {
      console.log("From cache");
      setResults(cache[data]);
      return;
    }
    console.log("making fetch request", data);
    const response = await fetch(
      "https://dummyjson.com/recipes/search?q=" + data
    );
    const json = await response.json();
    setResults(json?.recipes);
    setCache((prev) => ({ ...prev, [data]: json.recipes }));
  }
  useEffect(() => {
    fetchResults();
  }, [data]);

  return (
    <>
      <h1>AutoComplete Search Bar</h1>
      <div>
        <input
          className="container"
          value={recipe}
          onChange={handleInputChange}
          type="text"
          onBlur={() => setShow(false)}
          onFocus={() => setShow(true)}
          placeholder="Search a Recipe"
        />
        <div className="result-container">
          {results &&
            show &&
            results.map((recipe) => {
              return (
                <p className="result" key={recipe.id}>
                  {recipe.name}
                </p>
              );
            })}
        </div>
      </div>
    </>
  );
}



//styles
/**
 * .container {
  width: 500px;
  padding: 5px;
  border-radius: 5px;
}

.result-container {
  width: 500px;
  border: 1px solid black;
  max-height: 500px;
  overflow-y: scroll;
}

.result {
  padding: 3px;
}

.result:hover {
  background-color: gray;
}
 * 
 */
