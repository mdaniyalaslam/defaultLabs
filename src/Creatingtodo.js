import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import './Creatingtodo.css';
import firebase from 'firebase';
import { Draggable, Droppable } from 'react-drag-and-drop'



class Creatingtodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoInput: '',
      todos: []

    }
    this.todoHandler = this.todoHandler.bind(this)
    this.btnHandler = this.btnHandler.bind(this)

    firebase.database().ref('/').child("reacttodos").child('todos').on('child_added', (snap) => {
      var obj = {val:snap.val()};
      // obj[snap.key] = snap.val();
      obj.id = snap.key;
      this.state.todos.push(obj)
      this.setState({ todos: this.state.todos });
      // console.log(this.state.todos)
      console.log(obj);
    })
  }






  todoHandler(ev) {
    this.setState({
      todoInput: ev.target.value
    })
    // console.log(this.state.todos)
  }

  btnHandler(ev) {
    let todo = this.state.todoInput
    firebase.database().ref('/').child('reacttodos').child('todos').push(todo)
    // console.log(todo)
    this.setState({ todoInput: '' })
  }

  render() {
    return (

      // <div className ="row"></div>
      <div className="App">
        {/* Header starts */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Todo</h1>
        </header>
        {/* Header ends */}

        <div className="col-sm-3 back ">
          {/* Todo input area Starts */}
          <h1>Creating Todos</h1>
          <input type="text"
            className="form-control field"
            placeholder="Write Todo"
            name="todo" value={this.state.todoInput}
            onChange={this.todoHandler}
          />
          <button type="button" className="btn btn-primary" onClick={this.btnHandler}>Add</button>
          <ul>
            {this.state.todos.map((val, ind) => {
              return <li key={val.key}>
                {val.val} 
              </li>
            })}
          </ul>
          {/* Todo input area Ends */}

        </div>
      </div>
    );
  }
}


export default Creatingtodo;