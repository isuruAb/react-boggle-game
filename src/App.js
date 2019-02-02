import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      points: 0
    };

  }
  styles = {
    rowstyle: {
      display: 'flex',
      minWidth: '150px',
      minHeight: '10px',
      cursor: 'pointer'
    },
    colstyle: {
      flex: 1,
      padding: '30px',
      width: '60px',
      height: '35px',
      border: '0.5px solid #fff',
      background: '#4885ed'
    },

  };


  getBoard = () => {

    axios.get('/api/v1/boggle/board').then(response => {
      const chars = response.data.data;
      this.setState({ board: chars })
    });
  }

  finalWord = [];
  finalIndex = [];
  neigbourArr = [];
  submittedWords = [];
  selectChar(e, params) {
    console.log(e.target.id);
    console.log(params);
    let selectedIndex = e.target.id.split("");

    for (var i = 0; i < selectedIndex.length; i++) {
      selectedIndex[i] = parseInt(selectedIndex[i], 10);
    }

    let row_limit = 4;
    let column_limit = 4;

    //Check Existance
    if (this.finalIndex.length !== 0) {
      for (let index = 0; index < this.finalIndex.length; index++) {
        if (this.finalIndex[index][0] === selectedIndex[0] && this.finalIndex[index][1] === selectedIndex[1]) {
          alert("You can't select same character again");
          return;
        }
      }
    }

    if (this.neigbourArr.length !== 0) {
      let isNeigbour = false;


      for (let neigbour = 0; neigbour < this.neigbourArr.length; neigbour++) {
        if (selectedIndex[0] === this.neigbourArr[neigbour][0] && selectedIndex[1] === this.neigbourArr[neigbour][1]) {
          console.log('They are equal!', JSON.stringify(this.neigbourArr[neigbour]));
          isNeigbour = true;

        }
      }
      if (!isNeigbour) {
        alert("you need to select a neigbour");
        return;
      }
      else {
        this.finalWord.push(params);
        this.finalIndex.push([selectedIndex[0], selectedIndex[1]]);
        document.getElementById(e.target.id).style.background = '#345678';

        this.neigbourArr = [];

        if (row_limit > 0) {
          for (var x = Math.max(0, selectedIndex[1] - 1); x <= Math.min(selectedIndex[1] + 1, row_limit - 1); x++) {
            for (var y = Math.max(0, selectedIndex[0] - 1); y <= Math.min(selectedIndex[0] + 1, column_limit - 1); y++) {
              if (x !== selectedIndex[1] || y !== selectedIndex[0]) {
                this.neigbourArr.push([y, x]);
              }
            }
          }
          console.log("neigbourArr", this.neigbourArr);
        }
      }
    }
    else {
      this.finalWord.push(params);
      this.finalIndex.push([selectedIndex[0], selectedIndex[1]]);

      document.getElementById(e.target.id).style.background = '#345678';

      console.log('no length else');
      this.neigbourArr = [];

      if (row_limit > 0) {
        for (let x = Math.max(0, selectedIndex[1] - 1); x <= Math.min(selectedIndex[1] + 1, row_limit - 1); x++) {
          for (let y = Math.max(0, selectedIndex[0] - 1); y <= Math.min(selectedIndex[0] + 1, column_limit - 1); y++) {
            if (x !== selectedIndex[1] || y !== selectedIndex[0]) {
              this.neigbourArr.push([y, x]);
            }
          }
        }
        console.log("neigbourArr", this.neigbourArr);
      }
    }
    console.log("this.finalWord", this.finalWord);
    console.log("this.finalIndex", this.finalIndex);

  }
  // Submit selected word to the back end
  // Store selected words in an array
  // Check whether word is already selected
  submitToCheck() {
    for (let cell = 0; cell < this.finalIndex.length; cell++) {
      document.getElementById(String(this.finalIndex[cell].join(''))).style.background = '#4885ed';
    }
    let wordToBeSubmitted = this.finalWord.join('');
    var found = this.submittedWords.find(function (element) {
      return element === wordToBeSubmitted;
    });
    if (found !== wordToBeSubmitted) {
      console.log("found", found);
      var self = this;
      axios.post('/api/v1/boggle/word', {
        word: this.finalWord
      })
        .then(function (response) {

          if (response.data.check === true) {
            self.submittedWords.push(wordToBeSubmitted)
            self.setState({ points: self.state.points + 1 });
            console.log("this.state.points", self.state.points);
          }
        })
        .catch(function (error) {
          console.log(error);
        });


    }
    else{
      alert("this word is already selected");
    }
    this.finalWord = [];
    this.finalIndex = [];
    this.neigbourArr = [];
  }

  componentDidMount() {
    this.getBoard();
  }
  render() {
    console.log("this.state.board", this.state.board);
    return (
      <div className="App">
        <div className="App-header">

          <div id="row01" style={this.styles.rowstyle} >
            <div id="00" onClick={(e) => this.selectChar(e, this.state.board[0])} style={this.styles.colstyle}>{this.state.board[0]}</div>
            <div id="01" onClick={(e) => this.selectChar(e, this.state.board[1])} style={this.styles.colstyle}>{this.state.board[1]}</div>
            <div id="02" onClick={(e) => this.selectChar(e, this.state.board[2])} style={this.styles.colstyle}>{this.state.board[2]}</div>
            <div id="03" onClick={(e) => this.selectChar(e, this.state.board[3])} style={this.styles.colstyle}>{this.state.board[3]}</div>
          </div>
          <div id="row02" style={this.styles.rowstyle}>
            <div id="10" onClick={(e) => this.selectChar(e, this.state.board[4])} style={this.styles.colstyle}>{this.state.board[4]}</div>
            <div id="11" onClick={(e) => this.selectChar(e, this.state.board[5])} style={this.styles.colstyle}>{this.state.board[5]}</div>
            <div id="12" onClick={(e) => this.selectChar(e, this.state.board[6])} style={this.styles.colstyle}>{this.state.board[6]}</div>
            <div id="13" onClick={(e) => this.selectChar(e, this.state.board[7])} style={this.styles.colstyle}>{this.state.board[7]}</div>
          </div>
          <div id="row03" style={this.styles.rowstyle}>
            <div id="20" onClick={(e) => this.selectChar(e, this.state.board[8])} style={this.styles.colstyle}>{this.state.board[8]}</div>
            <div id="21" onClick={(e) => this.selectChar(e, this.state.board[9])} style={this.styles.colstyle}>{this.state.board[9]}</div>
            <div id="22" onClick={(e) => this.selectChar(e, this.state.board[10])} style={this.styles.colstyle}>{this.state.board[10]}</div>
            <div id="23" onClick={(e) => this.selectChar(e, this.state.board[11])} style={this.styles.colstyle}>{this.state.board[11]}</div>
          </div>
          <div id="row04" style={this.styles.rowstyle}>
            <div id="30" onClick={(e) => this.selectChar(e, this.state.board[12])} style={this.styles.colstyle}>{this.state.board[12]}</div>
            <div id="31" onClick={(e) => this.selectChar(e, this.state.board[13])} style={this.styles.colstyle}>{this.state.board[13]}</div>
            <div id="32" onClick={(e) => this.selectChar(e, this.state.board[14])} style={this.styles.colstyle}>{this.state.board[14]}</div>
            <div id="33" onClick={(e) => this.selectChar(e, this.state.board[15])} style={this.styles.colstyle}>{this.state.board[15]}</div>
          </div>
          <div className="submitbtn" onClick={() => this.submitToCheck()}>
            <p>Submit</p>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
