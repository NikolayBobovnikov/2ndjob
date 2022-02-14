document.addEventListener('DOMContentLoaded', OnContentLoad);


function OnCreateTabButtonClick(event) {
    window.open("tab.html", "_blank");
}

function OnContentLoad(event){
    document.getElementById('IncrementButton').addEventListener('click', OnIncrementButtonClick);
document.getElementById('DecrementButton').addEventListener('click', OnDecrementButtonClick);
document.getElementById('CreateTabButton').addEventListener('click', OnCreateTabButtonClick);
listenStorage();
    console.log('OnMainPageLoad: ', event);

    // key for the syncronized resource for storing in local storage
    // reset local storage on reloading index page
    localStorage.clear();

    // initialize shared resource
    let initialValue = 0;

    // save to the local storage for further accessing from another browsing contexts.
    localStorage.setItem(window.sharedCounterKey, initialValue);

    // show value on the index page
    document.getElementById("SharedCounter").innerHTML = initialValue;
}