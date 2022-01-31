import React, {Component} from "react"
import {View, Text, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native"
import {ListItem} from "react-native-elements"
import axios from "axios"
import {Header} from "react-native-elements"
import {RFValue} from "react-native-responsize-fontSize"

export default class DetailsScreen extends Component{
constructor(props){
    super(props)
    this.state = {
        listData:[],
        url:"http://localhost:5000/"
    }
}
componentDidMount(){
    this.getData()
}
getData = () =>{
const{url} = this.state
axios
.get(url)
.then(response=>{
    return this.setState({
        data:response.data.data
    })
})
.catch(error=>{
    Alert.alert(error.message)
})
}

renderItem=({item, index})=>(
    <ListItem
    key = {index}
    title={`Stars:${item.name}`}
    subtitle = {`distance from earth:${item.distance_from_earth}`}
    titleStyle = {styles.title}
    containerStyle = {styles.listContainer}
    bottonDivider
    chevron
    onPress = {() =>
        this.props.navigations.navigate("Details", {planet_name:item_name})
    }
    />
)
keyExtractor = (item, index) => index.toString()
render(){
const{listData} = this.state
if(listData.length === 0){
    return(
        <View style = {styles.EmptyContainer}>
            <Text>Loading...</Text>
        </View>
    )
}

        return(
            <View style = {styles.container}>
                <SafeAreaView/>
                <View style = {styles.upperContainer}>
                    <Text style={styles.headerText}>Plantes World</Text>
                </View>
                <View style = {styles.lowerContanier}>
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.listData}
                    renderItem = {this.renderItem}/>
                </View>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }, 
    upperContainer: { 
        flex: 0.1, 
        justifyContent: "center", 
        alignItems: "center" 
    },
    headerText: { 
        fontSize: 30, 
        fontWeight: "bold", 
        color: "#132743" 
    },
    lowerContainer: { flex: 0.9 }, 
    emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    emptyContainerText: { fontSize: 20 }, 
    title: { fontSize: 18, fontWeight: "bold", color: "#d7385e" },
    listContainer: { backgroundColor: "#eeecda" }
})