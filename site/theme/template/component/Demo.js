import React from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import brace from 'brace';
require('brace/mode/jsx');
require('brace/mode/javascript');
require('brace/theme/github');
require('brace/theme/twilight');


import DemoItem from './DemoItem';
import { transformCode } from '../../utils';


export default class Demo extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      selectDemoIndex: -1,
	      demos: this.sortDemos(props.demos)
	    };


	    this.toggleDemoCard = this.toggleDemoCard.bind(this);
	    this.transform = this.transform.bind(this);

	    
	}

	componentWillReceiveProps(next){
		if(next.params != this.state.params){
			this.setState({
				selectDemoIndex: -1,
				demos: this.sortDemos(next.demos)
			}, () =>{
				this.transform(this.state.demos[0].content);
			})
		}
	}

	componentDidMount(){
		const { demos } = this.state;

		this.transform(demos[0].content);
	}

	sortDemos(demos){

		let arr = Object.keys(demos).map(name => {
			const old = demos[name];
			return {
				name,
				meta: old.meta,
				highlightedCode: old.highlightedCode,
				content: old.content[1][2][1]
			}
			// return {...demos[name], name};
		});

		return arr.sort((a, b) => a.meta.order - b.meta.order);
	}

	transform(contents){
		const { code, err } = transformCode(contents);

		const mount = this.refs.mountNode;
		const args = 'ReactDOM, React, SaltUI, mountNode';
		const argsCmps = [ReactDOM, React, SaltUI, mount];

		if(!err){
			try{
				// let f = new Function(args, code);
				// f.apply(null, argsCmps);

			}catch (error){
				console.log(error)
			}
		}

		
	}

	toggleDemoCard(index){
		const { selectDemoIndex, demos } = this.state;

		if(selectDemoIndex == index){
			this.setState({
				selectDemoIndex: -1,
			});
		}else{
			this.transform(demos[index].content);
			this.setState({
				selectDemoIndex: index,
			});
		}
		// const newIndex = selectDemoIndex == index ? -1 : index;
		
	}

	render(){
		const { selectDemoIndex, demos } = this.state;
		const { params } = this.props;
		const selectDemo = demos[selectDemoIndex > -1 ? selectDemoIndex : 0];
		const isLocalMode = window.location.port;
		const protocol = window.location.protocol;
		const host = isLocalMode ? 'localhost:8004' : window.location.host;
		const demoUrl = isLocalMode 
			? `${protocol}//${host}/demos/${params}/${selectDemo.name}/` 
			: `${protocol}//${host}/mobile/demos/${params}/${selectDemo.name}/`;
			
		return (
			<div className="demo-wrapper">
				<div className="preview-wrapper">
					<div className="preview-header">
						<div className="preview-statbar">
							<img src="https://os.alipayobjects.com/rmsportal/VfVHYcSUxreetec.png" width="350" alt=""/>
						</div>
						<div className="preview-navbar">
			            	<div className="preview-url">{`/demos/${params}/${selectDemo.name}`}</div>
			            </div>
					</div>
					<div className="preview-content">
						<iframe src={demoUrl} />
					</div>
				</div>
				<div className="demo-card-wrap">
					{
						demos.map((demo, i) => 
							<DemoItem 
								key={demo.name} 
								data={demo} 
								index={i} 
								selectIndex={selectDemoIndex}
								toggleCode={this.toggleDemoCard}
								transform={this.transform}
								/>
						)
					}
				</div>
			</div>
		)
	}
}

