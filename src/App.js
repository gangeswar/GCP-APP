import React, { Component } from 'react'
import axios from 'axios'

import Image from './image'
import './App.css'

class App extends Component {

  state = {
    selectFile: null,
    img: [],
    message: ''
  }

  componentWillMount(){
    axios.get('http://localhost:8080/').then((res) => {
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
    axios.post('http://localhost:8080/image/', formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      this.setState({message: res.data.message})
      axios.get('http://localhost:8080/').then((res) => {
        this.setState({img: res.data.data});
       }).catch(err => {
         console.log(err)
       });
    }).catch(err => {
      this.setState({message: 'Please upload Valid file'})
    });
  }
  
  deleteImage = (id) => {
    axios.delete(`http://localhost:8080/image/${id}`).then((res) => {
      this.setState({message: res.data.message});
      axios.get('http://localhost:8080/').then((res) => {
        this.setState({img: res.data.data});
       }).catch(err => {
         console.log(err)
       });
     }).catch(err => {
       console.log(err)
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
        <div class="row">
          <Image img={this.state.img} deleteImage ={this.deleteImage} />
        </div>
      </div>
    );
  }
}

export default App;