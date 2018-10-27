// @flow
import * as React from 'react';
import '../styles/Runic.css';

import getSvg, { queryForSvgs } from '../svgs/helper.js';


type Props = {
  text: string,
}

/* eslint-disable */
export default class Runic extends React.PureComponent<Props> {
  static defaultProps = {
    text: 'Add Text'
  };

  render() {
    return (
      <div>
        From: '{this.props.text}' to: 
        <div className="svg-holder">{queryForSvgs(this.props.text)}</div>
      </div>
    );
  }
}

/* eslint-enable */
