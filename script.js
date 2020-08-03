const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get Quote from API
async function getQuote(){
    showLoadingSpinner();
    const proxyURL = 'https://pure-reef-51423.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        if(data.quoteAuthor === ''){
            data.quoteAuthor = 'Unknown'
        }
        else{
            authorText.innerText = data.quoteAuthor;
        }
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote')
        }
        else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch (error) {       
        getQuote()
        
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuote()