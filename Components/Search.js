import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from "react-native";
import FilmItem from './FilmItem'
import films from '../Helpers/FilmsData'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component{

constructor(props){
    super(props)
    this.state = {
        films: [],
        isLoading: false
        // searchedText: ""
     }

     this.searchedText = ""
     this.page = 0
     this.totalPages = 0
}

_displayDetailForFilm = (idFilm) => {
    // console.log("idFilm: ", idFilm)
    this.props.navigation.navigate("FilmDetail", {idFilm})
}

_loadFilms() {
    // Pour l'affichage du loading
    this.setState({isLoading: true})

    if(this.searchedText){
         getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                console.log(data)

                this.page = data.page
                this.totalPages = data.total_pages
                this.setState(
                {
                    films: [...this.state.films, ...data.results], // this.state.films.concat(data.results)
                    isLoading: false
                })
         })
    }
}

_displayLoading(){
    if(this.state.isLoading && this.searchedText){
    
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

_searchFilms(){
    this.page = 0
    this.totalPages = 0
    this.setState({
        films: []
    }, ()=> {
        this._loadFilms()
        // NB: faut toujours appeler le deuxieme parametre du #setState qui est une fonction lorsque vous initialiser les valeurs de ce #setState car elle est une function asynchrone
    })

}

_searchTextInputChanged(text){
    // this.setState({ searchedText: text.toLowerCase() })
    this.searchedText= text.toLowerCase()
}

render(){
    console.log("RENDER")
    console.log(this.state.isLoading)
    return(
        <View style={styles.main_container}>
            <TextInput
                onSubmitEditing={()=> {
                    this._searchFilms()
                    // this._loadFilms()
                    // #onSubmitEditing est utilise lorsqu'on tape sur #retour ou #entree sur le clavier de iphone ou android
                }}
                onChangeText={(text) => this._searchTextInputChanged(text)}
                style={styles.textinput} placeholder="Titre du film" />
            <Button style={{height: 50}} title="Rechercher" onPress={()=> {this._searchFilms()}} />
            <FlatList
              style={{marginTop: 20}}
              data={this.state.films}
              key={(item)=>{item.id.toString()}}
              onEndReachedThreshold = {0.5}
              onEndReached = {()=>{
                // #onEndReachedThreshold #onEndReached sont utilises pour gerer le scroll infini des donnees
                if(this.state.films.length>0 && this.page < this.totalPages){
                    console.log("onEndReached")
                    this._loadFilms()
                }
              }}
              renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
            />
            { this._displayLoading() }
        </View>
    )
}
}

const styles = StyleSheet.create({
    main_container:{
    // marginTop: 22,
    flex: 1
    },
    textinput:{
        marginLeft: 5, marginRight: 5, height: 50, borderColor: '#000000', borderWidth: 1, padding: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default Search
