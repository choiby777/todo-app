import React from "react"
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform,
  TextInput,
  ScrollView
} from "react-native"
import Todo from "./ToDo"

const { height, width } = Dimensions.get("window")

export default class App extends React.Component {
  state = {
    newTodo: ""
  }

  render() {
    const { newTodo } = this.state

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.titleText}>Todo App</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.inputText}
            underlineColorAndroid="transparent"
            value={newTodo}
            onChangeText={this._controllNewTodo}
            placeholder={"New To Do"}
            placeholderTextColor="#999"
            returnKeyType="done"
            autoCorrect={false}
          />
          <ScrollView>
            <Todo itemText="1" />
            <Todo itemText="2" />
            <Todo itemText="3" />
          </ScrollView>
        </View>
      </View>
    )
  }

  _controllNewTodo = text => {
    this.setState({
      newTodo: text
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff7777",
    alignItems: "center"
    //justifyContent: 'center',
  },

  titleText: {
    color: "white",
    fontSize: 30,
    fontWeight: "500",
    marginTop: 50
  },

  card: {
    flex: 1,
    backgroundColor: "#ffffca",
    width: width - 30,
    //borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //elevation: 10
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shdowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },

  inputText: {
    fontSize: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    padding: 25
  }
})
