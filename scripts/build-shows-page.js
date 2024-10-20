const api_key = "756a6f6d-35ad-424c-81aa-e12a0616cce1";
const bandsite = new BandSiteApi(api_key)

let showsListArray;

function toDate(timestamp) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const date = new Date(timestamp);
    
    const dayName = daysOfWeek[date.getDay()];
    const monthName = monthsOfYear[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${dayName} ${monthName} ${day} ${year}`;
}

function renderShows() {
    const showsList = document.querySelector(".shows-list");

    for (let i = 0; i < showsListArray.length; i++) {
        // article
        let article = document.createElement("article");
        article.classList.add("shows-block");
        article.addEventListener("click", function () {
            document.querySelectorAll("article").forEach(function (el) {
                el.classList.remove("active");
            });
            this.classList.toggle("active");
        })

        // date div
        let dateDiv = document.createElement("div");
        dateDiv.classList.add("shows-info");

        let dateTitle = document.createElement("p");
        dateTitle.classList.add("shows__title", "shows__title--modified");
        dateTitle.textContent = "DATE"

        let dateInfo = document.createElement("p");
        dateInfo.classList.add("shows__detail", "shows__detail--modified");
        dateInfo.textContent = toDate(showsListArray[i].date);

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
        venueInfo.textContent = showsListArray[i].place;

        venueDiv.appendChild(venueTitle);
        venueDiv.appendChild(venueInfo);

        // location div
        let locationDiv = document.createElement("div");
        locationDiv.classList.add("shows-info");

        let locationTitle = document.createElement("p");
        locationTitle.classList.add("shows__title");
        locationTitle.textContent = "LOCATION"

        let locationInfo = document.createElement("p");
        locationInfo.classList.add("shows__detail");
        locationInfo.textContent = showsListArray[i].location;

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
}

async function main() {
    showsListArray = await bandsite.getShows()
    console.log(showsListArray);

    renderShows();
}

main()