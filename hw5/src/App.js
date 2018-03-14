import React from "react";
import "./App.css";
import Modal from "./components/Modal/Modal";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import NameCard from "./components/NameCard/NameCard";
import Button from './components/Button/ButtonCM';
import Carousel from './components/Carousel/Carousel';

class App extends React.Component {
	constructor(props, ctx) {
		super(props, ctx);
		this.state = {
		showModule: false
		};
	}
	render() {
		return (
		<div>
			<h1>Styled components</h1>
			<hr />
			<div>
				<h3>Modal</h3>
				<Modal isOpen={this.state.showModule} onClose={() => this.setState({ showModule: false })}>
					<Modal.Title>My Modal Title</Modal.Title>
					<Modal.Body>My Modal Body</Modal.Body>
					<Modal.Footer>My Modal Footer</Modal.Footer>
				</Modal>
				<Button type="warning" onClick={() => this.setState({ showModule: true })}>
					Open Modal
				</Button>
			</div>
			<div>
				<h3>Progress Bar</h3>
				<ProgressBar 
					progress={50}
					striped={true}
					animated={true}
					state="success"/>
				<ProgressBar 
					progress={75}
					striped={true}
					animated={true}
					state="info"/>
				<ProgressBar 
					progress={10}
					striped={true}
					animated={true}
					state="warning"/>
				<ProgressBar 
					progress={90}
					striped={false}
					animated={true}
					state="danger"/>
			</div>
			<div>
				<h3>Name Card</h3>
				<NameCard 
					name="Skúli Arnarsson"
					email="skulia15@ru.is"
					telephone="8587111"
					imageUrl="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png"/>
			</div>
			<div>
				<h3>Carousel</h3>
				<Carousel 
					images={[
						'http://www.cultjer.com/img/ug_video/2014_old_video/lordoftherings_bluray_hd.jpg',
						'https://s-media-cache-ak0.pinimg.com/originals/d7/f8/5a/d7f85ac3dbb06b2bfc720cf4a87c8cb0.jpg',
						'https://i.pinimg.com/originals/d9/8f/7e/d98f7e2f70ba89f4fa34eef28b3e67a7.jpg',
						'https://i.ytimg.com/vi/eoHfFA8cY7I/maxresdefault.jpg'
					]}
					size="medium"/>
			</div>
		</div>
		);
	}
}

export default App;
