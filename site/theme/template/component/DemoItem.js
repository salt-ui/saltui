import React from 'react';
import classnames from 'classnames';
import AceEditor from 'react-ace';

export default class DemoItem extends React.Component {
	constructor(props) {
	    super(props);
	    
	}


	onChangeValue(newValue){
		this.props.transform(newValue);
	}

	render(){
		const { data, selectIndex, index, toggleCode } = this.props;
		const expand = selectIndex === index;

		const paneProps = {
			theme: 'github',
			mode:'jsx',
			width: "100%",
			height: "300px",
			name: "UNIQUE_ID_OF_DIV",
			editorProps: {$blockScrolling: true},
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true,
			value: data.content,
			onChange: this.onChangeValue.bind(this)
		}
		return(
			<div className={classnames('demo-card', {
	          'demo-expand': expand,
	        })}>
				<h3 className="title">{data.meta.title}</h3>
				<span className="toggle-btn" onClick={e => toggleCode(index)}>
					<i className={classnames('alifont', {
		              'icon-arrow-up': expand,
		              'icon-arrow-down': !expand,
		            })} />
	            </span>
	            {expand && <AceEditor {...paneProps} />}
			</div>
		)
	}
}