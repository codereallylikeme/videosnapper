// Global Variables
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

    //Dom Elements
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const photos = document.getElementById('photos');
    const photoButton = document.getElementById('photo-button');
    const clearButton = document.getElementById('clear-button');
    const photoFilter = document.getElementById('photo-filter');

    // Get Media stream
    navigator.mediaDevices.getUserMedia({video: true, audio: false}
    )
        .then(function(stream) {
            // Link to the video source
            video.srcObject = stream;
            video.play();

        })
        .catch(function(err) {
           console.log(`Error: ${err}`);
        });

        // play when ready
        video.addEventListener('canplay', function(e){
        if(!streaming){
            // Set video / canvas height
            height = video.videoHeight / (video.videoWidth / width);
        
             video.setAttribute('width', width);
             video.setAttribute('height', this.scrollHeight);
             canvas.setAttribute('width', width);
             canvas.setAttribute('height', height);
        
        
        
        
        streaming = true;
        }
        }, false);

        // Photo button event
        photoButton.addEventListener('click', function(e){
         takePicture();

         e.preventDefault();
        }, false);

        // Filter event
        photoFilter.addEventListener('change', function(e) {
         // set the filter to chosen option
            filter = e.target.value;
            //Set the filter to video
            video.style.filter = filter;
            e.preventDefault();
        });

        // Clear Photo
        clearButton.addEventListener('click', function(){
            // Clear Photos
            photos.innerHTML= '';
            // change filter back to Normal
            filter = 'none';
            video.style.filter = filter;
            // Reset select list 
            photoFilter.selectedIndex = 0;
        });
               // Take picture from canvas
          function takePicture(){
            // create canvas
            const context = canvas.getContext('2d');
            if(width && height){
                // st canvas props
                canvas.width = width;
                canvas.height = height;
                // Draw an image of the video on the canvas
                context.drawImage(video, 0, 0, width, height)
             
              const imgUrl = canvas.toDataURL('image/png');

              // Create img element
              const img = document.createElement('img');
              // Set img src
              img.setAttribute('src', imgUrl);
              // Set the image to the filter
              img.style.filter = filter;

              // Add image to photos
              photos.appendChild(img);
            }

        }