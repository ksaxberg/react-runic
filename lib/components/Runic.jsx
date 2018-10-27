// @flow
import * as React from 'react';
import '../styles/Runic.css';

import { queryForSvgs, queryForSingleLetterSvgs } from '../svgs/helper.js';


type Props = {
  style: Object,
  text: string,
  size: string,
  compoundLetters?: boolean,
  singleLetters?: boolean,
}

export default class Runic extends React.PureComponent<Props> {
  static defaultProps = {
    style: {},
    size: '14',
    compoundLetters: true,
    singleLetters: false,
  };

  svgStyle = {};

  getQueryFunction = () => {
    if (this.props.singleLetters) {
      return queryForSingleLetterSvgs;
    }
    if (this.props.compoundLetters) {
      return queryForSvgs;
    }
    return queryForSingleLetterSvgs;
  }

  getClassName = () => {
    const baseClass = 'svg-holder';
    if (this.props.size) {
      return `${baseClass} size-${this.props.size}`;
    }
    return baseClass;
  }

  render() {
    const svgQuery = this.getQueryFunction();
    return (
      <div
        style={this.props.style}
        className={this.getClassName()}
      >
        {svgQuery(this.props.text)}
      </div>
    );
  }
}
