import React, { Component } from 'react'
import { View, Text,TextInput, StyleSheet,Button } from 'react-native'
import { addDeck } from '../utils/api'
import { purple, white,blue } from '../utils/colors'
import { connect } from 'react-redux'

class AddDeck extends Component {
  
    state = {
        title: '',
    }


  addNewDeck = () => {
   const key=this.state.title
   const entry = {
       "title":this.state.title,
       "questions":[]
   }
   addDeck({ entry, key })
  this.props.navigation.navigate(
    'DeckDetail',
    { title: this.state.title}
  )

  }
  

  render() {
    
    return (
      <View>
      <Text style={styles.text}>What is the title of the new deck?</Text>
                <TextInput
                    style={styles.textInput}
                    numberOfLines={1}
                    maxLength={50}
                    placeholder='Enter title for Deck here..'
                    onChangeText={(title) => this.setState({ title:title })}
                    value={this.state.title.toString()} />
                   
                <Button title="Add Deck" onPress={this.addNewDeck} />
                  
          </View>
    )
  }
}


const styles = StyleSheet.create(
  {
    text: {
      fontSize: 26,
      margin: 20,
      color: blue,
      textAlign: 'center',
    },
    textInput: {
      height: 40,
      borderColor: blue,
      borderWidth: 1,
      color: blue,
      paddingLeft: 10,
      paddingRight: 10,
      margin: 10,
      textAlign: 'center',
  },

  }
);




export default AddDeck