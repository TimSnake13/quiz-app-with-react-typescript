import React from "react";

export const DataContext = React.createContext({
  toggleSelection: (idx: number) => {},
  submitAnswer: () => {},
  prev: () => {},
  next: () => {},
  showCorrect: false,
  currCorrect: [0],
});
