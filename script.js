const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    const selectedCategory = document.getElementById('category').value;
    const selectedNoQuotes = document.getElementById('no-quotes').value;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
        }
    };
    fetch(`https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes?category=${selectedCategory}&limit=${selectedNoQuotes}`, options)
        .then(response => response.json())
        .then(response => {
            const len = Object.keys(response).length;
            append(response,len);
        })
        .catch(err => {
            console.error(err);
            alert("Something went wrong, please try again later");
        })
});

function append(response, len) {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = "";
    for (let i = 0; i < len; i++) {
        let quote = response[i].quote;
        let authorname = response[i].author;
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `<div class="quotes-box">
                                <p class="quote">
                                    <em>" ${quote} "</em>
                                </p>
                                <span class="author"> ~ ${authorname} </span>
                            </div>`;
        mainElement.appendChild(newDiv);
    }
}
