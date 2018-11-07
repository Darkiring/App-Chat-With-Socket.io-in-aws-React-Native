import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native';
import io from 'socket.io-client';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Eso: '',
    };        
    this.socket = io.connect('http://18.223.185.176:8080');  
  }

  componentDidMount() {
    this.socket.on('messages', (data) => {
        console.log(data);
        this.setState({
          Eso: data
        })
      });
  }

  chatRow(props) {
        return (
            <View style={[styles.messageRow, { backgroundColor: '#F9FAFA', flex: 1 }]}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>
                     {props.data.nickname}
                </Text>
                <Text
                    style={[
                        styles.text, {
                            fontSize: 12,
                            paddingTop: 5
                        }]}
                >
                    {props.data.text}
                </Text>
                <Text
                    style={[
                        styles.text,
                        {
                            fontSize: 12,
                            paddingTop: 5,
                            paddingBottom: 5
                        }]}
                >
                </Text>
            </View>
        );
    }

  render() {
    return (
        <View style={[{ flex: 1 }, styles.container]}>
            <ScrollView
                style={styles.flip}
            >
                <FlatList
                    inverted
                    data={this.state.Eso}                
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => 
                        <View
                            style={styles.flip}
                        >
                            <this.chatRow
                                data={item}
                            />
                        </View>
                    }
                />
            </ScrollView>
            <View style={styles.messageView}>
            <TextInput
                    multiline
                    style={{
                        marginTop: 5,
                        height: 45,
                        borderRadius: 6,
                        color: '#000000',
                        fontSize: 14,
                        backgroundColor: '#9CBBF7'
                    }}
                    placeholder='Escribir mensaje'
                    returnKeyType='done'
                />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
     container: {
        backgroundColor: 'white',
    },
    messageRow: {
        paddingTop: 10,
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#F1F2F2'
    },
    text: {
        color: '#3D3D3D',
        fontSize: 16,
        fontWeight: '200'
    },
    messageView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    flip: {
        transform: [{ scaleY: -1 }]
      }
});
