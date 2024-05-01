function make_rain(selector, dark=false) {
    let container = document.querySelector(selector);
    var canvas = document.createElement('canvas');
    container.innerHTML = '';
    container.appendChild(canvas);
    let height = container.clientHeight;
    let width = container.clientWidth;
    canvas.height = height
    canvas.width = width
    const ctx = canvas.getContext('2d');

    const imageData = ctx.createImageData(canvas.width, canvas.height);

    let pixels = [];

    // the ammount of pixels displayed is set by the area of the canvas
    let ammount = limitNumberWithinRange(Math.floor(width * height * 0.00002), 10, 50)


    for (let i = 0; i < ammount; i++) {
        pixels.push(generate_pixel(width, height))
    }

    function draw(ctx, imageData) {

        // this makes the fades the background out so that
        // the particles are not one solid line
        // it make a streak effect
        if (dark) {
            darkenImageData(imageData, 5)
        } else{
            whitenImageData(imageData, 5);
        }
        
        for (const pixel_index in pixels) {
            let pixel = pixels[pixel_index];

            // adding one to each moves the pixel in a 45deg angle
            pixel.x++;
            pixel.y++;

            // move the pixel to another random spot 
            // if it is outside the canvas
            if (pixel.x > width || pixel.y > height) {
                pixels[pixel_index] = generate_pixel(width, height);
                pixel = pixels[pixel_index];
            }

            // draw a white or back pixel
            if (dark) {
                drawPixel(imageData, pixel.x, pixel.y, 255) 
            } else {
                drawPixel(imageData, pixel.x, pixel.y, 0)
            }
        }

        // add the image data back into the canvas
        ctx.putImageData(imageData, 0, 0);
    }

    // make sure to return the setInterval so we can
    // clear it on resize
    return setInterval(function () {
        draw(ctx, imageData);
    }, 50);
}

// draws a pixel on the imageData which gets passed
// to the canvas
function drawPixel(imageData, x, y, color = 0) {
    // Check if coordinates are within imageData bounds
    if (x < 0 || x >= imageData.width || y < 0 || y >= imageData.height) {
        // Do nothing if outside the canvas
        return;
    }

    // Calculate pixel offset in the array
    // (convert x and y to the index in imageData.data)
    const offset = (y * imageData.width + x) * 4;

    imageData.data[offset] = color; // Set Red to 0 (black) || 255 (white)
    imageData.data[offset + 1] = color; // Set Green to 0 (black) || 255 (white)
    imageData.data[offset + 2] = color; // Set Blue to 0 (black) || 255 (white)
    imageData.data[offset + 3] = 255; // Set Alpha to 255 (fully opaque)
}

function whitenImageData(imageData, amount) {
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Loop through each pixel (RGBA values)
        // and add the ammount to the color to make it whiter
        data[i] = Math.min(data[i] + amount, 255); // Red
        data[i + 1] = Math.min(data[i + 1] + amount, 255); // Green
        data[i + 2] = Math.min(data[i + 2] + amount, 255); // Blue

        // Alpha (opacity) is left unchanged
    }
}

function darkenImageData(imageData, amount) {
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Loop through each pixel (RGBA values)
        // and subtract the ammount to the color to make it darker
        data[i] = Math.min(data[i] - amount, 255); // Red
        data[i + 1] = Math.min(data[i + 1] - amount, 255); // Green
        data[i + 2] = Math.min(data[i + 2] - amount, 255); // Blue

        // Alpha (opacity) is left unchanged
    }
}


function generate_pixel(width, height) {
    let x = Math.floor(Math.random() * width)
    let y = Math.floor(Math.random() * height)
    return { x, y }
}

function limitNumberWithinRange(num, min, max){
    const MIN = min ?? 1;
    const MAX = max ?? 20;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
  }

// make it rain 🕺
export default make_rain