class Application extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      input: 0,
      operation: '',
      output: 0
		};
    
    this.clear = this.clear.bind(this);
    this.posNeg = this.posNeg.bind(this);
    this.percent = this.percent.bind(this);
    this.newNum = this.newNum.bind(this);
    this.newCalc = this.newCalc.bind(this);
    this.decimal = this.decimal.bind(this);
    this.equals = this.equals.bind(this);
	}
  
  
  
	componentDidMount() {
		//console.log ("Component Did Mount");
		this.clear(); //Clears the display on first load.
	}
  
  
  clear() {
    console.log ("Clear")
    this.setState({
			input: 0,
      operation: '',
			output: 0,
		});  
     //console.log ("B Clearing Values -- Input: " + this.state.input + " -- Operation: '" + this.state.operation + "' -- Output: " + this.state.output);
  }
  
  
  posNeg() {
  }
  
  percent() {
  }
  
  
  
  newNum(e) {
    var pressed = e.target.innerHTML;
    console.log ("A Key Pressed: " + pressed);
    
    if (this.state.output == 0) { //If a brand new calculation, output is set to key pressed.
      this.setState({
        output: pressed
      }); 
      console.log ("B New value added -- Input: " + this.state.input + " -- Operation: '" + this.state.operation + "' -- Output: " + this.state.output);
    } else { //If continued calculation, key pressed is added to end of outputue.
      this.setState({
        output: parseFloat((this.state.output).toString() + pressed)
      });  
      console.log ("C Adding digits -- Input: " + this.state.input + " -- Operation: '" + this.state.operation + "' -- Output: " + this.state.output);
    }
  }
  
  
  
  newCalc(e) { //Uses a mathematical operation to find the value.
    var pressed = e.target.innerHTML;
    console.log ("D New Operation: " + pressed);
    console.log ("Input: " + this.state.input + " -- Operation: '" + this.state.operation + "' -- Output: " + this.state.output);
    
    if (!this.state.input) {
      console.log ("E There is no input");
      
      
      this.setState({
        input: this.state.output
      });  
      
      
    } else {
      console.log ("F Going to run equals ");
      equals();
    }
    
    
      this.setState({
        operation: pressed,
        output: 0
      });  
    
  
  
  }
  
  
  
   decimal() { //Adds decimal point to end of new number.
    console.log ("G Decimal ");
     console.log ("H Decimal Values -- Input: " + this.state.input + " -- Operation: '" + this.state.operation + "' -- Output: " + this.state.output);
     
     
     if (Number.isInteger(this.state.output) == true) {

      
       this.setState({
          output: this.state.output.toString() + '.',
        });  
              console.log ("I It's true!" + this.state.output)
       
     }
     
     console.log (output)
     
    }
  
  
  equals() {
    console.log ("J Equals -- Input: " + this.state.input + " -- Operation: '" + this.state.operation + "' -- Output: " + this.state.output);
    

    var currVal = parseFloat(this.state.output);
    
    
    switch(this.state.operation) {
    case "÷":
        currVal = (this.state.input / this.state.output);
        break;
    case "x":
        currVal = (this.state.input * this.state.output);
        break;
    case "-":
        currVal = (this.state.input - this.state.output);
        break;
    case "+":
        currVal = (this.state.input + this.state.output);
        break;
  }
    
         this.setState({
          input: parseFloat(currVal),
           operation: '',
          output: 0
        });  
    
    
    
    console.log (currVal + " K Result")
  
  //currentValue = parseFloat(currentValue);
  //newValue = 0;
    
  }
  
  
  
	render() {

		//console.log ("Render: ");
		return ( <div id="calculator">
        <h1>React Calculator</h1>
        <div id="display">{this.state.output}</div>
        <button id="clear" onClick={this.clear}>AC</button>
        <button id="none">..</button>
        <button id="noone2">..</button>
        <button id="divide" onClick={this.newCalc}>÷</button>
        
        <button id="seven" onClick={this.newNum}>7</button>
        <button id="eight" onClick={this.newNum}>8</button>
        <button id="nine" onClick={this.newNum}>9</button>
        <button id="multiply" onClick={this.newCalc}>x</button>
        
        <button id="four" onClick={this.newNum}>4</button>
        <button id="five" onClick={this.newNum}>5</button>
        <button id="six" onClick={this.newNum}>6</button>
        <button id="subtract" onClick={this.newCalc}>-</button>
        
        <button id="one" onClick={this.newNum}>1</button>
        <button id="two" onClick={this.newNum}>2</button>
        <button id="three" onClick={this.newNum} >3</button>
        <button id="add" onClick={this.newCalc}>+</button>
        
        <button id="zero" onClick={this.newNum}>0</button>
        <button id="decimal" onClick={this.decimal}>.</button>
        <button id="equals" onClick={this.equals}>=</button>
        
        
            </div> );
	}
}
ReactDOM.render( < Application / > , document.getElementById('app'));
