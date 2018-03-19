import React from "react";
import "./App.css";
import { Modal, ProgressBar, NameCard, Button, Carousel, Row, Col, CartoonNetworkSpinner} from "./components/";

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
				<h5>Success, Striped and animated</h5>
				<ProgressBar 
					progress={50}
					striped={true}
					animated={true}
					state="success"/>
				<h5>Info, Striped</h5>
				<ProgressBar 
					progress={75}
					striped={true}
					animated={false}
					state="info"/>
				<h5>Warning</h5>
				<ProgressBar 
					progress={25}
					striped={false}
					animated={false}
					state="warning"/>
				<h5>Danger, just animated?</h5>
				<ProgressBar 
					progress={90}
					striped={false}
					animated={true}
					state="danger"/>
			</div>
			<div>
				<h3>Name Card</h3>
				<NameCard 
					name="Sméagol"
					email="Sméa_cool@hotmail.com"
					telephone="58-12345"
					imageUrl="https://vignette.wikia.nocookie.net/lotr/images/7/79/Smeagol.jpeg/revision/latest?cb=20130201224335"/>
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
			<div>
				<h3>Row / Col</h3>
				<h5>3 cols of size 4</h5>
				<Row>
					<Col size={4}></Col>
					<Col size={4}></Col>
					<Col size={4}></Col>
				</Row>
				<h5>2 cols of size 6 + overflow size 4</h5>
				<Row>
					<Col size={6}></Col>
					<Col size={6}></Col>
					<Col size={4}></Col>
				</Row>
				<h5>12 cols of size 1 + overflow size 4</h5>
				<Row>
					<Col size={1}></Col>
					<Col size={1}></Col>
					<Col size={1}></Col>
					<Col size={1}></Col>
					<Col size={1}></Col>
					<Col size={1}></Col>
					<Col size={1}></Col>
					<Col size={1}></Col>
					<Col size={1}></Col>
					<Col size={1}></Col>
					<Col size={1}></Col>
					<Col size={1}></Col>
					<Col size={4}></Col>
				</Row>
			</div>
			<div>
				<h3>Cartoon Network Spinner</h3>
				<h5>2 Second interval</h5>
					<CartoonNetworkSpinner
						interval={2} />
				<h5>4 Second interval</h5>
					<CartoonNetworkSpinner
						interval={4} />

			</div>
		</div>
		);
	}
}

export default App;
