import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { searchForTerm, searchResultsSelector } from "./search.slice";

export const Search: FC = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector(searchResultsSelector);

  const runSearch = () => {
    dispatch(searchForTerm("sting and shaggy"));
  };

  if (results.status === "welcome") {
    return (
      <>
        <span>Welcome!</span>
        <button onClick={runSearch}>Search</button>
      </>
    );
  }

  if (results.status === "loading") {
    return <span>Loading...</span>;
  }

  if (results.status === "none") {
    return <span>No results for that search.</span>;
  }

  return (
    <>
      {results.results.map((result) => (
        <div>{result.artistName}</div>
      ))}
      <button onClick={runSearch}>Search</button>
    </>
  );
};
