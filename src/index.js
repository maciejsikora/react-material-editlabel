import React, {Component} from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
import EditLabel from "./editlabel";
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
injectTapEventPlugin();

class App extends Component{

  constructor(){

    super();

    this.state={
      labels:[
      "You are the one",
      "Follow the white rabbit",
      "War, war never changes",
      "Life is like box of chocolates",
      "One for all, all for one"
      ]
    }
  }

  onListChange(value,id){

    let labels=this.state.labels;
    labels[id]=value;

    if (value.trim().length===0){
      //remove element from list

      labels.splice(id,1);

    }

    //refresh
    this.setState({labels:labels});
  }

  render(){

  let i=0;
  let self=this;

  function getEditLabel(text){

    i++;
    return <EditLabel onChange={self.onListChange.bind(self)} value={text} hintText="writeSomething" name={"field"+i}   id={i} />
  }

  let list=this.state.labels.map((el)=>{

    return <ListItem  key={i} disabled={true} primaryText={getEditLabel(el)}  />

  });

  return (
    <MuiThemeProvider>
    <Paper  zDepth={1} >
    <List>
      {list}
    </List>
    </Paper>

    </MuiThemeProvider>
    )
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
