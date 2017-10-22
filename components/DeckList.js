import React, { Component } from 'react'
import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import { getAllDecks } from '../utils/api'
import  Deck from './Deck'

class DeckList extends Component {
  
  state = {
    decks: '',
    count: 0
  }

  componentDidMount() {
    getAllDecks().then((decks) => this.setState({ decks }))
    
  }

  

  refreshFunction = () => {
    //do refresh
    const count = this.state.count+1
    this.setState({count:count})
    this.forceUpdate()
  
 }
  
 
  render() {

     const datasource = Object.keys(this.state.decks).map(deck => ({
       title: deck,
      countOfCards: this.state.decks[deck].questions.length,
   }));
  
    return (
      
      <View>

              <FlatList style={{backgroundColor:'white',}} 
              removeClippedSubviews={false}
                    data={datasource}
                    extraData={this.state.decks}
                    keyExtractor={data => data.title}
                    renderItem={({ item }) => (
                    <TouchableOpacity key={item.title} onPress={() => this.props.navigation.navigate(
                                    'DeckDetail',
                                    { title: item.title,refresh: this.refreshFunction }
                                  )}>
                        <Deck title={item.title} noOfCards={item.countOfCards}/>
                    </TouchableOpacity>
                    )}
                />
          </View>
    )
  }
}



export default DeckList
//onPress={this.props.navigation.navigate('DeckDetail') }