import React, {Component} from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
import EditLabel from "react-material-editlabel";
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import TextField from 'material-ui/TextField';
injectTapEventPlugin();

class App extends Component{

  constructor(){

    super();

    this.state={
      labels:[
      {label:"You are the one",options:{input:{hintText:"Enter text"} }},
      {label:"Follow the white rabbit ( std. input ) ",options:{material:false}},
      {label:"War, war never changes (double click)",options:{ input:{hintText:"Enter text"},initBy:EditLabel.INIT_DBCLICK,label:{ style:{color:"red"} }} },
      {label:"Life is like box of chocolates",options:{input:{hintText:"Enter text"}}},
      {label:"One for all, all for one (double click)",options:{input:{hintText:"Enter text"},initBy:EditLabel.INIT_DBCLICK}}
      ],
      log:["Here is event log"]
    }
  }

  onChange(value,id){

    this.log("Text change. Current value is: "+value);
  }

  //log what is happening
  log(value){

    this.setState({log:[value].concat(this.state.log) })
  }

  onEditEnd(value,id){


      this.log("End of edition. Current value is: "+value);

  }

  onEditStart(value,id){

    this.log("Start of edition. Current value is: "+value);
  }

  render(){

  let i=0;
  let self=this;

  function getEditLabel(el){

    const {...opts} = el.options;

    i++;
    return <EditLabel {...opts} onEditStart={self.onEditStart.bind(self)} onChange={self.onChange.bind(self)} onEditEnd={self.onEditEnd.bind(self)} defValue={el.label} hintText="writeSomething" name={"field"+i}   id={i} />
  }

  const list=this.state.labels.map((el)=>{

    return <ListItem  key={i} disabled={true} primaryText={getEditLabel(el)}  />

  });

  const log=this.state.log.map((l,index)=>{

      return <p key={index} ><b>#{this.state.log.length-index}</b> {l}</p>;
  });

  return (
    <MuiThemeProvider>
    <Paper  zDepth={1} >
    <List>
      {list}
    </List>
    <Paper  zDepth={2} style={{padding:"20px", height:"200px", overflowY:"scroll"}} >
    <h3>Logs created in EditLabel callbacks:</h3>
      {log}
    </Paper>
    </Paper>
    </MuiThemeProvider>
    )
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
