const postsContainer = document.querySelector('.posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

// Number of posts get from fetch
const postsLimit = 5;
// Page counter
let postsPage = 1;

// Fetch posts from API
const getPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${postsLimit}&_page=${postsPage}`);

    const data = await response.json();

    return data;
}

// Update posts in DOM
const updateDOM = async () => {
    const posts = await getPosts();

    // Update DOM with posts
    posts.forEach(post => {
        const postElement = document.createElement('div')
        postElement.classList.add('post');
        postElement.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>`;

        postsContainer.appendChild(postElement);
    });
};

// Fetch new posts and show loader
const addNewPosts = () => {
    // Show loader
    loading.classList.add('show');
    // Hide loader
    setTimeout(() => {
        loading.classList.remove('show');
        // Fetch next posts from API
        setTimeout(() => {
            postsPage++;
            updateDOM();
        }, 300)

    }, 2000);
}

// Filter posts
const filterPosts = (e) => {
    const input = e.target.value.toLowerCase();
    const postsArr = document.querySelectorAll('.post')

    postsArr.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const body = post.querySelector('.post-body').textContent.toLowerCase();

        if (title.indexOf(input) > -1 || body.indexOf(input) > -1) {
            post.style.display = "flex";
        } else {
            post.style.display = "none";
        }
    })
}

updateDOM();

// Event listeners
window.addEventListener('scroll', () => {
    // Destructuring
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        addNewPosts();
    }
})

filter.addEventListener('input', filterPosts);