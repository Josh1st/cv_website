import showHide from "./show_hide.js";
import run_p5 from "./p5.js";

showHide('.knowledge-button', 'knowledge');

showHide('.project-button', 'project');

document.addEventListener('DOMContentLoaded',()=>{
    run_p5('#header_rain');
    run_p5('#about_rain', true);
})
