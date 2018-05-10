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
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newTodo: "",
    isLoadedTodos: false,
    toDos: {}
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
    const { newTodo, isLoadedTodos, toDos } = this.state;
    console.log(toDos);
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
            onSubmitEditing={this._addTodo} // 입력완료시 이벤트
          />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.toDos}
          >
            {/* <Todo todoValue={"강의 확인 하기"} />
            <Todo todoValue={"과제하기"} />
            <Todo todoValue={"시험 준비 하기"} /> */}
            {Object.values(toDos).map(toDo => <ToDo key={toDo.id} {...toDo} deleteTodo = {this._deleteTodo}/>)}
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

  _deleteTodo = (id) => {
    this.setState(prevState =>{
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      
      return { ...newState}
    });
  }

  _addTodo = () => {
    const { newTodo } = this.state;
    if (newTodo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newTodoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newTodo: "",
          toDos: {
            ...prevState.toDos,
            ...newTodoObject
          }
        };
        return { ...newState };
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
