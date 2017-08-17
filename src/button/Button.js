import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Blot from '../blot';

class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    blots: PropTypes.node,
    float: PropTypes.bool,
    type: PropTypes.string,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseLeave: PropTypes.func,
    theme: PropTypes.object,
  };

  static defaultProps = {
    type  : 'button',
    blots : null
  };

  render() {
    const {
      children,
      blots,
      className,
      theme,
      type,
      float,
      onMouseDown,
      onMouseLeave,
      onMouseUp
    } = this.props;

    const classes = classnames(className, theme.button, {
      [theme.float] : float
    });

    return (
      <button
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        className={classes}
        type={type}
      >{blots}{children}</button>
    );
  }
}

export default Blot(Button);
