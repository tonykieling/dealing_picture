import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class App extends Component {
  state = {
    pictureFile: null,
    pictureName: null,
    user: null,
    loadUser: false,
    newPicture: null,
    buttonLabel: "Change Image?"
  };

  handler = event => {
    console.log("inside handler - 2");
    console.log(event.target.name);
    event.preventDefault();
    const file = event.target.files[0];
    console.log("fileinfo:", file);
    if (file.size > (1024 * 1024 * 10)) {
      alert("big file!");
      event.target.value = null;
    } else
      this.setState({ newPicture: file });
  }

  mountUser = user => {
    console.log("inside mountUser - 1");
    axios.post("http://localhost:8888/users")
    //   console.log(res.statusText);});
    .then(result => {
      const user = result.data[0];
      this.setState({ 
        pictureName: user.picture_name,
        user: user.name,
        loadUser: false }) 
      });
  }

  sendPicture = event => {
    event.preventDefault();
    // console.log("inside sendPicture - 3");
    // console.log("pictureFile", this.state.pictureFile);
    const data = new FormData() ;
    data.append('file', this.state.pictureFile || this.state.newPicture);
// console.log("data", data);
    axios.post("http://localhost:8888/picture", data)
      //   console.log(res.statusText);});
      .then(result => {
        console.log("result", result);
        // this.setState({ 
        //   pictureName: "bob.jpg",
        //   user: "bob" });
        // this.clickBob.click();
      });
  }

  renderPicture = () => {
    console.log("inside renderPicture - 4");
    console.log("pictureName:", this.state.pictureName);
    return (
      <div style={{border: "solid blue 1px", margin: "20px", padding: "10px"}}>

        <div style={{border: "solid red 1px", width: "250px", paddingRight: "10px", display: "inline-block"}}>
          <img src={require("./pictures/" + this.state.pictureName)} alt="supposed to be smth222" width="250px" height="250px"/>
          <div>
            <input 
              type="file"
              style={{display: "none"}}
              onChange={this.handler}
              ref={fileInput => this.fileInput = fileInput} />
            <button onClick={() => this.fileInput.click()}> {this.state.buttonLabel} </button>
          </div>
        </div>

        {this.state.newPicture ?
          <div style={{border: "solid blue 1px", paddingRight: "10px", width: "250px", display: "inline-block"}}>
            <img src={URL.createObjectURL(this.state.newPicture)} alt="new one" width="250px"/>
            <div>
              <label>Replace Img?</label>
              <button onClick={this.sendPicture}> Yes</button>
              <button onClick={this.noNewImg}> No</button>
            </div>
          </div> :
          null }
      </div>
    );
  }

  noNewImg = event => {
    event.preventDefault();
    this.setState({ 
      newPicture: null,
      buttonLabel: "Change Image?" });
  }

  first = event => {
    event.preventDefault();
    this.setState({ loadUser: true });
  }

  render() {
    console.log("inside RENDER");
    console.log("this.state", this.state);
    return (
      <div>
        <button onClick={this.first} ref={clickBob => this.clickBob = clickBob}> Bob </button>
        <button onClick={() => this.clickBob.click()} ref={asd => this.asd = asd}> Bob II </button>
        <button onClick={() => this.asd.click()}> Bob III </button>

        { this.state.loadUser ? 
            this.mountUser() :
            null
        }

        { this.state.user ?
          this.renderPicture() :
          null }

      </div>
    )
  }
}
