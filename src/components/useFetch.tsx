import { useEffect, useState, useRef } from "react";

interface Props {
  url: string;
  apiKey?: string;
}

interface Istate {
  data: any;
  loading: boolean;
}

export const useFetch = ({ url, apiKey }: Props) => {
  const isCurrent = useRef(true);
  const [state, setState] = useState<Istate>({ data: null, loading: true });

  useEffect(() => {
    return () => {
      // Unmounted clean up
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    if (apiKey)
      fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": "XGwhNMAwuBENu2HVuG8kEkbAa4P9ZCwBMlB8vy55",
          // "category": "Linux",
        },
      })
        .then((response) => response.json())
        .then((d) => {
          if (isCurrent) setState({ data: d, loading: false });
          // console.log(d[0]);
        });
    else
      fetch(url)
        .then((response) => response.json())
        .then((d) => {
          if (isCurrent) setState({ data: d, loading: false });
          // console.log(d[0]);
        });

    // axios.get(props.url).then((response) => {
    //   console.log(response);
    //   setState({ data: response, loading: false });
    // });
  }, [url, apiKey]);

  return state;
};
