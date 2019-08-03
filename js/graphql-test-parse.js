function doingIt() {
	var txt = '{"data":{"MediaList":{"user":{"name":"Kex1016","avatar":{"large":"https://s4.anilist.co/file/anilistcdn/user/avatar/large/b115130-ah8q63sToPPM.png"},"options":{"profileColor":"purple"},"favourites":{"anime":{"nodes":[{"title":{"romaji":"K-ON!","english":"K-ON!"},"coverImage":{"extraLarge":"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx5680-WgLKGOnxcQKC.jpg","color":"#e46b5d"}},{"title":{"romaji":"Asagao to Kase-san","english":"Asagao to Kase-san"},"coverImage":{"extraLarge":"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx99916-wH0VH9KOt4hW.jpg","color":"#e4d6a1"}},{"title":{"romaji":"Flip Flappers","english":null},"coverImage":{"extraLarge":"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21714-x85ZznoBbk5K.jpg","color":"#5daef1"}},{"title":{"romaji":"Sora yori mo Tooi Basho","english":"A Place Further Than the Universe"},"coverImage":{"extraLarge":"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx99426-oVBePMVlxDad.jpg","color":"#fec950"}},{"title":{"romaji":"No Game No Life","english":"No Game No Life"},"coverImage":{"extraLarge":"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx19815-bIo51RMWWhLv.jpg","color":"#e4ae5d"}},{"title":{"romaji":"Yuru Camp△","english":"Laid-Back Camp"},"coverImage":{"extraLarge":"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx98444-zzhSw9o3LJSy.jpg","color":"#f1ae5d"}},{"title":{"romaji":"Sakura Trick","english":null},"coverImage":{"extraLarge":"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20047-4CWI53RS2Gh1.jpg","color":"#e4ae5d"}},{"title":{"romaji":"Angel Beats!","english":"Angel Beats!"},"coverImage":{"extraLarge":"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx6547-3jWzWyXg34Et.png","color":"#5d78f1"}},{"title":{"romaji":"Konohana Kitan","english":"KONOHANA KITAN"},"coverImage":{"extraLarge":"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx98506-BPHtNhP7Q1TD.jpg","color":"#f1d6bb"}},{"title":{"romaji":"Princess Principal","english":null},"coverImage":{"extraLarge":"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx98505-y35nnJrhzY0Q.jpg","color":"#865df1"}}]}}}}}}'

	var obj = JSON.parse(txt);

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

function reset() {
	document.getElementById("gql-uname").innerHTML = "soontm";
	document.getElementById("gql-color").innerHTML = "soontm";
	document.getElementById("gql-avatar").innerHTML = "soontm";
	document.getElementById("gql-avatar").src = "img/fallback.jpg";
	document.getElementById("gql-favorites").innerHTML = "reset";
	document.getElementById("buttons").style.color = "black"
}