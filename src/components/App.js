import React, { Component } from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import Spinner from "./Spinner";
const KEY = "AIzaSyDDw7tNaInGIKMp_6S5QpZYHQYG6_h6RVs";

export default class App extends Component {
  state = { videos: [], selectedVideo: null };
  componentDidMount() {
    this.onTermSubmit("cats");
  }
  onTermSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        maxResults: 5,
        key: KEY,
      },
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };
  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };
  renderTitle() {
    return <h1 style={{ marginTop: "20px" }}>Youtube Clone Landing page</h1>;
  }
  renderContent() {
    if (!this.state.selectedVideo) {
      return (
        <div className="ui row">
          <Spinner />
        </div>
      );
    }
    return (
      <div className="ui row">
        <div className="eleven wide column">
          <VideoDetail video={this.state.selectedVideo} />
        </div>
        <div className="five wide column">
          <VideoList
            onVideoSelect={this.onVideoSelect}
            videos={this.state.videos}
          />
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="ui container">
        {this.renderTitle()}
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">{this.renderContent()}</div>
      </div>
    );
  }
}
