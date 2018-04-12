import React, { Component, Fragment } from 'react'

export default class Tooltip extends Component {
    render() {
        return (
            <span className={`popup ${this.props.position}`}>{this.props.children}</span>
        )
    }
}

Tooltip.defaultProps = {
    position: 'top'
};