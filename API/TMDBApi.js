import API_TOKEN from '../Helpers/Token'

export function getFilmsFromApiWithSearchedText(text, page){
const url = 'https://api.themoviedb.org/3/search/movie?api_key='+ API_TOKEN + '&language=en-US&query='+ text + '&include_adult=false' + '&page=' + page

return fetch(url)
        .then((response) => response.json())
        .catch((error)=> console.log(error))
}

export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w300' + name
}


export function getFilmDetailFromApi(id){
const url = 'https://api.themoviedb.org/3/movie/'+ id + '?api_key='+ API_TOKEN + '&language=en-US'

return fetch(url)
        .then((response) => response.json())
        .catch((error)=> console.log(error))
}