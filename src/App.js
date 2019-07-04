import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class App extends Component {
  state = {
    pictureFile: null
  };

  handler = event => {
    // event.preventDefault();
    const file = event.target.files[0];
    if (file.size > (1024 * 1024 * 1)) {
      alert("big file!")
    }
    else
      this.setState({
        pictureFile: file,
        loaded: 0
      });

    }
    
  sendPicture = event => {
    // event.preventDefault();
    const data = new FormData() ;
    data.append('file', this.state.pictureFile);

    axios.post("http://localhost:8888/upload", data, { /*receive two parameter endpoint url ,form data*/ })
      // .then(res => { // then print response status
      //   console.log(res.statusText);});
      .then(console.log)
  }

  render() {
    return (
      <div>
        <input type="file" name="file" onChange={this.handler}/>

        <button type="button" className="btn btn-success btn-block" onClick={this.sendPicture}>Upload</button> 
      </div>
    )
  }
}
