import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SocketIOClient from 'socket.io-client';

export default class MainSocket extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> MainSocket </Text>
      </View>
    );
  }
}
