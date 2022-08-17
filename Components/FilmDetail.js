import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity } from "react-native";
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux'

class FilmDetail extends React.Component{

constructor(props){
    super(props)
    this.state = {
        film: undefined,
        isLoading: true
    }
}

// FUnction du cycle de vie react native
componentDidMount(){
    const idFilm = this.props.route.params.idFilm

    getFilmDetailFromApi(idFilm).then((res)=> {
       this.setState({
            film: res,
            isLoading: false
       })
    })
}

// FUnction du cycle de vie react native
componentDidUpdate(){
    console.log(this.props.favoritesFilm)
}

_toggleFavorite(){
    const action = {type: "TOGGLE_FAVORITE", value: this.state.film}
    this.props.dispatch(action)
}

_displayFavoriteImage(){
    const res = this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id)

    return (
       (res!==-1)? (<Image
            style={styles.favorite_icon}
            source={require('../Images/heart_plein.png')}
        />): (
                 <Image
                     style={styles.favorite_icon}
                     source={require('../Images/heart_vide.png')}
                 />
             )
    )
}

_displayFilm(){
    const film = this.state.film

    if(film != undefined){
        return (
            <ScrollView style={styles.scrollview_container}>
               <Image
                 style={styles.image}
                 source={{uri: getImageFromApi(film.backdrop_path)}}
              />

              <View style={styles.content_container}>
                  <View style={styles.titleDesc_container}>
                    <Text style={styles.title_text}>{film.title}</Text>
                        <TouchableOpacity
                          onPress={()=> this._toggleFavorite()}
                          style={styles.favorite_container}
                        >
                        {this._displayFavoriteImage()}
                     </TouchableOpacity>
                    <Text style={styles.desc_text}>{film.overview}</Text>
                  </View>

                  <View style={styles.other_container}>
                    <Text style={styles.release_date}>Sorti le {moment(film.release_date).format('L')}</Text>
                    <Text style={styles.vote_average}>Note: {film.vote_average} / 10</Text>
                    <Text style={styles.vote_count}>Nombre de votes: {film.vote_count}</Text>
                    <Text style={styles.budget}>Budget: {numeral(1000).format('0,0[.]00 $')}</Text>
                  </View>
              </View>

            </ScrollView>
        )
    }
}

_displayLoading(){
    if(this.state.isLoading){
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

    render(){
       // const idFilm = this.props.navigation.state.params.idFilm
       // const idFilm = this.props.route.params.idFilm
       console.log(this.props)

        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollview_container: {
        flex: 1,
        padding: 4
    },
    image: {
        // borderColor: 'red',
        // borderWidth: 1,
        width: '100%',
        height: 160,
        backgroundColor: 'gray',
        border: '1px solid black',
        borderRadius: '5px!important',
        flex: 1
     },

     content_container: {
        flex: 1,
     },
     titleDesc_container: {
        flex: 1,
     },
     other_container: {
        flex: 1,
        marginTop: 10,
     },
     title_text: {
        textAlign: 'center',
         marginTop: 10,
         fontSize: 20,
         fontWeight: '700'
     },
    desc_text: {
        marginTop: 10
    },
    release_date: {
        fontWeight: '600',
        lineHeight: 20
    },
    vote_average: {
        fontWeight: '600',
        lineHeight: 20
    },
    vote_count: {
        fontWeight: '600',
        lineHeight: 20
    },
    budget: {
        fontWeight: '600',
        lineHeight: 20
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_icon: {
        width: 40,
        height: 40
    }
})

// Connexion du #StateGlobal ou #Store a ce component #FilmDetail et Recuperation des valeurs du #Store #Reducers et dispatch dans le props #FilmDetail
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmDetail)