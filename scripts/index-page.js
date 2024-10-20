const api_key = "756a6f6d-35ad-424c-81aa-e12a0616cce1"; 
const bandsite = new BandSiteApi(api_key)
let commentArray;

function createCommentCard(comment) {
    const commentCard = document.createElement("article");
    commentCard.id = comment.id;
    
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
    commentContentEl.innerText = comment.comment;
    commentEl.appendChild(commentContentEl);
    
    const likeButtonEl = document.createElement("button");
    likeButtonEl.classList.add("like-button");

    const likeIconEl = document.createElement("img");
    likeIconEl.classList.add("comment-icon");
    likeIconEl.setAttribute("src", "./assets/icons/png/heart_empty.png")
    likeIconEl.id = "likeIcon";
    likeButtonEl.appendChild(likeIconEl);

    const likedIconEl = document.createElement("img");
    likedIconEl.classList.add("comment-icon");
    likedIconEl.classList.add("hidden");
    likedIconEl.id = "likedIcon";
    likedIconEl.setAttribute("src", "./assets/icons/png/heart_filled.png")
    likeButtonEl.appendChild(likedIconEl);
    likeButtonEl.commentId = comment.id;
    likeButtonEl.addEventListener("click", handleLike)

    commentCard.appendChild(likeButtonEl);

    const likeNumberEl = document.createElement("span");
    likeNumberEl.innerText = comment.likes;
    likeButtonEl.appendChild(likeNumberEl);

    const deleteButtonEl = document.createElement("button");
    deleteButtonEl.classList.add("delete-button");
    commentCard.appendChild(deleteButtonEl);

    const deleteIconEl = document.createElement("img");
    deleteIconEl.classList.add("comment-icon");
    deleteIconEl.setAttribute("src", "./assets/icons/SVG/icon-delete.svg")
    deleteButtonEl.appendChild(deleteIconEl);
    deleteButtonEl.commentId = comment.id;
    deleteButtonEl.addEventListener("click", handleDelete)


    const dividerEl = document.createElement("hr");
    dividerEl.classList.add("divider");
    commentCard.appendChild(dividerEl);
    
    return commentCard;
}

async function handleLike(event){
    const buttonEl = event.currentTarget;
    const comment = await bandsite.likeComment(event.currentTarget.commentId);
    buttonEl.querySelector("#likeIcon").classList.add("hidden");
    buttonEl.querySelector("#likedIcon").classList.remove("hidden");
    buttonEl.disabled = true;
    buttonEl.querySelector('span').innerText = comment.likes;
}

async function handleDelete(event){
    const comment = await bandsite.deleteComment(event.currentTarget.commentId);
    console.log(comment)
    document.getElementById(comment.id).remove();
}

function renderAllCommments() {
    const commentListEl = document.querySelector("ul");
    commentListEl.innerHTML = "";

    // sort comments according to timestamp
    commentArray.sort((a, b) => {
        return a.timestamp - b.timestamp
    })

    commentArray.forEach((comment) =>{
        const card = createCommentCard(comment);

        commentListEl.insertBefore(card, commentListEl.firstChild);
    })
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const userName = event.target.name.value;
    const commentContent = event.target.comment.value;

    if(userName === "" || commentContent === "" ){
        return
    }

    const comment = {
        name: userName,
        comment: commentContent
    };

    await bandsite.postComment(comment);
    await refreshComments();
    const formEl = document.querySelector('form');
    formEl.reset();
}

async function refreshComments() {
    commentArray = await bandsite.getComments();
    renderAllCommments();
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
    } else if (months <= 12) {
        return `${months} months ago`;
    } else {
        return `${years} years ago`;
    }
}



async function main() {
    commentArray = await bandsite.getComments();

    const formEl = document.querySelector('form');
    formEl.addEventListener("submit", handleFormSubmit);

    renderAllCommments();
}

main();