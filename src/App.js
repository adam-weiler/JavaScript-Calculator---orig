import React, { Component } from 'react';
import ButtonList from './ButtonList.js';
import { arithmetics_arr } from './arithmetics_arr';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formula_val: '', //Value shown in "Formula" div.
			display_val: 0, //Value shown in "Display" div.
			currLength: 0, //Counts length of current number.
			decimalFLAG: false //Prevents user from entering multiple decimals within the same number.
		};
		this.handleClick = this.handleClick.bind(this); //Handles any button clicks.
	}

	componentDidMount() { //When the webpage first loads.
		const fCCscript = document.createElement("script");
		fCCscript.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
		fCCscript.async = true;
		document.body.appendChild(fCCscript); //Needed to for freeCodeCamp Test Suite.
	}

	handleClick(value, type) { //The user click a calculator button.
		//console.log("1 Mouse click: value is " + value + " " + type);
		switch (type) { //User hit a number button, between 0 and 9.
			case 'numbers':
				this.newNum(value);
				break;

			case 'operators': //User hit a math operator button, + - x or ÷.
				this.newOperator(value)
				break;

			case 'decimal': //User hit the decimal . button.
				this.decimal(value);
				break;

			case 'clear': //User hit clear AC button.
				this.clear();
				break;

			default: //User hit the equals = button.
				this.equals();
				break;
		}
	}

	newNum(value) { //User entered a number between 0 and 9.
		//console.log("2 User entered a number: " + value);
		let currentFormula = this.state.formula_val; //Current formula.
		let currentLength = this.state.currLength + 1; //Gets current length of string and adds 1.

		if (currentFormula.charAt(0) == 0) { //If first character of equation is 0, removes it.
			currentFormula = currentFormula.slice(0, -1);
		}

		if (currentLength <= 9) { //Prevents current number being greater than 9 digits.
			currentFormula = currentFormula.concat(value);
		}

		this.setState({ //Updates the formula, the display, and the current length of number.
			formula_val: currentFormula, //Adds the number to the formula.
			display_val: currentFormula,
			currLength: currentLength //Increases the length of current number by 1.
		});
		// console.log("formula_val, display_val: " + currentFormula);
		// console.log("currLength: " + currentLength);
	}

	newOperator(value) { //User entered a math operator, + - x or ÷.
		//console.log("4 User hit a calculation: " + value);
		let currentFormula = this.state.formula_val; //Current formula.
		let lastChar = currentFormula[currentFormula.length - 1]; //Gets the last character entered.
		//console.log("lastChar: " + lastChar);

		//If user entered an operator and then another operator, the first operator is erased.
		if ((lastChar === "+") || (lastChar === "-") || (lastChar === "*") || (lastChar === "/")) {
			currentFormula = currentFormula.slice(0, -1);
		}

		this.setState({
			formula_val: currentFormula = currentFormula.concat(value), //Adds the operator to the current formula.
			currLength: 0, //Resets length of number to 0.
			decimalFLAG: false //Resets decimal flag to false.
		});
		// console.log("formula_val: " + currentFormula);
		// console.log("currLength: " + 0);
		// console.log("decimalFLAG: " + false);
	}

	equals() { //User entered the equals = button.
		//console.log("3 User hit equal.");
		let currentFormula = this.state.formula_val; //Current formula.

		if (this.state.formula_val) { //If a formula value exists, add brackets around current formula.
			currentFormula = "(".concat(currentFormula).concat(")");
		} else { //If there is no formula value, current formula is set to 0.
			currentFormula = 0;
		}

		this.setState({
			formula_val: currentFormula, //Updates the formula value.
			display_val: eval(currentFormula), //Evaluates the current formula and updates the display value.
			currLength: 0, //Resets length of number to 0.
			decimalFLAG: false //Resets decimal flag to false.
		});
		// console.log("formula_val, display_val: " + currentFormula);
		// console.log("currLength: " + 0);
		// console.log("decimalFLAG: " + false);
	}

	decimal(value) { //User entered the decimal . button.
		//console.log("5 User hit a decimal: " + value);
		let currentFormula = this.state.formula_val; //Current formula.

		if (this.state.decimalFLAG === false) { //If there are no decimals in current number, it adds one.
			currentFormula = currentFormula.toString().concat(value);
		}

		this.setState({
			formula_val: currentFormula, //Updates the formula value.
			display_val: currentFormula, //Updates the display value.
			decimalFLAG: true //There is a decimal in current number, flag is raised.
		});
		// console.log("formula_val, display_val: " + currentFormula);
		// console.log("decimalFLAG: " + true);
	}

	clear() { //User entered the clear AC button. Resets all values to default.
		//console.log("6 User hit clear.");
		this.setState({
			formula_val: '',
			display_val: 0,
			currLength: 0,
			decimalFLAG: false
		});
		// console.log("formula_val: " + '');
		// console.log("display_val: " + 0);
		// console.log("currLength: " + 0);
		// console.log("decimalFLAG: " + false);
	}

	render() {
		return ( <div className="App" id="App">
			<h1>Calculator in React:</h1> 
			<div id = "calculator">
				<div id="formula"> {this.state.formula_val} </div>
				<div id="display"> {this.state.display_val} </div>
				<ButtonList buttons={arithmetics_arr} clicker={this.handleClick} /> </div>
			</div>
		);
	}
}

export default App;