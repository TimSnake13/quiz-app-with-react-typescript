import React from "react";

export const DataContext = React.createContext({
  toggleSelection: (idx: number) => {},
  submitAnswer: () => {},
});
