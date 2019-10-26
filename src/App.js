import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Get Array',
      firstArray: [],
      emptyArray: [],
      successMessage: ''
    }
  }

  changeValue = (index, e) => {
    if (e.key === 'Enter') {
      let tempArray = this.state.firstArray;
      tempArray.push(Number(e.target.value));
      e.target.value = '';
      this.state.emptyArray.pop();
      this.setState({
        firstArray: tempArray
      });
      if (this.state.emptyArray.length == 0) {
        this.setState({
          name: 'Sort Array'
        })
      }
      console.log(this.state.firstArray);
    }
  };
  sortArray = () => {
    let sortedArray = this.state.firstArray.sort((a, b) => {
      return a - b;
    });
    this.setState({
      firstArray: sortedArray,
      name: 'Submit Array'
    })
  }

  submitArray = () => {
    const url = 'http://reacthcode.free.beeceptor.com/my/api/path/'
    axios.post(url, this.state.firstArray)
      .then((response) => {
        console.log(response);
        this.setState({
          successMessage: response && response.data,
          firstArray: [],
          name: 'Get Array'
        })
        setTimeout(() => {
          this.setState({
            successMessage: ''
          })
        }, 5000)
      })
      .catch((error) => {
        console.log(error);
      });

  }

  getArray = () => {
    const url = 'https://api.myjson.com/bins/gks1o';
    if (this.state.name == 'Input Array') {
      this.setState({
        emptyArray: [0, 0, 0]
      })
    }

    if (this.state.name == 'Sort Array') {
      this.sortArray();
    }
    if (this.state.name == 'Submit Array') {
      this.submitArray();
    }

    if (this.state.name == 'Get Array') {
      axios.get(url).then(response => {
        this.setState({
          firstArray: response && response.data && response.data.first_array,
          name: 'Input Array'
        })
      });
    }
  };

  render() {
    return (<div className="array-button">
      <button className="button" onClick={this.getArray} type="button">{this.state.name}</button>
      <br></br>
      {this.state.firstArray.map((item, index) =>
        <button className="button">{item}</button>
      )}
      {
        this.state.emptyArray.map((item, index) =>
          <input className="input-class" onKeyDown={(e) => this.changeValue(index, e)} />
        )}
      <br></br>
      {
        <p> {
          this.state.successMessage
        }</p>
      }
    </div>)
  }
}
export default App;
