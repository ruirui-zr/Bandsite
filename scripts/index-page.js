const commentArray = [
    {
        name: "Isaac Tadesse",
        timestamp: 1697774400000,
        content: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    },
    {
        name: "Christina Cabrera",
        timestamp: 1698465600000,
        content: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        name: "Victor Pinto",
        timestamp: 1698897600000,
        content: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    }
]

function createCommentCard(comment) {
    const commentCard = document.createElement("article");
    
    const contentEl = document.createElement("div");
    contentEl.classList.add("form__content");
    commentCard.appendChild(contentEl);

    const avatarEl = document.createElement("div");
    avatarEl.classList.add("form__avatar");
    contentEl.appendChild(avatarEl);

    const commentEl = document.createElement("div");
    commentEl.classList.add("form__comment");
    contentEl.appendChild(commentEl);

    const userEl = document.createElement("div");
    userEl.classList.add("comment-user");
    commentEl.appendChild(userEl);

    // comment content section
    const userNameEl = document.createElement("p");
    userNameEl.classList.add("comment-name");
    userNameEl.innerText = comment.name;
    userEl.appendChild(userNameEl);

    const dateEl = document.createElement("p");
    dateEl.classList.add("comment-date");
    dateEl.innerText = convertToDateString(comment.timestamp);
    userEl.appendChild(dateEl);

    const commentContentEl = document.createElement("p");
    commentContentEl.classList.add("comment-content");
    commentContentEl.innerText = comment.content;
    commentEl.appendChild(commentContentEl);


    const dividerEl = document.createElement("hr");
    dividerEl.classList.add("divider");
    commentCard.appendChild(dividerEl);

    return commentCard;
}

function renderAllCommments() {
    const commentListEl = document.querySelector("ul");
    commentListEl.innerHTML = "";

    commentArray.forEach((comment) =>{
        const card = createCommentCard(comment);

        commentListEl.insertBefore(card, commentListEl.firstChild);
    })
}

function handleFormSubmit(event) {
    event.preventDefault();

    const userName = event.target.name.value;
    const commentContent = event.target.comment.value;

    if(userName === "" || commentContent === "" ){
        return
    }

    const now = Date.now();
    const comment = {
        name: userName,
        timestamp: now,
        content: commentContent
    };

    commentArray.push(comment);
    renderAllCommments();
    formEl.reset();
}

function convertToDateString(timestamp){
    const now = new Date();
    const commentDate = new Date(timestamp); 

    const timeDifference = Math.abs(now - commentDate);

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 3) {
        return 'Just now'
    } else if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 7) {
        return `${days} days ago`;
    } else if (weeks < 5) {
        return `${weeks} weeks ago`;
    } else if (months < 12) {
        return `${months} months ago`;
    } else {
        return `${years} years ago`;
    }
}

const formEl = document.querySelector('form');
formEl.addEventListener("submit", handleFormSubmit);

renderAllCommments();