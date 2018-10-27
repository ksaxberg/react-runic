// @flow
import * as React from 'react';
import '../styles/Runic.css';

import { queryForSvgs } from '../svgs/helper.js';


type Props = {
  text: string,
}

export default class Runic extends React.PureComponent<Props> {
  static defaultProps = {
    style: {},
  };

  render() {
    return (
      <div style={this.props.style} className="svg-holder">{queryForSvgs(this.props.text)}</div>
    );
  }
}
