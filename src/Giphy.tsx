import { useState, useContext, useLayoutEffect } from "react";
import {
  Grid,
  SearchBar,
  SearchContext,
  SearchContextManager,
} from "@giphy/react-components";
import { IGif } from "@giphy/js-types";
import { SearchOptions } from "@giphy/js-fetch-api";

import "Giphy.css";

const webSDKKey = process.env.REACT_APP_GIPHY_API_KEY || "";

const filterOptions: SearchOptions = {
  lang: "en",
  type: "gifs",
  sort: "relevant",
  limit: 9,
  rating: "g",
};

const SearchExperience = () => (
  <SearchContextManager apiKey={webSDKKey} options={filterOptions}>
    <Components />
  </SearchContextManager>
);

const Components = () => {
  const [gifSelected, setGifSelected] = useState<Array<IGif>>([]);
  const [width, setWidth] = useState<number>(1024);

  const { fetchGifs, searchKey } = useContext(SearchContext);

  const onGifClick = (
    gif: IGif,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) => {
    gifSelected.push(gif);
    setGifSelected(gifSelected);
    e.preventDefault();
  };

  console.log("Components... gifSelected...", { gifSelected, width });

  return (
    <div className="giphy-container">
      <SearchBarComponent />
      <div className="giphy-wrapper-grid">
        <Grid
          key={searchKey}
          columns={3}
          gutter={9}
          width={width}
          fetchGifs={fetchGifs}
          onGifClick={onGifClick}
        />
      </div>
    </div>
  );
};

const SearchBarComponent = () => {
  return (
    <div className="giphy-wrapper-search">
      <SearchBar />
    </div>
  );
};

export default SearchExperience;
