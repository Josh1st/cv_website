import showHide from "./show_hide.js";
import run_p5 from "./p5.js";

showHide('.knowledge-button', 'knowledge');

showHide('.project-button', 'project');

let p5_obj = null;
let p5_obj2 = null;

document.addEventListener('DOMContentLoaded',()=>{
    p5_obj = run_p5('#header_rain');
    p5_obj2 = run_p5('#about_rain', true);
})

window.addEventListener("resize", () => {

    try {
        p5_obj.remove();
        p5_obj = null
    } catch (error) {
        console.error(console.error(error));
    }
    
    try {
        p5_obj2.remove();
        p5_obj2 = null
    } catch (error) {
        console.error(console.error(error));
    }

    p5_obj = run_p5('#header_rain');
    p5_obj2 = run_p5('#about_rain', true);
});
