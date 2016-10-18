# react-material-editlabel
React component for label edition on the fly. Label changes in material text field after click.

Example and more option description can be found - https://maciejsikora.github.io/react-material-editlabel/.

### Installation

```
npm install react-material-editlabel --save
```
### Dependencies
```
npm install material-ui --save
```


### Import package ( ES6 )

```javascript
import EditLabel from "react-material-editlabel";
```

### Use in component

```jsx
<EditLabel onEditStart={this.onEditStart.bind(self)} onChange={this.onChange.bind(this)} onEditEnd={this.onEditEnd.bind(this)} defValue={this.defText} id={this.editLabelId} /> 
```

### Available props

```javascript

EditLabel.propTypes = {

  input:React.PropTypes.object, //TextField props
  label:React.PropTypes.object, //Label props
  initBy:React.PropTypes.number.isRequired, //init by click or dbl click
  id: React.PropTypes.number.isRequired, //id of component use
  defValue:   React.PropTypes.string, //default value
  onEditEnd:React.PropTypes.func, //calls on end of edit
  onChange: React.PropTypes.func,//calls on every change
  onEnterClick: React.PropTypes.func,//calls after enter click
  onEditStart:React.PropTypes.func,//calls when edition starts
  material: React.PropTypes.bool, //if true it uses TextField from material if false <input>
  clearEnable:React.PropTypes.bool //is possible to remove all text - clear it

};

```


