function Shit() {
	// Here we define our query as a multi-line string
	// Storing it in a separate .graphql/.gql file is also possible
	var query = `query ($id: Int){
  MediaListCollection(userId: $id, type: ANIME){
		lists{
      name
			entries{
				mediaId
        notes
			}
		}
	}
  User(id: $id) {
    name
    id
    statistics {
      anime {
        count
      }
      manga {
        count
      }
    }
    updatedAt
    avatar {
      large
    }
    favourites {
      anime(page: 1, perPage: 10) {
        nodes {
          title {
            romaji
            english
          }
          id
          description
          siteUrl
          coverImage {
            extraLarge
            color
          }
        }
      }
    }
  }
}`;

	// Define our query variables and values that will be used in the query request
	var variables = {
		"id": 115130
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

		document.getElementById("buttons").style.color = "green"
		document.getElementById("gql-uname").innerHTML = obj.data.User.name;
		document.getElementById("gql-color").innerHTML = "lol no";
		document.getElementById("gql-avatar").src = obj.data.User.avatar.large;
		var i = 0;
		var num = 1;

		do {
			document.getElementById("gql-favorites").innerHTML += "<br><h5>#" + num + "</h1><br>Title: <span style='color:" + obj.data.User.favourites.anime.nodes[i].coverImage.color + "'>" + obj.data.User.favourites.anime.nodes[i].title.romaji + " (" + obj.data.User.favourites.anime.nodes[i].title.english + ")</span>" + "<br> Cover: <img width='20%' src='" + obj.data.User.favourites.anime.nodes[i].coverImage.extraLarge + "'>";
			i++;
			num++;
		} while (i != 10);

		var note;
		i = 0;

		document.getElementById("gql-notes").innerHTML = obj.data.MediaListCollection.lists[1].entries.length + " " + obj.data.MediaListCollection.lists[12].entries.length;
		for (var j = 0; j < obj.data.MediaListCollection.lists[1].entries.length; j++) {
			for (var p = 0; p < 10; p++) {
				if (obj.data.User.favourites.anime.nodes[p].id == obj.data.MediaListCollection.lists[1].entries[j].mediaId) {
					var replaced = obj.data.MediaListCollection.lists[1].entries[j].notes.replace("⭐", "⭐<br>");
					var replaced = replaced.replace(/list./g, "list.<br>");
					var replaced = replaced.replace(/Rating/g, "<br>Rating");
					var replaced = replaced.replace(/nd anime/g, "nd anime |");
					var replaced = replaced.replace(/st anime/g, "st anime |");
					var replaced = replaced.replace(/rd anime/g, "rd anime |");
					var replaced = replaced.replace(/th anime/g, "th anime |");
					document.getElementById("gql-notes").innerHTML += "<hr>" + replaced;
				}
			}
		}
	}

	function handleError(error) {
		alert('Error, check console');
		console.error(error);
		document.getElementById("buttons").style.color = "red"
	}
}
