import React, { Component } from 'react'
import { View, Text,StyleSheet,Dimensions } from 'react-native'
import {blue,lightPurp} from '../utils/colors'


class Deck extends Component {
    



    

    render() {

        return (
            <View style={styles.card}>
            <Text style={styles.titleText} >{this.props.title} </Text>
            <Text style={styles.noOfCardsText}>{this.props.noOfCards} cards</Text>
            </View>
          
        )

    }

}
const win = Dimensions.get('window');
const styles=StyleSheet.create({
    card:{
        height:150,
        borderColor: 'black',
        borderWidth: 1,
        width: win.width,
        marginTop:2,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: blue,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '90%'
    },
    noOfCardsText: {
        color: lightPurp,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '90%'
    }

}

);

export default Deck
