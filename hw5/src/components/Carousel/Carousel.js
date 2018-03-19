import React from 'react';
import PropTypes from 'prop-types';
import styles from './carousel-module.css';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayImage: 0,
            imagesLength: 1,
            hasNextImage: true,
            hasPrevImage: false
        };

        this.nextPic = this.nextPic.bind(this);
        this.prevPic = this.prevPic.bind(this);
    };
    componentWillMount(){
        const { images } = this.props;
        this.setState({imagesLength: images.length});
    }

    nextPic() {
        if(this.state.imagesLength - 1 > this.state.displayImage){
            this.setState({displayImage: this.state.displayImage + 1});
            this.setState({hasPrevImage: true});
        }
        else{
            this.setState({hasNextImage: false});
        }
    }

    prevPic() {
        if(this.state.displayImage > 0){
            this.setState({displayImage: this.state.displayImage - 1});
            this.setState({hasNextImage: true});
        }
        else{
            this.setState({hasPrevImage: false});
        }
    }

    renderArrowRight(){
        if(this.state.hasPrevImage){
            return(
                <div className= {`${styles.arrow} ${styles.arrowright}`}>
                    <img src="https://relux.com/assets/static//img/carousel_arrow_right.png"
                    alt="right arrow" className= {`${styles.image}`}
                    onClick={() => this.prevPic()}/>
                </div>
            );
        }
    }

    renderArrowLeft(){
        if(this.state.hasNextImage){
            return(
                <div className= {`${styles.arrow} ${styles.arrowleft}`}>
                    <img src="https://relux.com/assets/static//img/carousel_arrow_left.png" 
                    alt="left arrow" className= {`${styles.image}`}
                    onClick={() => this.nextPic()}/>
                </div>
            );
        }
    }

    render(){
        const { images, size } = this.props;
        return(
            <div>
                <div className= {`${styles[`carousel-${size}`]} ${styles.carousel}` }>
                    <img src={images[this.state.displayImage]} alt="hobbits" className= {`${styles.image}`}/>
                    {this.renderArrowRight()}
                    {this.renderArrowLeft()}
                </div>
            </div>
        )
    };
}

Carousel.propTypes = {
    images: PropTypes.array.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Carousel.defaultProps = {
    size: "medium"
};

export default Carousel;