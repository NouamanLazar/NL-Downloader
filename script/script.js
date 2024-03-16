console.log("working");

const getData = async (e) => {
    e.preventDefault();
    // code to get data
    let querry = document.getElementsByClassName("searchbar")[0].value
    let id = '';

    if (querry == '') {
        console.log("no url");
        return
    }

    try {
        if (querry.includes('watch?v=')) {

            id = querry.split('=')[1]
            console.log('has')
        }
        else {
           
            // Find the index of the last occurrence of "/"
            let lastSlashIndex = querry.lastIndexOf("/");

            let url = querry.slice(0, lastSlashIndex + 1) + "=" + querry.slice(lastSlashIndex + 1);
            id = url.split('=')[1]
            console.log(id);

        }
        console.log(id);

    } catch (error) {
        console.log('check your link again',error);
        return
    }

    const url = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd40c265118mshdc90194a533aa99p18842bjsn18247c206e8e',
            'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        setData(result)
    } catch (error) {
        console.error(error);
    }
}
const setData = (data) => {
    let container = document.getElementsByClassName('container')[0];
    container.innerHTML = '';

    if (data && data.formats) {
        for (let i = 0; i < data.formats.length; i++) {
            let item = `
            <div class="item">
                <img src="${data.thumbnail[1].url}" class="thumbnail" alt="">
                <div class="info">
                    <p class="name">${data.title}</p>
                    <div class="action">
                        <p class="video-resolution">Quality: ${data.formats[i].qualityLabel}</p>
                        <a href="${data.formats[i].url}" download="${data.title}_${data.formats[i].qualityLabel}.mp4">
                            <button>Go</button>
                        </a>
                    </div>
                </div>
            </div>`;
            container.innerHTML += item;
        }
    } else {
        console.error('No data or data.formats array is undefined');
    }
}
