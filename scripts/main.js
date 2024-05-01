import showHide from "./show_hide.js";
import make_rain from "./rain.js";

showHide('.knowledge-button', 'knowledge');
showHide('.project-button', 'project');

let rain1 = null;
let rain2 = null;

document.addEventListener('DOMContentLoaded',()=>{
    rain1 = make_rain('#header_rain');
    rain2 = make_rain('#about_rain', true);

    // credit to https://micku7zu.github.io/vanilla-tilt.js/
    VanillaTilt.init(document.querySelectorAll(".image-border, .gradient-border-thick"), {
		max: 5,
		speed: 100
	});

    VanillaTilt.init(document.querySelectorAll(".btn-border"), {
		max: 10,
		speed: 100
	});

})

window.addEventListener("resize", () => {

    try {
        // clear the internal so that we don't have duplicates
        // running in the background
        clearInterval(rain1);
        rain1 = null;
    } catch (error) {
        console.error(console.error(error));
    }
    
    try {
        clearInterval(rain2);
        rain2 = null
    } catch (error) {
        console.error(console.error(error));
    }

    // re-initalise the rain maker
    rain1 = make_rain('#header_rain');
    rain2 = make_rain('#about_rain', true);
});
