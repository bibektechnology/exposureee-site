
/* MOBILE MENU */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* YOUTUBE RSS FEED */
const CHANNEL_ID = "UCw7w_M4BOvpu8FF5IAoFkAQ";

async function loadVideos() {

    const container = document.getElementById("videoContainer");

    try {

        const rssUrl =
        `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

        const api =
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(api);
        const data = await response.json();

        const videos = data.items.slice(0, 3);

        container.innerHTML = "";

        videos.forEach(video => {

            let videoId = "";

            if(video.guid){
                const match = video.guid.match(/video:([a-zA-Z0-9_-]+)/);
                if(match) videoId = match[1];
            }

            if(!videoId && video.link){
                const url = new URL(video.link);
                videoId = url.searchParams.get("v");
            }

            const card = document.createElement("div");
            card.className = "video-card";

            card.innerHTML = `
                <iframe
                src="https://www.youtube.com/embed/${videoId}"
                allowfullscreen></iframe>

                <div class="video-info">
                    <h3>${video.title}</h3>
                </div>
            `;

            container.appendChild(card);
        });

    } catch(error){

        console.error(error);

        container.innerHTML = `
        <div class="card">
            Unable to load videos at the moment.
        </div>
        `;
    }
}

loadVideos();

/* CONTACT FORM */
document.querySelector(".contact-form")
.addEventListener("submit", function(e){
    e.preventDefault();
    alert("Thank you! Your message has been received.");
});
