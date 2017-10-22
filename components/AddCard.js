import React, { Component } from 'react'
import { View, Text,TextInput, StyleSheet,Button } from 'react-native'
import { addCard } from '../utils/api'
import { purple, white,blue } from '../utils/colors'
import { connect } from 'react-redux'

class AddCard extends Component {
  
    state = {
        question: '',
        answer:'',
    }


  addNewCard = () => {
   const key=this.props.navigation.state.params.title
   const entry = {
       "question":this.state.question,
       "answer":this.state.answer
   }
   addCard({ entry, key })

   let refreshFunc = this.props.navigation.state.params.refresh;

   if(typeof refreshFunc === 'function'){
       refreshFunc();
   }
   else {
       console.log("Not a function:refresh")
   }

   this.props.navigation.goBack();
  }


  
  

  render() {
    
    return (
      <View>
      <Text style={styles.text}>question:</Text>
            <TextInput
                    style={styles.textInput}
                    numberOfLines={1}
                    maxLength={150}
                    placeholder='Enter the question here..'
                    onChangeText={(question) => this.setState({ question:question })}
                    value={this.state.question.toString()} />
            <Text style={styles.text}>Answer:</Text>
            <TextInput
                    style={styles.answerInput}
                    numberOfLines={5}
                    maxLength={500}
                    multiline={true}
                    placeholder='Enter the answer here..'
                    onChangeText={(answer) => this.setState({ answer:answer })}
                    value={this.state.answer.toString()} />
                <Button title="Add card" onPress={this.addNewCard} />
                  
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
  answerInput: {
    height: 100,
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




export default AddCard