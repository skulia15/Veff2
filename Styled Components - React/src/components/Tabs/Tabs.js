import React from 'react';
import PropTypes from 'prop-types';
import styles from './tabs-module.css';

//https://github.com/DefinitelyTyped/DefinitelyTyped/issues/12267

class Tabs extends React.Component{
    render(){
        const { theme, layout, onSelect, currentSelectedTab, children} = this.props;
        return(
            <div className={`${styles[`tabWrapper-${layout}`]} ${styles[`tabs-${theme}`]}`}>
                <div className={`${styles.tabBarWrapper}`}> {/* Tabs */}
                    {React.Children.map(children, (el) => 
                        <div className={`${styles.tab} ${styles[`tab-${theme}`]}  ${ el.props.selectionKey === currentSelectedTab  ? `${styles[`selectedTab-${theme}`]}` : '' }`}
                            onClick={() => {onSelect(el.props.selectionKey)}}>
                            {el.props.title}
                        </div>
                    )}
                </div>
                <div className={`${styles.tabContent}`}> {/* Tab Content */}
                    { children[currentSelectedTab - 1].props.children }
                </div>
            </div>
        );
    }
}

Tabs.propTypes = {
    theme: PropTypes.oneOf(['dark', 'light']),
    layout: PropTypes.oneOf(['horizontal', 'vertical']),
    onSelect: PropTypes.func.isRequired,
    currentSelectedTab: PropTypes.number.isRequired
};

Tabs.defaultProps = {
    theme: 'light',
    layout: 'horizontal'
};


export default Tabs;