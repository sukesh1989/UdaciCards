import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator,StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'
import DeckDetail from './components/DeckDetail'
import { purple, white,blue } from './utils/colors'
import { Entypo } from '@expo/vector-icons'
import { Constants } from 'expo';
import { setLocalNotification } from './utils/helper'


const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Entypo name='list' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})




const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})






export default class App extends React.Component {

  componentDidMount() {
        setLocalNotification()
      }
  render() {
    return (
     
      <View style={{flex: 1}}>
        <View style={styles.statusBar} />
        <MainNavigator />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: blue,
    height: Constants.statusBarHeight,
  },
});