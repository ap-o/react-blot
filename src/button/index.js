import React from 'react';
import theme from './theme.css';

import ButtonBase from './Button';
const Button = (props) => <ButtonBase theme={theme} {...props} />;
export { Button };

export default {
  Button
};
