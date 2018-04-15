import React from "react";
import "./App.css";
import { Modal, ProgressBar, NameCard, Button, Carousel, Row, Col, CartoonNetworkSpinner, TimePicker, DatePicker, Tab, Tabs} from "./components/";

class App extends React.Component {
	constructor(props, ctx) {
		super(props, ctx);
		this.state = {
			showModal: false,
			time: null,
			time2: null,
			date: null,
			date2: null,
			tab: 1
		};
	}
	render() {
		return (
		<div>
			<h1>Styled components</h1>
			<h5>You need Font awesome in the index.js to run this webapp</h5>
			
			<hr />
			<div>
				<h3>Modal</h3>
				<Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
					<Modal.Title>My Modal Title</Modal.Title>
					<Modal.Body>My Modal Body</Modal.Body>
					<Modal.Footer>My Modal Footer</Modal.Footer>
				</Modal>
				<Button type="warning" onClick={() => this.setState({ showModal: true })}>
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
				<h3>Time Picker</h3>
				<h5>24 hour time picker</h5>
				<TimePicker 
					onTimePick={time => this.setState({time})}
					format = {24}/>
				<p>Selected Time: {this.state.time}</p>
				<h5>12 hour time picker</h5>
				<TimePicker 
					onTimePick={time2 => this.setState({time2})}
					format={12}/>
				<p>Selected Time: {this.state.time2}</p>
			</div>
			<div>
				<h3>Date Picker</h3>
				<h5>Locale is-IS</h5>
				<DatePicker 
					onDatePick={date => this.setState({date})}/>
				<p>Selected Date: {this.state.date}</p>
				<h5>Locale en-EN</h5>
				<DatePicker 
					onDatePick={date2 => this.setState({date2})}
					format={12}/>
				<p>Selected Date: {this.state.date2}</p>
			</div>
			<div>
				<h3>Tabs</h3>
				<h5>Tabs Light Vertical</h5>
					<Tabs
						theme="light"
						layout="vertical"
						onSelect={newTab => this.setState({tab: newTab})}
						currentSelectedTab={this.state.tab}>
						<Tab
							selectionKey={1}
							title="Tab 1">
							Content 1
						</Tab>
						<Tab
							selectionKey={2}
							title="Tab 2">
							Content 2
						</Tab>
						<Tab
							selectionKey={3}
							title="Tab 3">
							Content 3
						</Tab>
					</Tabs>
					<h5>Tabs Dark Horizontal</h5>
					<Tabs
						theme="dark"
						layout="horizontal"
						onSelect={newTab => this.setState({tab: newTab})}
						currentSelectedTab={this.state.tab}>
						<Tab
							selectionKey={1}
							title="Tab 1">
							Content 1
						</Tab>
						<Tab
							selectionKey={2}
							title="Tab 2">
							Content 2
						</Tab>
						<Tab
							selectionKey={3}
							title="Tab 3">
							Content 3
						</Tab>
					</Tabs>
				
			</div>
			<div>
				<h3>Cartoon Network Spinner</h3>
				<p>HEADS UP: The interval time is the time in seconds passed as props:
					 so it is the time the image stands still + the spin animation time = interval time</p>
				<h5>0.5 Second interval</h5>
					<CartoonNetworkSpinner
						interval={0.5} />
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
