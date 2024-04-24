

function showHide (buttonSelector, generalSelector) {
    let buttons = document.querySelectorAll(buttonSelector)
    for (const button of buttons) {
        button.addEventListener('click', handleClick)
    }

    function handleClick (event) {
        console.log(event);
        let button = event.target
        let buttons = document.querySelectorAll(`.${generalSelector}-button`);
        let contentItems = document.querySelectorAll(`.${generalSelector}-content`);
        let showItems = button.getAttribute('show');
        showItems = showItems.split(',');


        // hide all the content elements
        for (const contentItem of contentItems) {
            contentItem.classList.add('d-none')
        }

        // show all the ids that need to be shown
        for (const showItem of showItems) {
            // use a try catch incase the element does not exist
            // so the the elements that do exist will be processed
            try {
                let item = document.querySelector(`#${showItem}`);
                item.classList.remove('d-none');
            } catch (error) {
                console.error(error);
            }
        }
        
        // remove underline from all buttons
        for (const button of buttons) {
            button.classList.remove('underline')
        }

        // add underline to our target button
        button.classList.add('underline')
       
    }

}

export default showHide;