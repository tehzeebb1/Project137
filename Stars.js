import React, {Component} from "react"
import {View, Text, StyleSheet, Button, Alert, FlatList, TouchableOpacity} from "react-native"
import {Card, Icon} from "react-native-elements"
import axios from "axios"
import {Header} from "react-native-elements"
import {RFValue} from "react-native-responsize-fontSize"


export default class StarsScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            details : {},
            imagePath : "",
            name:this.props.navigation.getParam("name"),
            url: `http://localhost:5000/planet?name=${this.props.navigation.getParam( "planet_name" )}`
        }
    }
    componentDidMount(){
        this.getStarDetails()
    }
    getStarDetails = () =>{
    const{url} = this.state
    axios
    .get(url)
    .then(response=>{
        this.setDetails(response.data.data)
    })
    .catch(error=>{
        Alert.alert(error.message)
    })
    }
    setDetails = starDetails =>{
        const starType = starDetails.star_type
        let imagePath = ""
        switch(starType){
            case "Gas Giant":
                imagePath = require("../assest/planet_type/gas_giant.png")
                break
            case "Terrestrial":
                imagePath = require("../assest/planet_type/terrestrial.png")
                break
            case "Super Earth":
                imagePath = require("../assest/planet_type/super_earth.png")
                break 
            case "Neptune Like":
                imagePath = require("../assest/planet_type/neptune_like.png")
                break 
            default:
                imagePath = require("../assets/planet_type/gas_giant.png")
        }
        this.setState({
            details: starDetails, 
            imagePath : imagePath
        })
    }
    render(){
        const{
            details, imagePath
        } = thi.state
        if(details.specifications){
            return(
                <View tile = {
                    styles.container
                    
                }>
                    <Card title = {details.name}
                    image = {imagePath}
                    imageProps = {{resizeMode:"contain", width:"100%"}}>
                        <View>
                            <Text 
                            style = {styles.cardItem}
                            >{`distance from earth:${details.distance_from_earth}`}</Text>
                            <Text 
                            style = {styles.cardItem}
                            >{`distance from sun:${details.distance_from_their_sun}`}</Text>
                            <Text 
                            style = {styles.cardItem}
                            >{`gravity:${details.gravity}`}</Text>
                            <Text 
                            style = {styles.cardItem}
                            >{`orbital period:${details.orbital_period}`}</Text>
                            <Text 
                            style = {styles.cardItem}
                            >{`orbital speed:${details.orbital_speed}`}</Text>
                            <Text 
                            style = {styles.cardItem}
                            >{`planet mass:${details.planet_mass}`}</Text>
                            <Text 
                            style = {styles.cardItem}
                            >{`planet radius:${details.planet_radius}`}</Text>
                            <Text 
                            style = {styles.cardItem}
                            >{`plante type:${details.planet_type}`}</Text>
                        </View>
                        <View style = {[styles.cardItem, {flexDirection:"column"}]}>
                            <Text>{details.specifications?`specifications:`:""}</Text>
                            {details.specifications.map((item, index) =>(
                                <Text key = {index.toString()}style = {{marginLeft:50}}>{item}</Text>
                            ))}
                        </View>
                    </Card>
                </View>
            )
    
        }
    return null
    }
    
    }
    
    const styles = StyleSheet.create({
        container:{
            flex:1
        }, 
        cardItem:{
            marginBotton:10
        },
        medalContainer:{
            flex:0.22,
            flexDirection:"row",
            justifyContent:"space-evenly",
            alignItems:"center"
        },
        lowerContainer:{
            flex:0.15,
            flexDirection:"row",
            justifyContent:"space-evenly",
            alignItems:"center"
        },
        starName:{
            fontSize:40,
            fontWeight:"Bold",
            textAlign:"center",
            color:"Black"
        }
    })