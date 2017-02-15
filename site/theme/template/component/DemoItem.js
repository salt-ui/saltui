import React from 'react';
import classnames from 'classnames';
import AceEditor from 'react-ace';
import Message from 'uxcore-message';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class DemoItem extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	// expand: false
    	expand: props.selectIndex === props.index
    }

    this.toggleCode = this.toggleCode.bind(this);
	}


	onChangeValue(newValue){
		this.props.transform(newValue);
	}

	toggleCode(e){
		this.setState({
			expand: !this.state.expand
		})
	}
	

	render(){
		const { data, selectIndex, index, toggleCode, showExpandDemo, toggleFrame } = this.props;
		const { expand } = this.state;

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
	          'demo-selected': selectIndex == index
	        })}
				onClick={e => toggleFrame(index)}
	      >
				<h3 className="title">{data.meta.title}</h3>
				<CopyToClipboard 
					text={data.content}
					onCopy={() => Message.info('复制成功！')}
					>
					<span className="demo-btn copy-btn">
					<i className='iconfont icon-copy'/>
					</span>
				</CopyToClipboard>
				<span className="demo-btn expand-btn">
					<i className='iconfont icon-expand' onClick={e => showExpandDemo({ title: data.name, content: data.highlightedCode})}/>
				</span>
				<span className="demo-btn toggle-btn" onClick={e => this.toggleCode()}>

					<i className={classnames('iconfont', {
              'icon-arrow-up': expand,
              'icon-arrow-down': !expand,
            })} />
        </span>
          {expand && <AceEditor {...paneProps} />}
          <input type="text" ref="content" style={{ display:'none'}} value={data.content}/>
			</div>
		)
	}
}