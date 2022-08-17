import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component{
    render(){
        const {film, displayDetailForFilm} = this.props
        return(
        // NB: le cpmposant #View n'utilise pas de props
        // <View style={styles.main_container}>
        <TouchableOpacity style={styles.main_container} onPress = {()=> displayDetailForFilm(film.id)} >
             <Image
                  style={styles.image}
                  source={{uri: getImageFromApi(film.backdrop_path)}}
               />
            <View style={styles.right_container}>
                <View style={styles.header_container}>
                     <Text style={styles.title_text}> {film.title}</Text>
                     <Text style={styles.vote_text}> {film.vote_average} </Text>
                </View>
                <View style={styles.description_container}>
                    <Text style={styles.desc_text} numberOfLines={6}> {film.overview} </Text>
                </View>
                <View style={styles.date_container}>
                    <Text style={styles.date_text}> Sorti le {film.release_date} </Text>
                </View>
            </View>
        </TouchableOpacity>
        // </View>
        )
    }
}

const styles = StyleSheet.create({
main_container:{
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    /*borderColor: 'red',
    borderWidth: 1,*/
},
image: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: 120,
    height: 160,
    margin: 5,
    backgroundColor: 'gray',
    border: '1px solid black',
    borderRadius: '5px!important'
 },
right_container:{
    flex: 1,
     paddingLeft: 5,
     paddingRight: 5,
 },
header_container: {
    flex: 3,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
},
title_text:{
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 20
},
vote_text: {
    fontWeight: 'bold',
    fontSize: 20
},
description_container: {
    // flex: 5
    flex: 5
},
desc_text: {
    fontStyle: 'italic',
    color: '#666666'
},
date_container: {
    flex: 1,
},
date_text: {
    textAlign: 'right',
    fontSize: 14,
}
});

export default FilmItem
