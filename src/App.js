import React from 'react';
import './App.css';
import Logo from './logo_m.png';

class Comment extends React.Component {
  constructor(props){
     super(props);
     this.state = {
       editing: false,
       inputval: true
     }
   }

  edit(){
    console.log('test');
    this.setState({editing:true});
  }
  remove(){
    console.log('test');
    this.props.deleteFromBoard(this.props.index)
  }
  save(){
    this.setState({editing:false});
    var val = this.refs.newText.value;
    this.props.updateComentText(val, this.props.index )
  }

  renderForm(){
    return (
      <div className="taskitem">
        <form onSubmit={this.save.bind(this)}>
            <input className="text" ref="newText" placeholder={this.props.children}/>
            <button className="btn save">save</button>
            </form>
      </div>
    );
  }
  renderNormal(){
    return (
      <div className="taskitem">
            <div className="text">{this.props.children}</div>
            <button className="btn edit" onClick={this.edit.bind(this)}>Edit</button>
            <button className="btn remove" onClick={this.remove.bind(this)}>Remove</button>
      </div>
    );
  }
  render() {
      if(this.state.editing){
          return this.renderForm();
      }else{
          return this.renderNormal();
        }
  }
}

class Board extends React.Component{
  constructor(props){
    super(props);
    this.state={
      comments: [
        'comment No. 1',
        'lorem ipsum sucks',
        'I have no idea what to write',
        'Get coding asap',
    ]
    }
  }

  eachComment(item, i){
    return(<Comment key={i} index={i} deleteFromBoard={this.removeComment.bind(this)} updateComentText={this.updateComment.bind(this)}>
      {item}
    </Comment>);
  }

  removeComment(i){
    console.log('removing: '+i);
    var arr = this.state.comments;
    arr.splice(i, 1);
    this.setState({comments: arr})
  }
  updateComment(newText, i){
    console.log('updating: '+i);
    var arr = this.state.comments;
    arr[i] = newText;
    this.setState({comments: arr})
  }
  add(e){
    var arr = this.state.comments;
    if(this.refs.addNew.value){
      arr.unshift(this.refs.addNew.value);
      this.setState({comments: arr})
      this.refs.addNew.value = '';
    }
    else{
      alert("Please Enter New Task");
    }

    e.preventDefault();
  }

  render(){
    return(
      <div>
        <div className="wrapper">
            <div className="app">
              <img src={Logo} alt="logo" />
                <div className="head">
                  <form onSubmit={this.add.bind(this)}>
                      <input className="addnew" ref="addNew" placeholder='Add New Item'/>
                      <button className="submit">Add New</button>
                    </form>
                </div>
                    {
                      this.state.comments.map(this.eachComment.bind(this))
                    }
          </div>
        </div>
      </div>
    );
  }
}
export default Board;

