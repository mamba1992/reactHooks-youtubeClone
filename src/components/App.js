import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import Spinner from "./Spinner";
import useVideos from "./../hooks/useVideos";

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, search] = useVideos("cats");

  useEffect(() => {
    setSelectedVideo(videos[0]);
  }, [videos]);

  const renderTitle = () => {
    return <h1 style={{ marginTop: "20px" }}>Youtube Clone Landing page</h1>;
  };
  const renderContent = () => {
    if (!selectedVideo) {
      return (
        <div className="ui row">
          <Spinner />
        </div>
      );
    }
    return (
      <div className="ui row">
        <div className="eleven wide column">
          <VideoDetail video={selectedVideo} />
        </div>
        <div className="five wide column">
          <VideoList onVideoSelect={setSelectedVideo} videos={videos} />
        </div>
      </div>
    );
  };

  return (
    <div className="ui container">
      {renderTitle()}
      <SearchBar onFormSubmit={search} />
      <div className="ui grid">{renderContent()}</div>
    </div>
  );
};

export default App;
