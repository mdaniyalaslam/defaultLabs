import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class Div4 extends Component {
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
      console.log(this.state.todos)
    }
  
    render() {
      return (
  
  
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
                  return <li key={ind}>{val} {}</li>
                })}
              </ul>
            {/* Todo input area Ends */}
              
            </div>
          </div>
      );
    }
  }
  
  
  export default Div4;