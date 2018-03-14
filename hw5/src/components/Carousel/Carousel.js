import React from 'react';
import PropTypes from 'prop-types';
import styles from './carousel-module.css';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayImage: 0
        };

        this.nextPic = this.nextPic.bind(this);
        this.prevPic = this.prevPic.bind(this);
        
    };

    nextPic(event) {
        this.setState({displayImage: this.state.displayImage + 1});
    }

    prevPic(event) {
        
        this.setState({displayImage: this.state.displayImage - 1});
    }

    render(){
        const { images, size } = this.props;
        return(
            <div>
                <div className= {`${styles[`carousel-${size}`]} ${styles.carousel}` }>
                    <img src={images[this.state.displayImage]} alt="hobbits" className= {`${styles.image}`}/>
                    <div className= {`${styles.arrow} ${styles.arrowleft}`}>
                        <img src="https://relux.com/assets/static//img/carousel_arrow_left.png" 
                        alt="left arrow" className= {`${styles.image}`}
                        onClick={(e) => this.nextPic(e)}/>
                    </div>
                    <div className= {`${styles.arrow} ${styles.arrowright}`}>
                        <img src="https://relux.com/assets/static//img/carousel_arrow_right.png"
                        alt="right arrow" className= {`${styles.image}`}
                        onClick={(e) => this.prevPic(e)}/>
                    </div>
                </div>
            </div>
        )
    };
}

Carousel.propTypes = {
    images: PropTypes.array.isRequired,
    size: PropTypes.string
};

Carousel.defaultProps = {
    isOpen: false
};

export default Carousel;