import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native"

const { height, width } = Dimensions.get("window")

export default class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { itemText, isCompleted } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._toggleComplete}>
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.ucCompletedCircle
            ]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.itemText,
            isCompleted ? styles.completedText : styles.unCompletedText
          ]}
        >
          Item : {this.props.itemText}
        </Text>
      </View>
    )
  }

  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      }
    })
  }

  _toggleUnComplete = () => {}
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    width: width - 50,
    alignItems: "center"
  },
  completedCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    //backgroundColor: "#0000ff",
    borderColor: "#0000ff",
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
    color: "#0000ff",
    textDecorationLine: "line-through"
  }
})
