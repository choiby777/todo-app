import React, { Component } from "react"
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons"
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
    const { itemText, isCompleted, isEditing } = this.state
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
          <Text
            style={[
              styles.itemText,
              isCompleted ? styles.completedText : styles.unCompletedText
            ]}
          >
            Item : {this.props.itemText}
          </Text>
        </View>

        {isCompleted ? null : (
          <View>
            {isEditing ? (
              <View style={styles.buttons}>
                <TouchableOpacity onPress={this._editData}>
                  <View style={styles.actionContainer}>
                    <Entypo color="blue" size={30} name="edit" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._deleteData}>
                  <View style={styles.actionContainer}>
                    <Ionicons color="red" size={30} name="md-close-circle" />
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttons}>
                <TouchableOpacity onPress={this._saveData}>
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
    )
  }

  _editData = () => {
    this.setState(prevState => {
      return {
        isEditing: false
      }
    })
  }

  _deleteData = () => {}

  _saveData = () => {
    this.setState(prevState => {
      return {
        isEditing: true
      }
    })
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
})
