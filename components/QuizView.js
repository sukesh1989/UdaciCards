import React, { Component } from 'react'
import { View, Text, StyleSheet,Button } from 'react-native'
import { getDeckQuestion } from '../utils/api'
import { purple, white,blue } from '../utils/colors'
import {clearLocalNotification,setLocalNotification} from '../utils/helper'

class QuizView extends Component {
  
    state = {
        showQuestion:0,
        pointerToQuestion:0,
        questionsCount:0,
        questions: '',
        answer:'',
        correctCount:0,
        incorrectCount:0

    }



    componentDidMount(){
        clearLocalNotification()
             .then(setLocalNotification)
        
    getDeckQuestion(this.props.navigation.state.params.title,this.state.pointerToQuestion).then((questions) => this.setState((state) => {
        
    return {
            questionsCount:questions.length,
            question:questions[0].question,
            answer:questions[0].answer,
        questions:questions,
        lastcard:0,
    } }));
  }



  retakeQuiz(obj){
    this.setState((state) => {
        
    return {
            ...state,
            question:state.questions[0].question,
            answer:state.questions[0].answer,
            lastcard:0,
            pointerToQuestion:0,
            correctCount:0,
            incorrectCount:0
    } });
    this.forceUpdate()
  }
  handleEvent(answer) {
    this.setState((state) => {
        const lastcard=(state.pointerToQuestion+1<state.questionsCount)?0:1
        const correct = (answer === 'correct') ? (state.correctCount + 1) : state.correctCount
        const incorrect = (answer === 'incorrect') ? (state.incorrectCount + 1) : state.incorrectCount
        const pointer=state.pointerToQuestion+1<state.questionsCount? (state.pointerToQuestion+1):state.pointerToQuestion
        
        return {
         ...state,
         showQuestion:0,
         correctCount: correct,
         incorrectCount: incorrect,
         pointerToQuestion: pointer,
         question:state.questions[pointer].question,
         answer:state.questions[pointer].answer,
         lastcard:lastcard
       }
     })
  }
  
  switchQtoA(){
      console.log(this.state)
      if(this.state.showQuestion===0){
        this.setState({showQuestion:1})
      }
      else {
        this.setState({showQuestion:0})
      }
      console.log(this.state)
      this.forceUpdate()
  }

  render() {
      const card = this.state.lastcard
   
    return (
        <View>
        
        {card === 1?<View>
<Text style={styles.questionText}>Results:</Text>
<Text style={styles.resultsText}>correct: {this.state.correctCount}</Text>
<Text style={styles.resultsText}>Incorrect: {this.state.incorrectCount}</Text>
<Text style={styles.resultsText}> Percentage: {(this.state.correctCount/this.state.questionsCount*100).toFixed(2)}%</Text>
<Button title="Retake Quiz" onPress={() => this.retakeQuiz(this)} />
<Button title="Back to Deck" onPress={() => this.props.navigation.navigate(
                                    'DeckDetail',
                                    { title: this.props.navigation.state.params.title}
                                  )}/>
   </View>:

            <View>
<Text style={styles.count}>{this.state.pointerToQuestion+1}/{this.state.questionsCount}</Text>
    {
        this.state.showQuestion===1?<View><Text style={styles.questionText}>{this.state.answer}</Text><Button title="Show Question" onPress={()=> this.switchQtoA()}/></View>:<View><Text style={styles.questionText}>{this.state.question}</Text><Button title="Show Answer" onPress={()=> this.switchQtoA()} /></View>
    }
   
   <View style={styles.container}>
    <Button title="Correct" onPress={()=> this.handleEvent("correct")} />
          <Button title="Incorrect" onPress={() =>  this.handleEvent("incorrect")} />

          </View>
</View>

        }
            </View>
    )
  }
}


const styles = StyleSheet.create({
    questionText: {
        marginTop:50,
        color: blue,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '90%'
    },
    container: {
        flex: 1,
        marginTop:30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    count: {
        marginTop:10,
        color: blue,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        width: '90%'
    },
    resultsText: {
        marginTop:10,
        color:purple,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '90%'
    },

});







export default QuizView