import React, { Component } from 'react';
import axios from 'axios';

import Image from './image'

class App extends Component {

  state = {
    selectFile: null,
    img: [],
    message: ''
  }

  componentWillMount(){
    axios.get('http://35.223.117.211:8080/').then((res) => {
     this.setState({img: res.data.data});
    }).catch(err => {
      console.log(err)
    });
  }

  selectImage = event => {
    this.setState({
      selectFile: event.target.files[0]
    });
  }

  uploadImage = () => {
    const formData = new FormData();
    formData.append("file", this.state.selectFile);
    axios.post('http://35.223.117.211:8080/image/', formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      this.setState({message: res.data.message})
      axios.get('http://35.223.117.211:8080/').then((res) => {
        this.setState({img: res.data.data});
       }).catch(err => {
         console.log(err)
       });
    }).catch(err => {
      this.setState({message: 'Please upload Valid file'})
    });
  }
  

  render() {
    return (
      <div>
        <input type="file" onChange = {this.selectImage}></input>
        <div>
          <button onClick = {this.uploadImage}>Upload</button>
        </div>
    <h4>{this.state.message}</h4>
        <Image img={this.state.img} />
      </div>
    );
  }
}

export default App;