import React from "react";
import { useFetch } from "./components/useFetch";

function App() {
  const url = "https://quizapi.io/api/v1/questions";

  const { data, loading } = useFetch({ url: url });

  return (
    <div>
      Hello App
      {!data ? <p>Loading.....</p> : <div>Loaded</div>}
      <button>Fetch Data</button>
    </div>
  );
}

export default App;
