// this function will be used to search an event by its name

function searchEventByName(){
    // get the event name that was input by the user
    let eventName = document.getElementById('event-name').value;
    window.location = '/tickets/search/' + encodeURI(eventName);   
}