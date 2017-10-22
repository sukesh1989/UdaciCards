import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'UdaciCards:deck'

export function addDeck ({ entry, key }) {
    console.log(key)
    console.log(entry)
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeDeck (key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function getAllDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        return data;
      })  
}
export function getDeckCardCount(key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then((results) => {
      const data = JSON.parse(results)
      
      return data[key].questions.length;
    })  
}

export function addCard ({ entry, key }) {
  console.log(key)
  console.log(entry)
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then((results) => {
      const data = JSON.parse(results)
      const dataQuestions = data[key].questions
      dataQuestions.push(entry)
      AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })  
}

export function getDeckQuestion(key) {

  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then((results) => {
      const data = JSON.parse(results)
      return data[key].questions;
    })  
}