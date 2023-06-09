const API_KEY = 'api_key=00b87fcce07094370a142931eb3291ec';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URl = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('movie-search-box');

getMovies(API_URL);

async function getMovies(url){

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })

}


function showMovies(data){
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average} = movie;
        const moviel = document.createElement('div');
        moviel.classList.add('movie');
        moviel.innerHTML = `
        
        <img src="${IMG_URl + poster_path}" alt="${title}">

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        
        `

        main.appendChild(moviel);
    });

}

function getColor(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const searchTitle = search.value;

    if(searchTitle){
        getMovies(searchURL + '&query=' + searchTitle)
    }else{
        getMovies(API_URL);
    }
})