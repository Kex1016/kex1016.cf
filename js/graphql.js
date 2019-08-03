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
	id: 115130
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

	document.getElementById("gql-uname").innerHTML = obj.data.User.name;
	document.getElementById("gql-avatar").src = obj.data.User.avatar.large;
	var i = 0;
	var num = 1;

	do {
		/* <li>
				<div class="collapsible-header" style="color: #263238;"><i class="material-icons">live_tv</i><span id="gql-aname">name</span></div>
				<div class="collapsible-body" style="background: #fff; color: #263238;"><span id="gql-adesc">image and description</span></div>
			</li>
		*/
		if (obj.data.User.favourites.anime.nodes[i].title.english == null) {
			document.getElementById("gql-alist").innerHTML += "<li><div class='collapsible-header' style='color: #263238;'><span class='gql-anumber'>" + num + "</span>&nbsp;&nbsp;&nbsp;" + obj.data.User.favourites.anime.nodes[i].title.romaji + "</div><div class='collapsible-body' style='background: #fff; color: #263238;'><div class='card'><div class='card-content' style='background: " + obj.data.User.favourites.anime.nodes[i].coverImage.color + "'><span class='card-title'>" + obj.data.User.favourites.anime.nodes[i].title.romaji +"</span></div><div class='card-content'><p><img width='17%' src='" + obj.data.User.favourites.anime.nodes[i].coverImage.extraLarge + "' style='overflow:auto; float:left; margin-right:1%;'>" + obj.data.User.favourites.anime.nodes[i].description.replace('\r\n','') + "<p></p><h6 style='text-decoration: underline;'>My notes on the anime:</h6><p id='gql-notes" + num + "'></p></p></div><div class='card-action'><a href='" + obj.data.User.favourites.anime.nodes[i].siteUrl + "'>Go to anime's page</a></div></div>"
		} else {
			document.getElementById("gql-alist").innerHTML += "<li><div class='collapsible-header' style='color: #263238;'><span class='gql-anumber'>" + num + "</span>&nbsp;&nbsp;&nbsp;" + obj.data.User.favourites.anime.nodes[i].title.romaji + " (eng.: " + obj.data.User.favourites.anime.nodes[i].title.english + ")</div><div class='collapsible-body' style='background: #fff; color: #263238;'><div class='card'><div class='card-content' style='background: " + obj.data.User.favourites.anime.nodes[i].coverImage.color + "'><span class='card-title'>" + obj.data.User.favourites.anime.nodes[i].title.romaji +"</span></div><div class='card-content'><p><img width='17%' src='" + obj.data.User.favourites.anime.nodes[i].coverImage.extraLarge + "' style='overflow:auto; float:left; margin-right:1%;'>" + obj.data.User.favourites.anime.nodes[i].description.replace('\r\n','') + "<p></p><h6 style='text-decoration: underline;'>My notes on the anime:</h6><p id='gql-notes" + num + "'></p></p></div><div class='card-action'><a href='" + obj.data.User.favourites.anime.nodes[i].siteUrl + "'>Go to anime's page</a></div></div>"
		}

		i++;
		num++;
	} while (i != 10);
	
	num = 1;
	for (var j = 0; j < obj.data.MediaListCollection.lists[1].entries.length; j++) {
			for (var p = 0; p < 10; p++) {
				if (obj.data.User.favourites.anime.nodes[p].id == obj.data.MediaListCollection.lists[1].entries[j].mediaId) {
					var replaced = obj.data.MediaListCollection.lists[1].entries[j].notes.replace(/⭐/g, "⭐<br>");
					var replaced = replaced.replace(/lists/g, "yeet");
					var replaced = replaced.replace(/list./g, "list.<br>");
					var replaced = replaced.replace(/yeet/g, "lists");
					var replaced = replaced.replace(/Rating:/g, "<br><b>Rating:</b>");
					document.getElementById("gql-notes" + num).innerHTML += replaced;
					num++;
				}
			}
		}
}

function handleError(error) {
	alert('Error, check console');
	console.error(error);
}
