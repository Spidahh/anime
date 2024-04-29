document.addEventListener('DOMContentLoaded', () => {
    const animeList = document.getElementById('animeList');

    const animeNames = [
        "Berserk",
        "Fullmetal Alchemist Brotherhood",
        "JoJo's Bizarre Adventure",
        "NARUTO",
        "ONE PIECE",
        // Aggiungi altri nomi di anime qui
    ];

    const query = `
        query ($animeNames: [String]) {
            Page(page: 1, perPage: 50) {
                media(type: ANIME, search: $animeNames) {
                    id
                    title {
                        romaji
                    }
                    genres
                    status
                    averageScore
                }
            }
        }
    `;

    const variables = {
        animeNames: animeNames
    };

    console.log('Query:', query);
    console.log('Variables:', variables);

    // Effettua la richiesta GraphQL utilizzando Axios
    axios.post('https://graphql.anilist.co', { query, variables })
        .then(response => {
            const animeData = response.data.data.Page.media;

            animeData.forEach(anime => {
                const li = document.createElement('li');
                li.classList.add('anime-item');
                li.innerHTML = `
                    <div class="anime-details">
                        <h3 class="anime-title">${anime.title.romaji}</h3>
                        <p class="anime-meta anime-genre"><strong>Genres:</strong> ${anime.genres.join(', ')}</p>
                        <p class="anime-meta anime-status"><strong>Status:</strong> ${anime.status}</p>
                        <p class="anime-meta"><strong>My Rating:</strong> ${anime.averageScore}/100</p>
                    </div>
                `;
                
                animeList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Errore durante il recupero dei dati degli anime:', error);
        });
});
