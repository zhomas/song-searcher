import React, { useState, FC, useEffect, useLayoutEffect } from "react";
import styles from "./search.module.css";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { searchForTerm, searchMore, searchResultsSelector } from "./search.slice";
import { useInView } from "react-intersection-observer";

export const Search: FC = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector(searchResultsSelector);
  const [searchTerm, setSearchTerm] = useState("the beatles");

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const action = searchForTerm(searchTerm);
    dispatch(action);
    e.preventDefault();
  };

  useLayoutEffect(() => {
    if (inView) {
      const action = searchMore();
      dispatch(action);
    }
  }, [inView]);

  const renderContent = () => {
    if (results.status === "welcome") {
      return <span>Welcome! Try searching for your favourite band.</span>;
    }

    if (results.status === "none") {
      return <span>Sorry, no results found.</span>;
    }

    return (
      <>
        <div className={styles.results}>
          {results.results.map((result) => (
            <div className={styles.result}>
              <div className={styles.result__content}>
                <h4>{result.trackName}</h4>
                <h5>{result.artistName}</h5>
              </div>
              <img className={styles.result__img} src={result.artworkUrl100} />
            </div>
          ))}
        </div>
        <div
          ref={ref}
          className={styles.loader}
          style={{
            visibility: results.status === "loading" ? "visible" : "hidden",
          }}
        >
          Loading...
        </div>
      </>
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.searchBar}>
        <input value={searchTerm} onChange={onChange} type="search" placeholder={"Search"} />
        <button type={"submit"}>Go</button>
      </form>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};
