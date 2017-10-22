import React, { Component } from 'react'
import { View, Text,Button, StyleSheet } from 'react-native'
import {blue,lightPurp} from '../utils/colors'
import {getDeckCardCount} from '../utils/api'


class DeckDetail extends Component {
    state ={
        deckcount:-1,
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: ` ${navigation.state.params.title}`,
      });


      componentDidMount() {
        getDeckCardCount(this.props.navigation.state.params.title).then((deckcount) => this.setState({ deckcount }))
        
      }
      refreshFunction = () => {
        //do refresh
        this.setState((state) => {
            const deckcount = state.deckcount+1
            return {
             ...state,
             deckcount:deckcount
           }
         })

         let refreshFunc = this.props.navigation.state.params.refresh;
         
            if(typeof refreshFunc === 'function'){
                refreshFunc();
            }
            else {
                console.log("Not a function:refresh")
            }
     }
     

 

    render() {
        
        const { params } = this.props.navigation.state;
    return (
        
        <View>
            <Text style={styles.titleText}>{params.title}</Text>
            <Text style={styles.noOfCardsText}>{this.state.deckcount} cards</Text>
           <View style={styles.container}>
            <Button title="Add Card" onPress={() => this.props.navigation.navigate(
                                    'AddCard',
                                    { title: params.title, refresh: this.refreshFunction} 
                                  )} />
            { this.state.deckcount>0? 

            <Button title="Start Quiz" onPress={() => this.props.navigation.navigate(
                                    'QuizView',
                                    { title: params.title, refresh: this.refreshFunction} 
                                  )} />: <Text> </Text>
                                }
            </View>
         </View>
    )
    }

}



const styles=StyleSheet.create({
    
    titleText: {
        marginTop:50,
        color: blue,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '90%'
    },
    noOfCardsText: {
        marginTop:10,
        color: lightPurp,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '90%'
    },
    container: {
        flex: 1,
        marginTop:30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }

});

export default DeckDetail
