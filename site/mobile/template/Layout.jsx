

import React from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';


import { transformCode } from '../../utils';

const ARGS = 'ReactDOM, React, SaltUI, mountNode';


export default class Layout extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	changeFlag: 0
	    }
	    this.receiveMessage = this.receiveMessage.bind(this);
	}

	componentDidMount(){
		window.addEventListener('message', this.receiveMessage);
	}

	receiveMessage(event){
		console.log(event.data)

		const mount = this.refs.mountNode;
		const copms = [ReactDOM, React, window.SaltUI, mount];

  		try{
			// let f = new Function(args, code);
			let f = new Function(ARGS, event.data);
			f.apply(null, copms);

		}catch (error){
			console.log(error)
		}
			

	}

	render(){
		return (
			<div ref="mountNode"></div>
		)
	}


}