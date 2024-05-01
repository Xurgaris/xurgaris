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

// Remove o fragmento da URL atual
history.replaceState({}, document.title, window.location.pathname);
