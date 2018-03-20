import React from 'react';
import PropTypes from 'prop-types';
import styles from './spinner-module.css';

class CartoonNetworkSpinner extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentImageIndex: 0,
            cartoons: [ 'https://static.giantbomb.com/uploads/square_small/0/5768/677984-mojo.jpg',
                        'https://static.giantbomb.com/uploads/square_small/13/135472/2250210-lumpy_space.png',
                        'https://static.giantbomb.com/uploads/square_small/13/135472/2423600-earl.png',
                        'https://static.giantbomb.com/uploads/square_small/8/82962/1750388-rainicorn.jpg',
                        'https://static.giantbomb.com/uploads/square_small/2/23298/970826-johnnybravo19.gif',
                        'https://static.giantbomb.com/uploads/square_small/8/82962/1549898-200px_ice_king.png',
                        'https://static.giantbomb.com/uploads/square_small/13/135472/2369847-flameprincess.png',
                        'https://static.giantbomb.com/uploads/square_small/1/19745/700796-dexter.gif',
                        'https://static.giantbomb.com/uploads/square_small/1/19745/700798-tgrsp535.gif',
                        'https://static.giantbomb.com/uploads/square_small/8/82962/1987678-courage.png',
                        'https://static.giantbomb.com/uploads/square_small/0/5768/670160-buttercup.jpg',
                        'https://static.giantbomb.com/uploads/square_small/0/5768/670162-bubbles.jpg',
                        'https://static.giantbomb.com/uploads/square_small/13/135472/2330558-bmo.png',
                        'https://static.giantbomb.com/uploads/square_small/0/5768/670158-blossum.jpg',
                        'https://static.giantbomb.com/uploads/square_small/0/5768/615247-billy.jpg',
                        'https://static.giantbomb.com/uploads/square_small/0/5768/641378-aku.jpg',
                        'https://static.giantbomb.com/uploads/square_small/0/521/1192556-untitled.jpg',
                        'https://vignette.wikia.nocookie.net/cowandchicken/images/e/e2/Cow_300-1-.gif/revision/latest?cb=20110331122902'],
            animate: true,
            changePic: false
        }
        this.tick = this.tick.bind(this);
    }

    // https://stackoverflow.com/questions/38387822/how-to-rotate-img-source-at-interval-in-a-react-component
    componentDidMount(){
        this.interval = setInterval(this.tick, (this.props.interval / 2) * 1000);
    }
    
    tick(){
        if(this.state.changePic){
            if(this.state.cartoons.length - 1 === this.state.currentImageIndex){
                this.setState({currentImageIndex: 0});
            }
            else{
                this.setState({currentImageIndex: this.state.currentImageIndex + 1});
            }
        }
        this.setState({changePic: !this.state.changePic});
        this.setState({animate: !this.state.animate});
        // this.interval = setInterval(this.tick, this.props.interval * 1000);
    }

    render(){
        return(
            <div className= {` ${styles.spinner} ${ this.state.animate ? `${styles.spinAnimation}` : '' } ` } style={{ backgroundImage: `url(${this.state.cartoons[this.state.currentImageIndex]})` }}/>
        )
    }
};

CartoonNetworkSpinner.propTypes = {
    interval: PropTypes.number
};

CartoonNetworkSpinner.defaultProps = {
    interval: 3
};

export default CartoonNetworkSpinner;
