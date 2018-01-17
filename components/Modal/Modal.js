import React, { Component, Fragment } from 'react'

const close_icon = <svg viewBox="466 407 9 9"><g transform="translate(595.278 64.278)"><path d="M.176.03H1.911V11.023H.176Z" transform="translate(-129.424 344.052) rotate(-45)"/><path d="M0,0H1.736V10.992H0Z" transform="translate(-121.505 342.722) rotate(45)"/></g></svg>;

export default class B_Modal extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
        this.toggleModalState = this.toggleModalState.bind(this);
    }

    toggleModalState(e) {
        e.preventDefault();
        let container = e.currentTarget.closest('.modal-container'),
            target_modal = container.querySelector('.modal'),
            current_display = target_modal.style.display;

        if (current_display === 'none') {
            target_modal.removeAttribute('style');
            setTimeout(() => {
                this.setState({
                    open: true
                });
            }, 10);
        }
        else {
            let transition = window.getComputedStyle(target_modal, null).getPropertyValue('transition');
            transition = parseFloat(transition.match(/(transform [.\d]*)/g)[0].replace(/[^.\d]/g, '')) * 1000 + 10;
            
            this.setState({
                open: false
            });
            setTimeout(() => {
                target_modal.style.display = 'none';
            }, transition);
        }
    }

    render() {
        return (
            <div className="modal-container">
                <a href="#" className="modal-trigger" onClick={(e) => (this.toggleModalState(e))}>
                    {
                        this.props.buttonText !== null && this.props.buttonText !== '' && typeof this.props.buttonText !== 'undefined' ? (
                            this.props.buttonText
                        ) : (
                            'Show Modal'
                        )
                    }
                </a>
                <div className={`modal-overlay ${ this.state.open === true ? 'active': ''}`} />
                <div className={`modal ${ this.state.open === true ? 'active': ''}`} style={{display: 'none'}}>
                    <div className="modal-header">
                        {this.props.title}
                        <a href="#" className="close-trigger" onClick={(e) => (this.toggleModalState(e))}>{close_icon}</a>
                    </div>
                    <div className="modal-body">
                        { this.props.children }
                    </div>
                    <div className="modal-actions">
                        <a href="#" onClick={(e) => (this.toggleModalState(e))}>Close</a>
                        {
                            this.props.actions !== null && typeof this.props.actions !== 'undefined' ? (
                                this.props.actions.map((action, index) => {
                                    return (<a key={index} href="#" className={action.classnames !== null && action.classnames !== '' ? action.classnames : ''} onClick={ (e) => (action.action(e)) }>{action.title}</a>)
                                })
                            ) : ( '' )
                        }
                    </div>
                </div>
            </div>
        )
    }
}