import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform,
  TextInput,
  ScrollView
} from "react-native";
import { AppLoading } from "expo";
import Todo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newTodo: "",
    isLoadedTodos: false
  };

  componentDidMount = () => {
    this._loadTodos();
  };

  _loadTodos = () => {
    this.setState({
      isLoadedTodos: true
    });
  };

  render() {
    const { newTodo, isLoadedTodos } = this.state;

    if (!isLoadedTodos) {
      return <AppLoading />;
    }

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
            onSubmitEditing={this._addTodo}
          />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.toDos}
          >
            <Todo todoValue={"강의 확인 하기"} />
            <Todo todoValue={"과제하기"} />
            <Todo todoValue={"시험 준비 하기"} />
          </ScrollView>
        </View>
      </View>
    );
  }

  _controllNewTodo = text => {
    this.setState({
      newTodo: text
    });
  };

  _addTodo = () => {
    this._clearNewTodo();
  };

  _clearNewTodo = () => {
    const { newTodo } = this.state;
    if (newTodo != "") {
      this.setState({
        newTodo: ""
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff7777",
    alignItems: "center"
    //justifyContent: 'center',
  },
  scrollView: {
    marginLeft: 20,
    marginRight: 20
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
});
