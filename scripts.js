document.addEventListener("DOMContentLoaded", function () {
  // Step 1: Identify the film (e.g., "A New Hope")
  const filmTitle = "A New Hope";

  // Step 2: Make a request to search for the film
  fetch(`https://swapi.dev/api/films/?search=${filmTitle}`)
    .then(response => response.json())
    .then(data => {
      // Step 3: Extract the film URL(s)
      const filmUrls = data.results.map(film => film.url);

      // Step 4: Fetch film details for each URL
      filmUrls.forEach(filmUrl => {
        fetch(filmUrl)
          .then(response => response.json())
          .then(filmData => {
            // Step 5: Extract character URLs
            const characterUrls = filmData.characters;

            // Step 6: Fetch character details for each URL
            characterUrls.forEach(characterUrl => {
              fetch(characterUrl)
                .then(response => response.json())
                .then(characterData => {
                  // Step 7: Extract character names
                  const characterName = characterData.name;

                  // Step 8: Append character names to the <ul> element
                  const characterList = document.getElementById('characterList');
                  const listItem = document.createElement('li');
                  listItem.textContent = characterName;
                  characterList.appendChild(listItem);
                })
                .catch(error => {
                  console.error('Error fetching character details:', error);
                });
            });
          })
          .catch(error => {
            console.error('Error fetching film details:', error);
          });
      });
    })
    .catch(error => {
      console.error('Error fetching film search results:', error);
    });
	});