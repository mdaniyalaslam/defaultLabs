import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './Creatingtodo.css';
import firebase from 'firebase';
import { Draggable, Droppable } from 'react-drag-and-drop'



class Creatingtodo extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
        todoInput: '',
        todos: [],
        donetodos: []

    }

    firebase.database().ref('/').child("reacttodos").child('todos').on('child_added', (snap) => {
        var obj = { value: snap.val() };
        obj.key = snap.key;
        this.state.todos.push(obj)
        this.setState({ todos: this.state.todos });
        // console.log(obj)
    })
    firebase.database().ref('/').child("reacttodos").child('donetodos').on('child_added', (snap) => {
        var obj = { value: snap.val() };
        obj.key = snap.key;
        this.state.donetodos.push(obj)
        this.setState({ donetodos: this.state.donetodos });
    })

    this.todoHandler = this.todoHandler.bind(this)
    this.btnHandler = this.btnHandler.bind(this)
}



  todoHandler(ev) {
    this.setState({
      todoInput: ev.target.value
    })
  }

  btnHandler(ev) {
    let todo = this.state.todoInput
    firebase.database().ref('/').child('reacttodos').child('todos').push(todo)
    this.setState({ todoInput: '' })
  }

  deleteHandler(val, ind){

    firebase.database().ref('/').child("reacttodos").child('todos').child(val.key).remove();
    let currentTodos = this.state.todos;
        currentTodos = []

    firebase.database().ref('/').child("reacttodos").child('todos').on('child_added', (snap) => {
      var obj = { value: snap.val() };
      obj.key = snap.key;
      currentTodos.push(obj)
      this.setState({ todos: currentTodos });
  })
    
    


  }
  onUnDrop(data) {
    var obj = JSON.parse(data.val);
    firebase.database().ref('/').child("reacttodos").child('todos').push(obj.value);
    firebase.database().ref('/').child("reacttodos").child('donetodos').child(obj.key).remove();

    let currentDoneTodos = this.state.donetodos;
    currentDoneTodos = [];

    firebase.database().ref('/').child("reacttodos").child('donetodos').on('child_added', (snap) => {
        var obj = { value: snap.val() };
        obj.key = snap.key;
        currentDoneTodos.push(obj)
        this.setState({ donetodos: currentDoneTodos });
    })

}

  render() {
    return (

      <div className="App">
        <div className=" back ">
          {/* Todo input area Starts */}
          <h1>Creating Todos</h1>
          <input type="text"
            className="form-control field"
            placeholder="Write Todo"
            name="todo" value={this.state.todoInput}
            onChange={this.todoHandler}
          />
          <button type="button" className="btn btn-primary" onClick={this.btnHandler}>Add</button>




          <Droppable types={['val']} onDrop={this.onUnDrop.bind(this)}>
                    <ul className="smoothie">
                        {this.state.todos.map((val, ind) => {
                            return (
                                <Draggable type="val" data={JSON.stringify(val)}>
                                    <li id={val.key}>
                                        {val.value} <button onClick={this.deleteHandler.bind(this, val, ind)}>Delete</button>
                                    </li>
                                </Draggable>);
                        })}
                    </ul>
                </Droppable>

{/*           
          <ul>
            {this.state.todos.map((val, ind) => {
              return <li key={val.key}>
                {val.val} 
              </li>
            })}
          </ul> */}
          {/* Todo input area Ends */}

        </div>
      </div>
    );
  }
}


export default Creatingtodo;