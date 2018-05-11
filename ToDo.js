import React, { Component } from "react";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput
} from "react-native";
import { PropTypes } from "prop-types";
const { height, width } = Dimensions.get("window");

export default class ToDo extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isCompleted: false,
      todoValue: props.text
    };
  }

  render() {
    const { isCompleted, isEditing } = this.state;
    const { text, id, deleteTodo } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.contant}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.ucCompletedCircle
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.textInput,
                styles.itemText,
                isCompleted ? styles.completedText : styles.unCompletedText
              ]}
              value={text}
              multiline={true}
              onChangeText={this._controllInput}
              returnKeyType={"done"}
              onBlur={this._endEditing}
            />
          ) : (
            <Text
              style={[
                styles.itemText,
                isCompleted ? styles.completedText : styles.unCompletedText
              ]}
            >
              {/* {todoValue} */}
              {this.props.text}
            </Text>
          )}
        </View>
        {isCompleted ? null : (
          <View>
            {isEditing ? (
              <View style={styles.buttons}>
                <TouchableOpacity onPress={this._endEditing}>
                  <View style={styles.actionContainer}>
                    <Entypo color="blue" size={30} name="edit" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => deleteTodo(id)}>
                  <View style={styles.actionContainer}>
                    <Ionicons color="red" size={30} name="md-close-circle" />
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttons}>
                <TouchableOpacity onPress={this._startEditing}>
                  <View style={styles.actionContainer}>
                    <Ionicons
                      color="green"
                      size={30}
                      name="ios-checkmark-circle"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  _endEditing = () => {
    this.setState(prevState => {
      return {
        isEditing: false
      };
    });
  };

  _startEditing = () => {
    const { editText } = this.props;
    this.setState(prevState => {
      return {
        isEditing: true,
        todoValue: editText
      };
    });
  };

  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };

  _toggleUnComplete = () => {};

  _controllInput = text => {
    this.setState({
      todoValue: text
    });
  };
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    width: width - 50,
    alignItems: "center",
    justifyContent: "space-between"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  contant: {
    flexDirection: "row",
    alignItems: "center"
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20
  },
  completedCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    //backgroundColor: "#0000ff",
    borderColor: "#cecece",
    borderWidth: 3,
    marginLeft: 20
  },
  ucCompletedCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 3,
    marginLeft: 20
  },

  textInput: {
    color: "#0000ff"
  },

  itemText: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 10,
    marginLeft: 10
  },

  unCompletedText: {
    color: "#ff0000"
  },
  completedText: {
    color: "#cecece",
    textDecorationLine: "line-through"
  }
});
