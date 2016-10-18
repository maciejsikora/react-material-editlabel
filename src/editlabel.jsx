import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

/**
@author Maciej Sikora
Class creates element with two states - label, and TextField in edit mode
**/
class EditLabel extends Component{

    static INIT_CLICK=1; //edition on single click
    static INIT_DBCLICK=2; //edition on double click


    constructor(props){

      super(props);

      this.bodyClickEvent=null;//click event on page body
      this.changeDeffer=null;


      this.state={

        edit:false, //edit mode
        value:this.props.defValue
      };

      this.lastValue=this.props.defValue;

    }


    //input value change handler
    handleChange(e){

      this.setState({value:e.target.value});

      //deffer to less saving in network
      if (this.changeDeffer!=null)
      clearTimeout(this.changeDeffer);

      this.changeDeffer=setTimeout(()=>{

        if (this.props.onChange!==null)
        this.props.onChange(this.state.value,this.props.id);

      },400);

    }

    cancelEditMode(){

      //we clicked ouside current edited element
      this._removeBodyListener();
      this.setState({edit:false});//cancel edit

      if (this.state.value.trim().length===0 && !this.props.clearEnable){

        //value was cleared but it is blocked
        this.setState({value:this.lastValue});//back to last value

      }else
      this.lastValue=this.state.value;//save last value;

      if (this.props.onEditEnd!=null){

        this.props.onEditEnd(this.state.value, this.props.id);

      }

    }

    _bodyClickHandler(e){

      if ( !e.target.dataset || typeof e.target.dataset.id ==="undefined"  ||  e.target.dataset.id!=this.props.id){

        this.cancelEditMode();

      }

    }

    _removeBodyListener(){


      if (this.bodyClickEvent!==null)
      document.removeEventListener("click",this.bodyClickEvent,false);

    }

    _addBodyListener(){

        this._removeBodyListener();
        this.bodyClickEvent=this._bodyClickHandler.bind(this);
        document.addEventListener("click",this.bodyClickEvent,false);
    }

    handleLabelClick(type,e){

      if (this.props.initBy!==type)
      return; //it is not this event

      //block propagate
      e.stopPropagation();
      e.preventDefault();

      this.setState({edit:true});

      //set binding
      this._addBodyListener();

      if (this.props.onEditStart!==null)
      this.props.onEditStart(this.state.value, this.props.id);

    }

    handleKeyPress(e){

      if (e.charCode===13){//enter

        if (this.props.onEnterClick!==null)
        this.props.onEnterClick(this.state.value,this.props.id);

        this.cancelEditMode();
      }



    }

    handleInputClick(e){

      //block events bubbling
      e.stopPropagation();
    }

    getLabelStyle(){

      return {
        cursor:"pointer"
      }
    }

    render(){

      const props = this.props;
      const { ...tf } = props.input;//textField props
      const { ...label } = props.label;//label props

      let inputJSX;
      if (this.props.material)
      inputJSX=<TextField {...tf} ref="input" data-id={props.id} name={"input_"+props.id} onClick={this.handleInputClick.bind(this)} value={this.state.value} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}></TextField>;
      else //standard input
        inputJSX=<input {...tf} ref="input" data-id={props.id} name={"input_"+props.id} onClick={this.handleInputClick.bind(this)} value={this.state.value} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}></input>;

      let element;
      if (this.state.edit)
      element=inputJSX;
      else
      element=(
      <label style={this.getLabelStyle()} ref="label"
      {...label}
      onDoubleClick={this.handleLabelClick.bind(this,EditLabel.INIT_DBCLICK)}
      onClick={this.handleLabelClick.bind(this,EditLabel.INIT_CLICK)}
      >{this.state.value}
      </label>
      );

      return element;

    }

};

EditLabel.propTypes = {

  input:React.PropTypes.object,
  label:React.PropTypes.object,
  initBy:React.PropTypes.number.isRequired,
  id: React.PropTypes.number.isRequired,
  defValue:   React.PropTypes.string,
  onEditEnd:React.PropTypes.func, //calls on end of edit
  onChange: React.PropTypes.func,//calls on every change
  onEnterClick: React.PropTypes.func,//calls after enter click
  onEditStart:React.PropTypes.func,//calls when edition starts
  material: React.PropTypes.bool, //if true it uses TextField from material if false <input>
  clearEnable:React.PropTypes.bool //is possible to remove all text - clear it

};

EditLabel.defaultProps = {
  input:{ className:"editlabel-input"},
  label:{ className:"editlabel-label"},
  initBy:EditLabel.INIT_CLICK, //default is single click
  defValue:"",
  clearEnable:false,
  onChange:null,
  onEditEnd:null, //
  onEnterClick:null,
  onEditStart:null,
  material:true
};

export default EditLabel;
