import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({
  getInitialState: function(){
    return {notes: []}
  },
  add: function(newNoteText){
    var newNote = this.state.notes;
    newNote.push({'desc': newNoteText});
    this.setState({notes: newNote});
  },
  delete: function(id){
    var newNotes = this.state.notes;
    newNotes.splice(id, 1);
    this.setState({notes: newNotes});
  },
  save: function(newText, id){
    var newNotes = this.state.notes;
    newNotes[id] = {'desc': newText};
    this.setState({notes: newNotes});
  },
  render: function() {
    return (
    <div>
      <NoteMenu notes={this.state.notes} addNote={this.add}/>
      <NoteList notes={this.state.notes} deleteNote={this.delete} saveNote={this.save}/>
    </div>
    )
  }
});

var NoteMenu = React.createClass({
  add: function(){
    var newVal = this.refs.newNoteText.value;
    if (newVal) {
      this.props.addNote(newVal);
      this.refs.newNoteText.value = "";
    }
  },
  handleKeyPress: function(e) {
    if (e.key === 'Enter') {
      this.add();
    }
  },
  render: function() {
    return (
    <div id="note-menu" className="input-group">
      <input type="text" className="form-control" placeholder="Add note here" ref="newNoteText" onKeyPress={this.handleKeyPress}/>
      <span className="input-group-btn">
        <button className="btn btn-default btn-success" type="button" onClick={this.add}>+</button>
      </span>
    </div>

    )
  }
});

var NoteList = React.createClass({
  render: function() {
    return (
    <ul className="list-group">{this.props.notes.map((note, i) => <Note key={i} noteId={i} desc={note.desc} deleteNote={this.props.deleteNote} saveNote={this.props.saveNote}/>)}
    </ul>
    )
  }
});

var Note = React.createClass({
  getInitialState: function() {
    return {isEditing: false}
  },
  delete: function(){
    this.props.deleteNote(this.props.noteId);
  },
  save: function(){
    var newText = this.refs.newText.value;
    this.props.saveNote(newText, this.props.noteId);
    this.toggleEdit();
  },
  toggleEdit: function(){
    this.setState({isEditing: !this.state.isEditing});
  },
  renderForm: function(){
    return (
    <div>
      <li key={this.props.noteId} noteId={this.props.noteId} className="list-group-item list-group-item-info">  
      <span className="note">{this.props.desc}</span> 
      <br/>
      <div className="btn-group" role="group">
      <button className="btn btn-default btn-primary" onClick={this.toggleEdit}>Edit</button>
      <button className="btn btn-default btn-danger" onClick={this.delete}>X</button>
      </div>
      </li>
    </div>)
  },
  renderEditForm: function() {
    return (
    <div>
      <li key={this.props.noteId} className="list-group-item list-group-item-info">
      <textarea ref="newText" className="note">{this.props.desc}</textarea>
      <br/ >
      <div className="btn-group" role="group">
      <button className="btn btn-default btn-success" onClick={this.save}>Save</button> 
      <button className="btn btn-default btn-danger" onClick={this.toggleEdit}>Cancel</button>
      </div>
      </li>
    </div>)
  },
  render: function() {
    if (this.state.isEditing === false){
      return this.renderForm();
    } else {
      return this.renderEditForm();
    }
  }
});

ReactDOM.render(<App />, document.getElementById('app'))
