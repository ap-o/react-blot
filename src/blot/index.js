import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import update from 'immutability-helper';

import { TransitionGroup, Transition, CSSTransition } from 'react-transition-group'
import { max, delay } from 'lodash';
import theme from './theme.css';

export default function(ComposedComponent) {
  class BlotHoc extends Component {

    static propTypes = {
      float : PropTypes.bool,
      blot  : PropTypes.bool,
      theme : PropTypes.shape({
        blot : PropTypes.string,
        blotwrap : PropTypes.string,
      }),
    }

    static defaultProps = {
      blotColor   : '#000000',
      blotOpacity : 0.1,
      blot        : true,
      float       : false,
      theme       : {}
    }

    state = {
      mousedown : false,
      blots     : {}
    }

    mouseEvents = () => {
      return {
        onMouseDown  : this.onMouseDown,
        onMouseUp    : this.onMouseUp,
        onMouseLeave : this.onMouseLeave
      };
    }

    onMouseDown = (event) => {
      if (this.props.onMouseDown) this.props.onMouseDown(event);

      if (!this.props.blot) return;

      const blotDesc = this.getBlotDescriptor(event);
      const blotKey = `blot_${Date.now()}`;

      this.createBlot(blotKey, blotDesc);
    };

    onMouseUp = (event) => {
      if (this.props.onMouseUp) this.props.onMouseUp(event);

      if (!this.props.blot) return;

      console.log('yay');

      this.setState(update(this.state, {
        mousedown : { $set : false }
      }));

      setTimeout(() => {
        this.deactivateBlots();
      }, 0);

    };

    onMouseLeave = (event) => {
      if (this.props.onMouseLeave) this.props.onMouseLeave(event);

      if (!this.props.blot) return;

      if(!this.state.mousedown)
        return;

      this.setState(update(this.state, {
        mousedown : { $set : false }
      }));

      setTimeout(() => {
        this.deactivateBlots();
      }, 0);

    };

    getBlotDescriptor = (event) => {

      const {
        left,
        top,
        height,
        width
      } = ReactDOM.findDOMNode(this).getBoundingClientRect();

      const {
        float
      } = this.props;

      const x = event.clientX;
      const y = event.clientY;

      // left/top relative to the element
      const rel_left = x - left;
      const rel_top = y - top;

      let blot_radius = width;

      if ( float) {

        // element's horizontal and vertical center
        const h_center = width*0.5;
        const v_center = height*0.5;

        // event horizontal and vertical distance from element center
        const h_distance_center = Math.abs(h_center - rel_left);
        const v_distance_center = Math.abs(v_center - rel_top);

        // use hypoteneuse
        const distance_center = Math.sqrt(Math.pow(h_distance_center, 2) + Math.pow(v_distance_center, 2));

        // find circle diagonal
        const radius = width * 0.5;

        // blot size equals circle radius
        blot_radius = radius + distance_center;

      } else {

        const half_width = width * 0.5;
        const half_height = height * 0.5;

        const edge_x = (rel_left < half_width ? 1 : 0) * width;
        const edge_y = (rel_top < half_height ? 1 : 0) * height;

        const distange_from_edge = Math.sqrt(Math.pow((edge_x - rel_left), 2) + Math.pow((edge_y - rel_top), 2));

        blot_radius = distange_from_edge;
      }

      const blot_size = blot_radius * 2;

      return {
        left   : rel_left,
        top    : rel_top,
        size   : blot_size
      };
    }

    createBlot (key, { left, top, size }) {
      this.setState(update(this.state, {
        mousedown : { $set : true },
        blots : { $merge : {
          [key] : { active : true, entered: false, left, top, size }
        }}
      }));
    }

    setEntered(key) {
      this.setState(update(this.state, {
        blots : {
          [key] : {
            entered: {$set: true}
          }
        }
      }));
    }

    deactivateBlots() {
      const { blots } = this.state;
      Object.keys(blots).map((key, i) => {
        if (blots[key].entered) {
          this.deactivateBlot(key);
        }
      });
    }

    deactivateBlot(key) {
      this.setState(update(this.state, {
        blots : {
          [key] : {
            active: {$set: false}
          }
        }
      }));
    }

    removeBlot(key) {
      this.setState(update(this.state, {
        blots : { $unset : [key] }
      }));
    }

    removeAllBlot(key) {
      this.setState(update(this.state, {
        blots : { $unset : [key] }
      }));
    }

    renderBlotsGroup () {
      const { blots } = this.state;

      const classes = classnames(theme.blots, this.props.theme.blots);

      return (
        <div className={classes}>
          { Object.keys(blots).map((key, i) => (
            this.renderBlot(key, blots[key])
          )) }
        </div>
       );
    }

    renderBlot = (key,  { active, left, top, size }) => {

      const {
        blotColor,
        blotOpacity
      } = this.props;

      const defaultStyle = {
        backgroundColor: `${blotColor}`,
        left: `${(left-(size*0.5))}px`,
        top: `${(top-(size*0.5))}px`,
        width: `${size}px`,
        height: `${size}px`
      }

      const transitionStyles = {
        enter: {
          opacity: 0,
          transform: 'scale(0)'
        },
        entering: {
          opacity: 0,
          transform: 'scale(0)'
        },
        entered: {
          opacity: blotOpacity,
          transform: 'scale(1)'
        },
        exiting: {
          opacity: 0,
          transform: 'scale(1)'
        }
      };

      const classes = classnames(theme.blot, this.props.theme.blot);

      return (
        <Transition
          key={key}
          in={active}
          appear={true}
          enter={true}
          exit={true}
          mountOnEnter
          unmountOnExit
          timeout={{
            enter: 1,
            exit: 600
          }}
          onEntered={() => {
            delay(() => {
              this.state.mousedown ? this.setEntered(key) : this.deactivateBlot(key);
            }, 600)
          }}
          onExited={() => {
            this.removeBlot(key);
          }}
        >
          {(state) => {
            return (
              <span className={classes} style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }} />
            );
          }}
        </Transition>
      );
    }

    render() {
      const {
        blotColor,
        blotOpacity,
        blot,
        ...rest
      } = this.props;

      let blots = null;
      if (blot) {
        blots = this.renderBlotsGroup();
      }
      const mouseEvents = this.mouseEvents();

      const composedProps = {
        blots,
        ...mouseEvents,
        ...rest
      };

      return (
        <ComposedComponent {...composedProps} />
      )

    }
  }

  return BlotHoc
}
