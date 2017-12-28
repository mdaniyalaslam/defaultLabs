import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import './Creatingtodo.css';
import firebase from 'firebase';
import { Draggable, Droppable } from 'react-drag-and-drop'





class Dragndrop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todoInput: '',
            todos: [],
            donetodos: []

        }

        firebase.database().ref('/').child("reacttodos").child('todos').on('child_added', (snap) => {
            var obj = { val: snap.val() };
            obj.key = snap.key;
            this.state.todos.push(obj)
            this.setState({ todos: this.state.todos });
            // console.log(obj)
        })
        firebase.database().ref('/').child("reacttodos").child('donetodos').on('child_added', (snap) => {
            // var obj = snap.val();
            var obj = { val: snap.val() };
            obj.id = snap.key;
            this.state.donetodos.push(obj)
            this.setState({ donetodos: this.state.donetodos });
            console.log(obj)
        })
    }

    render() {
        return (
            <div>
                <ul className="back">
                    <h1>Doing</h1>
                    {this.state.todos.map((val, ind) => {
                        return (
                            <Draggable type="val" data={JSON.stringify(val)}>
                                <li id={val.key} >
                                    {val.val}
                                </li>
                            </Draggable>);
                    })}
                </ul>

                <Droppable types={['val']} onDrop={this.onDrop.bind(this)}>
                    <ul className="Smoothie back">
                        <h1>Done</h1>
                        
                        {this.state.donetodos.map((val, ind) => {
                            return (
                                <Draggable>
                                    <li key={val.key}>
                                        {val.val}
                                    </li>
                                </Draggable>
                        )})}
                    </ul>
                </Droppable>
            </div>)
    }
    onDrop(data) {
        console.log(JSON.parse(data.val));
        var obj = JSON.parse(data.val);

        firebase.database().ref('/').child("reacttodos").child('donetodos').push(obj.val);
        firebase.database().ref('/').child("reacttodos").child('todos').child(obj.key).remove()
            .then((bal) => {
                console.log(obj.key);

            });
        // console.log(this.state.donetodos);

    }
}

export default Dragndrop;