import React, { useState, useContext, useRef, useCallback } from "react";
import {
  Gif,
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
  limit: 12,
  rating: "g",
};

const SearchExperience = () => (
  <SearchContextManager apiKey={webSDKKey} options={filterOptions}>
    <Components />
  </SearchContextManager>
);

const Components = () => {
  const [modalGif, setModalGif] = useState<IGif>();
  const [gridWidth, setWidth] = useState<number>(1024);

  const resizeObserver = useRef<ResizeObserver>(
    new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const { width } = entries[0].contentRect;
      setWidth(width);
    })
  );

  const resizedContainerRef = useCallback((container: HTMLDivElement) => {
    if (container !== null) {
      resizeObserver.current.observe(container);
    } else {
      if (resizeObserver.current) resizeObserver.current.disconnect();
    }
  }, []);

  const { fetchGifs, searchKey } = useContext(SearchContext);

  const onGifClick = (
    gif: IGif,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) => {
    e.preventDefault();
    setModalGif(gif);
  };

  const onCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setModalGif(undefined);
  };

  return (
    <div className="giphy-container" ref={resizedContainerRef}>
      <SearchBarComponent />
      <div className="giphy-wrapper-grid">
        <Grid
          key={searchKey}
          columns={3}
          gutter={9}
          width={gridWidth}
          fetchGifs={fetchGifs}
          onGifClick={onGifClick}
        />
      </div>
      {modalGif && (
        <div className="modal-gif" onClick={onCloseModal}>
          <Gif gif={modalGif} width={Math.floor(gridWidth / 2)} />
        </div>
      )}
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
