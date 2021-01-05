const paragraph = document.getElementById('message');

function getMessage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const error = parseInt(urlParams.get('error'));
    const url = urlParams.get('url')

    if(isNaN(error)) {
        if(url === null) {
            return
        } else {
            paragraph.innerHTML = `Short url: <a href="${url}">${url}</a>`;
        }
    }

    switch (error) {
        case 0:
            paragraph.textContent = 'That wasn\'t a valid url';
            break;
        case 1:
            paragraph.textContent = 'That link doesn\'t exist'
    }
    paragraph.style.background = "#111";
}

getMessage();
