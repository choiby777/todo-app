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
    const { itemText } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.circle} />
        </TouchableOpacity>
        <Text style={styles.itemText}>Item : {this.props.itemText}</Text>
      </View>
    )
  }
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
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    //backgroundColor: "#0000ff",
    borderColor: "#0000ff",
    borderWidth: 3,
    marginLeft: 20
  },
  itemText: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 10,
    marginLeft: 10
  }
})
