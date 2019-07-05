import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const picturePath = "/files/pictures";
export default class App extends Component {
  state = {
    pictureFile: null,
    pictureName: null,
    pictureOK: true,
    users: ""
  };

  mountUser = user => {
    // console.log("user", user);
    return(
      <div>
        {/* <label>User: {user.name}</label> */}
        <label>User: Test</label>
        <input type="file" name="file" onChange={this.handler}/>
        <button type="button" className="btn btn-success btn-block" onClick={this.sendPicture}>Upload</button>
      </div>
    )
  }

  handler = event => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log("fileinfo:", file);
    if (file.size > (1024 * 1024 * 1)) {
      alert("big file!");
      event.target.value = null;
    } else
      this.setState({ pictureFile: file });
  }

  sendPicture = event => {
    // event.preventDefault();
    const data = new FormData() ;
    data.append('file', this.state.pictureFile);
    console.log("data", data);

    axios.post("http://localhost:8888/upload", data, { /*receive two parameter endpoint url ,form data*/ })
      // .then(res => { // then print response status
      //   console.log(res.statusText);});
      .then(result => {
        console.log("message from server:", result);
        this.setState({ 
          pictureName: picturePath + "/bob.jpg",
          pictureOK: true });
      });
  }

  renderPicture = () => {
    console.log("inside renderPicture");
    console.log("pictureName:", this.state.pictureName);
    return (
      <div style={{border: "solid blue 1px", margin: "20px", padding: "10px"}}>
        <img src={this.state.pictureName} alt="supposed to be smth"/>
        <img src={require("./pictures/bob.jpg")} alt="supposed to be smth222" width="250px"/>
      </div>
    );
  }

  loadUsers = async () => {
    console.log("inside loadUsers");
    await fetch("http://localhost:8888/users", {  
      method: "POST",
    })
    .then(res => res.json())
    .then(resJSON => this.setState({ users: resJSON}));
    console.log("this.state.users", this.state.users);

    const localUsers = this.state.users.map(user => this.mountUser(user));

    this.setState({
      users: localUsers
    });
  }

  render() {
    // console.log("asd", Object.keys(this.state.users).length);
    // console.log("this.state.users", this.state.users);
    return (
      <div>
        <div style={{border: "solid blue 1px", margin: "20px", padding: "10px"}}>
          <label>Add picture</label>
          {this.mountUser()}
        </div>

        { this.state.pictureOK ?
            this.renderPicture():
            null}

        {/* <div>
          <button className="btn btn-success" onClick={this.loadUsers}> Get users </button>
          {Object.keys(this.state.users).length ? 
            <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>picture_name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users}
            </tbody>
          </table> :
            "empty" }
        </div> */}
      </div>
    )
  }
}
