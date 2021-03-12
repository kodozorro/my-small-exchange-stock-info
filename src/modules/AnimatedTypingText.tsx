import React, {Component} from 'react';

import {View, Text} from 'react-native';

interface IOwnProps {
  text: string;
  TextColor: string;
  AnimatedTextSize: 25;
  AnimatedTypingDuration: number;
  AnimatedBlinkingCursorDuration: number;
}

export class AnimatedTypingText extends Component<IOwnProps> {
  public static defaultProps = {
    text: 'Default Animated Typing Text.',
    TextColor: '#00E676',
    AnimatedTextSize: 25,
    AnimatedTypingDuration: 60,
    AnimatedBlinkingCursorDuration: 200,
  };

  index = 0;

  timer = -1;

  blinking_cursor = -1;

  state = {
    text: '',

    cursor_color: 'transparent',
  };

  StartAnimatedTyping = () => {
    clearTimeout(this.timer);

    this.timer = -1;

    if (this.index < this.props.text.length) {
      if (this.refs.animatedText) {
        this.setState(
          {text: this.state.text + this.props.text.charAt(this.index)},
          () => {
            this.index++;

            this.timer = setTimeout(() => {
              this.StartAnimatedTyping();
            }, this.props.AnimatedTypingDuration);
          },
        );
      }
    }
  };

  AnimatedblinkingCursor = () => {
    this.blinking_cursor = setInterval(() => {
      if (this.refs.animatedText) {
        if (this.state.cursor_color == 'transparent') {
          this.setState({cursor_color: this.props.TextColor});
        } else {
          this.setState({cursor_color: 'transparent'});
        }
      }
    }, this.props.AnimatedBlinkingCursorDuration);
  };

  componentDidMount() {
    this.StartAnimatedTyping();

    this.AnimatedblinkingCursor();
  }

  componentWillUnmout() {
    clearTimeout(this.timer);

    this.timer = -1;

    clearInterval(this.blinking_cursor);

    this.blinking_cursor = -1;
  }

  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <Text
          ref="animatedText"
          style={{
            color: this.props.TextColor,
            fontSize: this.props.AnimatedTextSize,
            textAlign: 'center',
          }}>
          {this.state.text}

          <Text style={{color: this.state.cursor_color}}>|</Text>
        </Text>
      </View>
    );
  }
}
