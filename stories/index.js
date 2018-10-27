import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';

import { backgrounds} from './backgrounds';
import Button from '../lib/elements/Button';
import Runic from '../lib/components/Runic';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addDecorator(backgrounds)
  .add('with text', withNotes('Example note on basic button')(() => (
    <Button onClick={action('clicked')}>{text('Child: ', 'Hello Button')}</Button>
  )))
  .add('with some emoji', withNotes('Example note on emoji button')(() => (
    <Button onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  )));

storiesOf('Runic', module)
  .addDecorator(withKnobs)
  .addDecorator(backgrounds)
  .add('no text provided', () => (<Runic />))
  .add('text provided', () => <Runic text={text('Text: ', 'Hey there')} />);
