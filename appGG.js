//Je vais détailler chaque morceau de code pour mieux comprendre


let inputSearch = document.getElementById('moviesInput'); // l'input
let boutonSearch = document.getElementById('boutonRecherche'); //le bouton pour l'envoyer
let textForSearch = document.querySelector(".textAfterInput"); //le texte à changer après chaque recherche

boutonSearch.addEventListener("click",function() {
    let inputValue = inputSearch.value; // je récupère l'entré de l'input
    textForSearch.textContent = `Results for "${inputValue}"` //je change le texte
    

    // je récupère tout les films qui comprennent mon input dans son nom
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=1d7f2a93c1fcb1dc9f968d6ff487fedb&query=${inputValue}`, {
        headers: { 'Accept': 'application/json' }
    })
        .then(response => response.json()) //je transforme en json pour le lire
        .then(data => { //si je met data.id(ou autre) ça marche pas car l'id est compris dans results, donc je dois parcourir results et trouver l'id là-bas.
            
            let wrapper = document.querySelector('.swiper-wrapper-results'); // la div ou je vais mettre toutes les images
            wrapper.innerHTML = ''; // faut vider avant de commencer

            data.results.forEach(movie => {
                const imageURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`; //l'url de l'image pour chaque film
                const slide = document.createElement("div"); // slide pour chaque film
                slide.classList.add("swiper-slide");
                slide.innerHTML = `<img src="${imageURL}">`;
                wrapper.appendChild(slide);
            });

            //configuration swiper
            new Swiper('.swiper-container-results', {
                slidesPerView: 4,
                spaceBetween: 2,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        })
        .catch(error => console.log('Error:', error));
    })

//je récupère les latest releases
// je fais +- la même chose que pour le fetch précédent
fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=1d7f2a93c1fcb1dc9f968d6ff487fedb', {
    headers: { 'Accept': 'application/json'}
})
    .then(response => response.json())
    .then(data => {
        let wrapperLatest = document.querySelector('.swiper-wrapper-latest');// je rajoute un latest à la fin de chaque nom pour différencier
        wrapperLatest.innerHTML = '';

        data.results.forEach(movie => {
            const imageUrlLatest = `https://image.tmdb.org/t/p/original${movie.poster_path}`
            const slideLatest = document.createElement("div");
            slideLatest.classList.add("swiper-slide");
            slideLatest.innerHTML = `<img src="${imageUrlLatest}">`
            wrapperLatest.appendChild(slideLatest);
        })

        new Swiper('.swiper-container-latest', {
            slidesPerView: 4,
            spaceBetween: 2,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
    })
    .catch(err => console.log(err));


// je dois d'abord récupérer l'id des films pour savoir le genre, 
// ensuite je pourrais filtrer avec l'id
let comedyID = '';
let dramaID = '';
let actionID = '';
let romanceID = '';
let fantasyID = '';
let animationID = '';

    // fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1d7f2a93c1fcb1dc9f968d6ff487fedb', {
    //     headers: { 'Accept': 'application/json'}
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // si name est égale à comedy, récupère son id
    //     data.genres.forEach(movie => {
    //         if(movie.name === "Comedy") {
    //         comedyID = movie.id;
    //         }
    //         if(movie.name === "Drama") {
    //             dramaID = movie.id;
    //         }
    //         if(movie.name === "Action") {
    //             actionID = movie.id;
    //         }
    //         if(movie.name === "Romance") {
    //             romanceID = movie.id;
    //         }
    //         if(movie.name === "Fantasy") {
    //             fantasyID = movie.id;
    //         }
    //         if(movie.name === "Animation") {
    //             animationID = movie.id;
    //         }
    //     })// j'ai récupérer tout les id des genres
    // })


// je dois mettre dans une fonction asynchrone pour que les valeurs des ID soit disponible en dehors du fetch

async function fetchGenreIDs() {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1d7f2a93c1fcb1dc9f968d6ff487fedb', {
        headers: { 'Accept': 'application/json' }
    });
    const data = await response.json(); //même principe, mais on utilise des await 

    data.genres.forEach(movie => {
        if (movie.name === "Comedy") {
            comedyID = movie.id;
        }
        if (movie.name === "Drama") {
            dramaID = movie.id;
        }
        if (movie.name === "Action") {
            actionID = movie.id;
        }
        if(movie.name === "Romance") {
            romanceID = movie.id;
        }
        if(movie.name === "Fantasy") {
            fantasyID = movie.id;
        }
        if(movie.name === "Animation") {
            animationID = movie.id;
        }
    });
}

// et la on appelle la fonction avec un then et ça doit marcher normalement
fetchGenreIDs().then(() => {

    // je dois récupérer les films, comparer les id pour comedy, si c'est ok j'le met dans la div
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=1d7f2a93c1fcb1dc9f968d6ff487fedb&with_genres=${comedyID}`, {
        headers: { 'Accept': 'application/json'} //les films de comedy sont récupérer là
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    
})












