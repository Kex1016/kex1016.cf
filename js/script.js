function Load() {
    var sub1 = document.getElementById("sub");
    var sub = ["2D > 3D", "I like fictional characters.", "When in doubt just watch anime.", "Yuri connoisseour.", "This is my site. Yay.", "I'm just a nolife.", "Why are you reading these?","This is an easter egg. Now send it to me.","I hope you're having a great day.","<a href='https://anilist.co/character/82525/Shiro'>Shiro</a> best girl."];
    var subR = Math.floor((Math.random() * 10));
    sub1.innerHTML = sub[subR];
    Subtitle();
}

function Subtitle() {
    var sub1 = document.getElementById("sub");
    var sub = ["2D > 3D", "I like fictional characters.", "When in doubt just watch anime.", "Yuri connoisseour.", "This is my site. Yay.", "I'm just a nolife.", "Why are you reading these?",69,"I hope you're having a great day.","<a href='https://anilist.co/character/19565/Yui-Hirasawa' target='_blank'>Yui</a> best girl."];
    var subR = 0;
    var subLUL = 0;
    setInterval(function () {
        subR = Math.floor((Math.random() * 10));
        sub1.style.opacity="0";
        
        
        setTimeout(function () {
            if(sub[subR]==69){
            sub1.innerHTML = "You've watched " + subLUL + " subtitles go by.";
            sub1.style.opacity="1";
            } else {
            sub1.innerHTML = sub[subR];
            sub1.style.opacity="1";
            }
        }, 600)
        subLUL++;
    }, 15000)
}


function Image(x) {
    var hover = x.parent;
    var hoover = x.closest("block-text");
    hover.style.opacity="1";
    hoover.style.opacity="1";
}