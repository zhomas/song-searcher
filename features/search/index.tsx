import React, { useState, FC } from "react";
import styles from "./search.module.css";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { searchForTerm, searchResultsSelector } from "./search.slice";

export const Search: FC = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector(searchResultsSelector);
  const [searchTerm, setSearchTerm] = useState("the beatles");

  const runSearch = () => {
    dispatch(searchForTerm("sting and shaggy"));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchForTerm(searchTerm));
  };

  const renderContent = () => {
    if (results.status === "welcome") {
      return (
        <>
          <span>Welcome!</span>
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
      <div className={styles.results}>
        {results.results.map((result) => (
          <div className={styles.result}>
            <div className={styles.result__content}>
              <h4>{result.trackName}</h4>
              <h5>{result.artistName}</h5>
            </div>
            <img src={result.artworkUrl100} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.searchBar}>
        <input
          value={searchTerm}
          onChange={onChange}
          type="search"
          placeholder={"Search"}
        />
        <button type={"submit"}>Go</button>
      </form>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};
