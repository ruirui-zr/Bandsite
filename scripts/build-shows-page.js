const showsListArray = [
    {
        dateInfo: "Mon Sept 09 2024",
        venueInfo: "Ronald Lane",
        locationInfo: "San Francisco, CA"
    },
    {
        dateInfo: "Tue Sept 17 2024",
        venueInfo: "Pier 3 East",
        locationInfo: "San Francisco, CA"
    },
    {
        dateInfo: "Sat Oct 12 2024",
        venueInfo: "View Lounge",
        locationInfo: "San Francisco, CA "
    },
    {
        dateInfo: "Sat Nov 16 2024",
        venueInfo: "Hyatt Agency",
        locationInfo: "San Francisco, CA "
    },
    {
        dateInfo: "Fri Nov 29 2024",
        venueInfo: "Moscow Center",
        locationInfo: "San Francisco, CA "
    },
    {
        dateInfo: "Wed Dec 18 2024",
        venueInfo: "Press Club",
        locationInfo: "San Francisco, CA "
    }]


// Buy Tickets

const showsList = document.querySelector(".shows-list"); // Assuming showsList is the <ul> or parent container element

for (let i = 0; i < showsListArray.length; i++) {
    // article
    let article = document.createElement("article");
    article.classList.add("shows-block");

    // date div
    let dateDiv = document.createElement("div");
    dateDiv.classList.add("shows-info");

    let dateTitle = document.createElement("p");
    dateTitle.classList.add("shows__title", "shows__title--modified");
    dateTitle.textContent = "DATE"

    let dateInfo = document.createElement("p");
    dateInfo.classList.add("shows__detail", "shows__detail--modified");
    dateInfo.textContent = showsListArray[i].dateInfo;

    dateDiv.appendChild(dateTitle);
    dateDiv.appendChild(dateInfo);

    // venue div
    let venueDiv = document.createElement("div");
    venueDiv.classList.add("shows-info");

    let venueTitle = document.createElement("p");
    venueTitle.classList.add("shows__title");
    venueTitle.textContent = "VENUE"

    let venueInfo = document.createElement("p");
    venueInfo.classList.add("shows__detail");
    venueInfo.textContent = showsListArray[i].venueInfo;

    venueDiv.appendChild(venueTitle);
    venueDiv.appendChild(venueInfo);

    // location div
    let locationDiv = document.createElement("div");
    locationDiv.classList.add("shows-info");

    let locationTitle = document.createElement("p");
    locationTitle.classList.add("shows__title", "shows__title--modified");
    locationTitle.textContent = "LOCATION"

    let locationInfo = document.createElement("p");
    locationInfo.classList.add("shows__detail", "shows__detail--modified");
    locationInfo.textContent = showsListArray[i].locationInfo;

    locationDiv.appendChild(locationTitle);
    locationDiv.appendChild(locationInfo);

    // button
    let ticketButton = document.createElement("button");
    ticketButton.classList.add("ticket-button");
    ticketButton.textContent = "BUY TICKETS";

    // Append all
    article.appendChild(dateDiv);
    article.appendChild(venueDiv);
    article.appendChild(locationDiv);
    article.appendChild(ticketButton);

    // divider
    let divider = document.createElement("hr");
    divider.classList.add("divider");

    // Append the article and divider to the shows list
    showsList.appendChild(article);
    showsList.appendChild(divider);
}

