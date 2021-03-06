import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Creatingtodo.css';
import firebase from 'firebase';
import { Draggable, Droppable } from 'react-drag-and-drop'




class Done extends Component {



  constructor(props) {
    super(props)
    this.state = {
      todoInput: '',
      todos: [],
      donetodos: []

    }


    firebase.database().ref('/').child("reacttodos").child('donetodos').on('child_added', (snap) => {
      var obj = { value: snap.val() };
      obj.key = snap.key;
      this.state.donetodos.push(obj)
      this.setState({ donetodos: this.state.donetodos });
    })

  }

  deleteHandler(val, ind) {

   var firebase = firebase.database().ref('/').child("reacttodos").child('donetodos').child(val.key).remove();
    let currentTodos = this.state.donetodos;
    currentTodos = []

    firebase.database().ref('/').child("reacttodos").child('donetodos').on('child_added', (snap) => {
      var obj = { value: snap.val() };
      obj.key = snap.key;
      currentTodos.push(obj)
      this.setState({ donetodos: currentTodos });
    })
  }

  onDroped(data) {
    var obj = JSON.parse(data.val);
    firebase.database().ref('/').child("reacttodos").child('donetodos').push(obj.value);
    firebase.database().ref('/').child("reacttodos").child('todos').child(obj.key).remove()

    let currentTodos = this.state.donetodos;
    currentTodos = []

    firebase.database().ref('/').child("reacttodos").child('donetodos').on('child_added', (snap) => {
      var obj = { value: snap.val() };
      obj.key = snap.key;
      currentTodos.push(obj)
      this.setState({ donetodos: currentTodos });
      // console.log(obj)
    })
  }
  liDrag(e){
    console.log('done') 
    
 
   }
  

  render() {
    return (


      <div className="App back">


        <Droppable types={['val']} onDrop={this.onDroped.bind(this)}>
          <ul className="Smoothie">
            <h1>Done</h1>

            {this.state.donetodos.map((val, ind) => {
              return (
                <Draggable onDrag={this.liDrag.bind(this)} type="val" data={JSON.stringify(val)}>
                  <li  key={val.key}> 
                    {val.value} <button onClick={this.deleteHandler.bind(this, val, ind)}>Delete</button>
                  </li>
                </Draggable>
              )
            })}
          </ul>
        </Droppable>


      </div>
    );
  }
}


export default Done;