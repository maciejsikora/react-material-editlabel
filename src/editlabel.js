import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

/**
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
        value:this.props.value
      };

    }

    componentWillReceiveProps(props){

      this.setState({value:props.value});
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

      let { id,className,onChange,onKeyPress,inputClassName,onEnterClick,labelClassName,initBy,...other } = this.props;

      let element;
      if (this.state.edit)
      element=<TextField {...other} ref="input" data-id={this.props.id} name={"input_"+this.props.id} onClick={this.handleInputClick.bind(this)} value={this.state.value} className={this.props.inputClassName}  onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}></TextField>;
      else
      element=(
      <label style={this.getLabelStyle()} ref="label"
      className={this.props.labelClassName}
      onDoubleClick={this.handleLabelClick.bind(this,EditLabel.INIT_DBCLICK)}
      onClick={this.handleLabelClick.bind(this,EditLabel.INIT_CLICK)}
      >{this.state.value}
      </label>
      );

      return element;

    }

};

EditLabel.propTypes = {

  initBy:React.PropTypes.number.isRequired,
  id: React.PropTypes.number.isRequired,
  value:   React.PropTypes.string,
  inputClassName: React.PropTypes.string,
  labelClassName: React.PropTypes.string,

  onChange: React.PropTypes.func,
  onEnterClick: React.PropTypes.func

};

EditLabel.defaultProps = {
  initBy:EditLabel.INIT_CLICK, //default is single click
  value: "",
  inputClassName:"editlabel-input",
  labelClassName:"editlabel-label",
  onChange:null,
  onEnterClick:null
};

export default EditLabel;
