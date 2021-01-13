import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import $ from 'jquery';

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

class App extends React.Component {
  state = { videos: [], selectedVide: null };

  componentDidMount() {
    this.onTermSubmit('buildings');
  }
  decodeHtmlEntities = (text) =>{
    return $("<textarea/>").html(text).text();
  }
  onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        maxResults: 5,
        type: 'video',
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

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail urldecode={this.decodeHtmlEntities} video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                urldecode={this.decodeHtmlEntities}
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
