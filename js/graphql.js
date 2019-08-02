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
	document.getElementById("gql-avatar").src = obj.data.MediaList.user.avatar.large;
	var i = 0;
	var num = 1;

	do {
		/* <li>
				<div class="collapsible-header" style="color: #263238;"><i class="material-icons">live_tv</i><span id="gql-aname">name</span></div>
				<div class="collapsible-body" style="background: #fff; color: #263238;"><span id="gql-adesc">image and description</span></div>
			</li>
		*/
		if (obj.data.MediaList.user.favourites.anime.nodes[i].title.english == null) {
			document.getElementById("gql-alist").innerHTML += "<li><div class='collapsible-header' style='color: #263238;'><span class='gql-anumber'>" + num + "</span>&nbsp;&nbsp;&nbsp;" + obj.data.MediaList.user.favourites.anime.nodes[i].title.romaji + "</div><div class='collapsible-body' style='background: #fff; color: #263238;'><div class='card'><div class='card-content' style='background: " + obj.data.MediaList.user.favourites.anime.nodes[i].coverImage.color + "'><span class='card-title'>" + obj.data.MediaList.user.favourites.anime.nodes[i].title.romaji +"</span></div><div class='card-content'><p>" + obj.data.MediaList.user.favourites.anime.nodes[i].description.replace('\r\n','') + "</p></div><div class='card-action'><a href='" + obj.data.MediaList.user.favourites.anime.nodes[i].siteUrl + "'>Go to anime's page</a></div></div>"
		} else {
			document.getElementById("gql-alist").innerHTML += "<li><div class='collapsible-header' style='color: #263238;'><span class='gql-anumber'>" + num + "</span>&nbsp;&nbsp;&nbsp;" + obj.data.MediaList.user.favourites.anime.nodes[i].title.romaji + " (eng.: " + obj.data.MediaList.user.favourites.anime.nodes[i].title.english + ")</div><div class='collapsible-body' style='background: #fff; color: #263238;'><div class='card'><div class='card-content' style='background: " + obj.data.MediaList.user.favourites.anime.nodes[i].coverImage.color + "'><span class='card-title'>" + obj.data.MediaList.user.favourites.anime.nodes[i].title.romaji +"</span></div><div class='card-content'><p>" + obj.data.MediaList.user.favourites.anime.nodes[i].description.replace('\r\n','') + "</p></div><div class='card-action'><a href='" + obj.data.MediaList.user.favourites.anime.nodes[i].siteUrl + "'>Go to anime's page</a></div></div>"
		}

		i++;
		num++;
	} while (i != 10);
}

function handleError(error) {
	alert('Error, check console');
	console.error(error);
}
