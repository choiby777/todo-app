import React, { Component } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"

const { height, width } = Dimensions.get("window")

export default class ToDo extends Component {
  state = {
    isEditing: false
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { itemText } = this.state
    return (
      <View style={styles.container}>
        <Text>Item : {this.props.itemText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    width: width - 50
  }
})
