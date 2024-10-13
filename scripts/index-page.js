const commentArray = [
    {
        name: "Isaac Tadesse",
        date: "10/20/2023",
        content: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    },
    {
        name: "Christina Cabrera",
        date: "10/28/2023",
        content: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        name: "Victor Pinto",
        date: "11/02/2023",
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
    dateEl.innerText = comment.date;
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

    const date = createDate();
    const comment = {
        name: userName,
        date: date,
        content: commentContent
    };

    commentArray.push(comment);
    renderAllCommments();
    formEl.reset();
}

function createDate(){
    const date = new Date();

    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();

    const formattedDate = `${mm}/${dd}/${yyyy}`;
    return formattedDate;
}

const formEl = document.querySelector('form');
formEl.addEventListener("submit", handleFormSubmit);

renderAllCommments();