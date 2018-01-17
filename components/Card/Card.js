import React, { Component, Children, Fragment } from 'react'
import classNames from 'classnames'

const toggle_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="465.004 406.004 10.992 10.992"><g transform="translate(804.254 254.209) rotate(45)"><path d="M.176.03H1.911V11.023H.176Z" transform="translate(-129.424 344.052) rotate(-45)"/><path d="M0,0H1.736V10.992H0Z" transform="translate(-121.505 342.722) rotate(45)"/></g></svg>;

export const Card_Header = (props) => {
    let { title, image, flush, collapsable } = props;

    let header_classes = classNames('card-header', {
        'image': image != null,
        'flush': flush,
        'collapsable': collapsable
    });

    let background_style = image !== null && typeof image !== 'undefined' ? {backgroundImage: `url(${image})`} : {};

    const collapse_body = (e) => {
        e.preventDefault();
        var target = e.currentTarget;
        if (!target.classList.contains('disabled')) {
            target.classList.add('disabled');
            
            let body = target.parentElement.querySelector('.card-body');

            if (body === null || typeof body === 'undefined') {
                target.classList.remove('disabled');
                return false;
            }

            let transition = window.getComputedStyle(body, null).getPropertyValue('transition');
            
            // Get transition value - matches value in css
            transition = parseFloat(transition.match(/(height [.\d]*)/g)[0].replace(/[^.\d]/g, '')) * 1000 + 10;
            
            // Longer method:
            // transition = transition.replace(/[^.\w\d]/g, '');
            // transition = transition.match(/height[.\d]*/g)[0];
            // transition = parseFloat(transition.match(/[.\d]/g).join('')) * 1000 + 10;

            if (body.classList.contains('collapsed')) {
                body.style.display = 'block';
                setTimeout(() => {
                    body.classList.remove('collapsed');
                    setTimeout(() => {
                        body.removeAttribute('style');
                        target.classList.remove('closed');
                        target.classList.remove('disabled');
                    }, transition);
                }, 10);
            }
            else {
                let total_height = body.clientHeight,
                    paddingTop = parseInt(window.getComputedStyle(body, null).getPropertyValue('padding-top')),
                    paddingBottom = parseInt(window.getComputedStyle(body, null).getPropertyValue('padding-bottom'));

                total_height = total_height - paddingTop - paddingBottom;

                body.style.height = total_height + 'px';
                setTimeout(() => {
                    body.classList.add('collapsed');
                    setTimeout(() => {
                        body.style.display = 'none';
                        target.classList.add('closed');
                        target.classList.remove('disabled');
                    }, transition);
                }, 10);
            }
        }
    }

    return (
        <div className={header_classes} style={background_style} onClick={ collapsable === true ? (e) => (collapse_body(e)) : null }>
             { title !== null && title !== '' ? <p className="card-title">{title}</p> : '' }
             { collapsable === true ? <div className="collapse-icon">{toggle_icon}</div> : '' }
        </div>
    )
}

export const Card_Body = (props) => {
    return (
        <div className="card-body">
            { props.children }
        </div>
    )
}

export default class B_Card extends Component {
    constructor() {
        super();
    }

    render() {
        let { title, template, collapsable } = this.props;
        let child_count = Children.count(this.props.children);

        return (
            <div className="card">
                {
                    template === 'basic' ? (
                        <Fragment>
                            <Card_Header title={title} collapsable={collapsable} />
                            { child_count !== 0 ? <Card_Body>{this.props.children}</Card_Body> : '' }
                        </Fragment>
                    ) : (
                        this.props.children
                    )
                }
            </div>
        )
    }
}

B_Card.defaultProps = {
    title: '',
    template: 'basic',
    collapsable: false
}