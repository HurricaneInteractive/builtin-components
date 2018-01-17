import React, { Component } from 'react'
import classNames from 'classnames'

const close_icon = <svg viewBox="466 407 9 9"><g transform="translate(595.278 64.278)"><path d="M.176.03H1.911V11.023H.176Z" transform="translate(-129.424 344.052) rotate(-45)"/><path d="M0,0H1.736V10.992H0Z" transform="translate(-121.505 342.722) rotate(45)"/></g></svg>;

export default class B_Alert extends Component {
    constructor() {
        super();
        this.closeAlert = this.closeAlert.bind(this);
    }

    closeAlert(e) {
        e.preventDefault();
        const _this = this;
        let closeTimeout = null;
        let parent = e.currentTarget.parentElement;
        parent.classList.add("fadeout");
        
        clearTimeout(closeTimeout);
        closeTimeout = setTimeout(() => {
            parent.style.display = 'none';
            if (typeof _this.props.onClose === 'function') {
                _this.props.onClose();
            }
        }, 260);
    }
    
    render() {
        let { type, positioned, position, hasClose } = this.props;

        let alert_classname = classNames(
            'alert',
            type,
            position,
            {
                'positioned': positioned,
                'has-close': hasClose
            }
        )

        return (
            <div className={alert_classname}>
                { this.props.children }
                { hasClose === true ? <a href="#" className="close-trigger" onClick={(e) => (this.closeAlert(e))}>{close_icon}</a> : '' }
            </div>
        );
    }
}

B_Alert.defaultProps = {
    type: 'default',
    positioned: false,
    position: '',
    hasClose: false
};