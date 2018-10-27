import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, text, object } from '@storybook/addon-knobs/react';

import { backgrounds} from './backgrounds';
import Runic from '../lib/components/Runic';

storiesOf('Runic', module)
  .addDecorator(withKnobs)
  .addDecorator(backgrounds)
  .add('no text provided', () => (<Runic />))
  .add('text provided', () => <Runic style={object('Style', {})} text={text('Text: ', 'Hey there')} />);
