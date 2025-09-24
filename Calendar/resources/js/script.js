
const Event_Map = new Map();
let toDelete = [];



function updateLocationOptions(value) {


    if (value == "In-Person") {
        document.getElementById("Event_Location_InPerson_Container").style.display = "block";
        document.getElementById("Event_Location_Remote_Container").style.display = "none";

    }
    else if (value == "Remote") {
        document.getElementById("Event_Location_Remote_Container").style.display = "block";
        document.getElementById("Event_Location_InPerson_Container").style.display = "none";

    }
}


let input = document.getElementById("Event_Location_Remote_Input");
let inputButton = document.getElementById("Hidden_Submit");
input.addEventListener("focusout", function () {
    if (!input.checkValidity()) {
        input.reportValidity();
    }
});

function saveEvent() {
    const EventDetails = {
        name: "",
        category: "",
        weekday: "",
        time: "",
        modality: "",
        location: "",
        remote_url: "",
        attendees: "",
        edit: false
    };
    EventDetails.name = document.getElementById("Event_Name").value;
    EventDetails.category = document.getElementById("Event_Category").value;
    EventDetails.weekday = document.getElementById("Event_Weekday").value;
    EventDetails.time = document.getElementById("Event_Time").value;
    EventDetails.modality = document.getElementById("Event_Modality").value;
    EventDetails.location = document.getElementById("Event_Location_In-Person_Input").value;
    EventDetails.remote_url = document.getElementById("Event_Location_Remote_Input").value;
    EventDetails.attendees = document.getElementById("Event_Attendees").value;
    clearEvent();

    if (toDelete.length !== 0) {
        replaceCard(toDelete.pop());
    }
    addEventToCalender(EventDetails);
}
function clearEvent() {
    let form = document.getElementById("Event_Form");
    form.reset();

}
function addEventToCalender(EventDetails) {
    let Event_Card = createEventCard(EventDetails);
    document.getElementById(EventDetails.weekday.toLowerCase()).appendChild(Event_Card);
}
function createEventCard(EventDetails) {
    let Event_Element = document.createElement('div');
    Event_Element.classList = 'event row border rounded m-1 py-1';
    let Event_Info = document.createElement('div');
    let Info_String = getInfoString(EventDetails);

    // if (Event_Element.id) {
    //     replaceCard(Event_Element.id);
    // }

    Event_Element.id = createEventId(EventDetails);
    Event_Element.setAttribute("onclick", "updateSavedEvent(this.id)");
    Event_Info.innerHTML = Info_String;
    setBGColor(Event_Element, EventDetails.category);
    Event_Element.appendChild(Event_Info);
    addToMap(Event_Element.id, EventDetails);
    return Event_Element;

}
function getInfoString(EventDetails) {
    let name = EventDetails.name;
    let time = EventDetails.time;
    let location = EventDetails.location;
    let remote_url = EventDetails.remote_url;
    let attendees = EventDetails.attendees;

    if (location == "") {
        location = remote_url;
    }
    let Info_String = `<span style = "font-weight:bold">Event Name:</span><br>
    ${name}<br>
    <span style = "font-weight:bold">Event Time:</span><br>
    ${time}<br>
    <span style = "font-weight:bold">Event Location:</span><br>
    ${location}<br>
    <span style = "font-weight:bold">Attendees:</span><br>
    ${attendees}`;
    return Info_String;
}
function getData(EventDetails) {
    let name = EventDetails.name;
    let category = EventDetails.category;
    let weekday = EventDetails.weekday;
    let time = EventDetails.time;
    let modality = EventDetails.modality;
    let location = EventDetails.location;
    let remote_url = EventDetails.remote_url;
    let attendees = EventDetails.attendees;

    if (location == "") {
        location = remote_url;
    }
    let Info_String = `${name}${time}${location}${attendees}${weekday}${modality}${category}`;
    return Info_String;
}
function setBGColor(element, category) {
    switch (category) {

        case "Academic":
            //save this for a dark mode
            // element.style.backgroundColor="#132276ff";
            // element.style.color="white";
            element.style.background = "#58b0cbff";
            break;
        case "Work":
            element.style.background = "#B358CF";
            break;
        case "Volunteer & Clubs":
            element.style.background = "#CF7758";
            break;
        case "Social":
            element.style.background = "#75CF58";
            break;
        default:
            console.log("error");
    };
}


function updateSavedEvent(Event_ID) {

    toDelete.push(Event_ID);
    let Selected_Event = Event_Map.get(Event_ID);
    document.getElementById("Create_Event_Button").click();
    document.getElementById("Event_Name").value = Selected_Event.name;
    document.getElementById("Event_Category").value = Selected_Event.category;
    document.getElementById("Event_Weekday").value = Selected_Event.weekday;
    document.getElementById("Event_Time").value = Selected_Event.time;
    document.getElementById("Event_Modality").value = Selected_Event.modality;
    if (document.getElementById("Event_Modality").value == "In-Person") {
        document.getElementById("Event_Location_In-Person_Input").value = Selected_Event.location;
    }
    else {
        document.getElementById("Event_Location_Remote_Input").value = Selected_Event.location;
    }
  
    document.getElementById("Event_Attendees").value = Selected_Event.attendees;




}
function createEventId(EventDetails) {
    let timestamp = Math.floor(Date.now());
    const p = 31;       // a small prime
    const m = 1e9 + 9;  // a large prime modulus
    let n = 0;
    let power = 1;
    let Event_Data = getData(EventDetails) + timestamp;
    for (let i = 0; i < Event_Data.length; i++) {
        n = (n + (Event_Data.charCodeAt(i) * power) % m) % m;
        power = (power * p) % m;
    }

    return n;
}

function replaceCard(Event_ID) {
    let node = document.getElementById(Event_ID);
    node.parentNode.removeChild(node);
}
function addToMap(Event_ID, EventDetails) {
    Event_Map.set(Event_ID, EventDetails);
}
