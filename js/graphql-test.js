function gqlTest() {
	// Here we define our query as a multi-line string
	// Storing it in a separate .graphql/.gql file is also possible
	var query = `
query{
  MediaList(userName:"Kex1016")
  {
    user {
      name
      updatedAt
      avatar {
        large
      }
      options {
        profileColor
      }
      favourites{
        anime(page:1, perPage: 25){
          nodes{
            title{
              romaji
              english
            }
            coverImage {
              extraLarge
              color
            }
          }
        }
      }
	}
  }
}
`;

	// Define our query variables and values that will be used in the query request
	var variables = {
		id: 15125
	};

	// Define the config we'll need for our Api request
	var url = 'https://graphql.anilist.co',
		options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				query: query,
				variables: variables
			})
		};

	// Make the HTTP Api request
	fetch(url, options).then(handleResponse)
		.then(handleData)
		.catch(handleError);

	function handleResponse(response) {
		return response.json().then(function (json) {
			return response.ok ? json : Promise.reject(json);
		});
	}

	function handleData(obj) {
		console.log(obj);

		document.getElementById("gql-uname").innerHTML = obj.data.MediaList.user.name;
		document.getElementById("gql-color").innerHTML = obj.data.MediaList.user.options.profileColor;
		document.getElementById("gql-avatar").src = obj.data.MediaList.user.avatar.large;
		var i = 0;
		var num = 1;

		do {
			document.getElementById("gql-favorites").innerHTML += "<br><h5>#" + num + "</h1><br>Title: <span style='color:" + obj.data.MediaList.user.favourites.anime.nodes[i].coverImage.color + "'>" + obj.data.MediaList.user.favourites.anime.nodes[i].title.romaji + " (" + obj.data.MediaList.user.favourites.anime.nodes[i].title.english + ")</span>" + "<br> Cover: <img width='20%' src='" + obj.data.MediaList.user.favourites.anime.nodes[i].coverImage.extraLarge + "'>";
			i++;
			num++;
		} while (i != 10);
	}

	function handleError(error) {
		alert('Error, check console');
		console.error(error);
	}
}
