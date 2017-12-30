import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Creatingtodo.css';
import firebase from 'firebase';
import { Draggable, Droppable } from 'react-drag-and-drop'


class Doing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoInput: '',
      todos: []

    }
    this.todoHandler = this.todoHandler.bind(this)
    this.btnHandler = this.btnHandler.bind(this)
  }

  todoHandler(ev) {
    this.setState({
      todoInput: ev.target.value
    })
    // console.log(this.state.todos)
  }

  btnHandler(ev) {
    let currentList = this.state.todos;
    currentList.push(this.state.todoInput);
    this.setState({
      todos: currentList,
      todoInput: ''
    })
    // let todos = this.state.todos
    let todoInput = this.state.todoInput
    firebase.database().ref('/').child('reacttodos').push(todoInput)
    console.log(todoInput)
  }

  render() {
    return (
      <div className="App" >


        <div class="col-sm-3 back">
        <h1>DIV-2</h1>

          <input type="text"
            className="form-control field"
            placeholder="Write Todo"
            name="todo" value={this.state.todoInput}
            onChange={this.todoHandler}
          />

          <button type="button" className="btn btn-primary" onClick={this.btnHandler}>Add</button>
          <ul>{this.state.todos.map((val, ind) => {
            return <li key={ind}>{val} {}</li>
          })}
          </ul>


        </div>
      </div>
    );
  }
}


export default Doing;