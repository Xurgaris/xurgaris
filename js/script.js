function clickMenu(){
    if(menu.style.display == "block"){
        menu.style.display = "none"
        menu.style.color = "#fff"
        men
    }
    else{
        menu.style.display = "block"
        menu.style.color = "#fff"
    }
}

window.addEventListener('load', function() {
    history.replaceState({}, document.title, window.location.pathname);
});
