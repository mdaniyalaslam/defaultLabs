import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
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
    }
    onDroped(data) {
        var obj = JSON.parse(data.val);
        firebase.database().ref('/').child("reacttodos").child('donetodos').push(obj.value);
        firebase.database().ref('/').child("reacttodos").child('todos').child(obj.key).remove()

        let currentTodos = this.state.todos;
        currentTodos = []

        firebase.database().ref('/').child("reacttodos").child('todos').on('child_added', (snap) => {
            var obj = { value: snap.val() };
            obj.key = snap.key;
            currentTodos.push(obj)
            this.setState({ todos: currentTodos });
            // console.log(obj)
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
            <div>
                <Droppable types={['val']} onDrop={this.onUnDrop.bind(this)}>
                    <ul className="back">
                        <h1>Doing</h1>
                        {this.state.todos.map((val, ind) => {
                            return (
                                <Draggable type="val" data={JSON.stringify(val)}>
                                    <li id={val.key}>
                                        {val.value}
                                    </li>
                                </Draggable>);
                        })}
                    </ul>
                </Droppable>

                <Droppable types={['val']} onDrop={this.onDroped.bind(this)}>
                    <ul className="Smoothie bg-danger">
                        <h1>Done</h1>

                        {this.state.donetodos.map((val, ind) => {
                            return (
                                <Draggable type="val" data={JSON.stringify(val)}>
                                    <li key={val.key}>
                                        {val.value}
                                    </li>
                                </Draggable>
                            )
                        })}
                    </ul>
                </Droppable>
            </div>)
    }

}

export default Dragndrop;