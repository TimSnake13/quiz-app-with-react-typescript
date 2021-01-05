import { useEffect, useState } from "react";

interface Props {
  url: string;
}

export const useFetch = (props: Props) => {
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    fetch(props.url, {
      method: "GET",
      headers: {
        "X-Api-Key": "XGwhNMAwuBENu2HVuG8kEkbAa4P9ZCwBMlB8vy55",
      },
    })
      .then((response) => response.json())
      .then((d) => {
        setState({ data: d, loading: false });
        console.log(d[0]);
      });
  }, [props.url]);

  return state;
};
