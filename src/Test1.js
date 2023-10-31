const canvas = document.getElementById('orbitCanvas');
        const ctx = canvas.getContext('2d');

           // Define the control points for the Bezier curves
           const x0 = 100;
           const y0 = 100;
           const x1 = 200;
           const y1 = 150;
           const x2 = 300;
           const y2 = 100;
   
           


        function getType(x, y) {
            const canvasWidth = 1920;
            const canvasHeight = 1080;
        
            // Calculate the width and height of each region
            const regionWidth = canvasWidth / 3;
            const regionHeight = canvasHeight / 2;
        
            // Calculate the column and row based on the coordinates
            const column = Math.floor(x / regionWidth);
            const row = Math.floor(y / regionHeight);
        
            // Calculate the region number
            const regionNumber = row * 3 + column + 1;
        
            return regionNumber;
        }

        // Create 100 circles with random positions and radii
        const circles = [];
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 10 + 4;
            const intensity = Math.random() * 70 +30 ; // Random intensity for each circle
            const type = getType(x, y);
            circles.push({ x, y, radius, intensity, type});
        }

        function getColorByNumber(number, intensity) {
            switch (number) {
                case 0:
                    return `rgb(255, 0, 0, ${intensity / 100})`; // Red
                case 1:
                    return `rgb(0, 255, 0, ${intensity / 100})`; // Green
                case 2:
                    return `rgb(0, 0, 255, ${intensity / 100})`; // Blue
                case 3:
                    return `rgb(255, 255, 0, ${intensity / 100})`; // Yellow
                case 4:
                    return `rgb(255, 165, 0, ${intensity / 100})`; // Orange
                case 5:
                    return `rgb(128, 0, 128, ${intensity / 100})`; // Purple
                case 6:
                    return `rgb(255, 0, 0, ${intensity / 100})`; // Pink
                default:
                    return `rgb(0, 0, 0, ${intensity / 100})`; // Default to black if the input is out of range
            }
        }

        function getGradyNumber(number, intensity) {

            // Create a radial gradient
                var gradient = ctx.createRadialGradient(200, 200, 50, 200, 200, 150);
                

            switch (number) {
                case 0:
                    gradient.addColorStop(0, `rgb(255, 0, 0, ${intensity / 1000})`); // Inner color
                    gradient.addColorStop(1,`rgb(255, 0, 0, ${intensity / 100})`); // Outer color
                    
                    return gradient; // Red
                case 1:
                    gradient.addColorStop(0, `rgb(0, 255, 0, ${intensity / 1000})`); // Inner color
                    gradient.addColorStop(1,`rgb(0, 255, 0, ${intensity / 100})`); // Outer color
                    
                    return gradient; // Red
                case 2:
                    gradient.addColorStop(0, `rgb(0, 0, 255, ${intensity / 1000})`); // Inner color
                    gradient.addColorStop(1,`rgb(0, 0, 255, ${intensity / 100})`); // Outer color
                    
                    return gradient; // Red
                case 3:
                    return `rgb(255, 255, 0, ${intensity / 100})`; // Yellow
                case 4:
                    return `rgb(255, 165, 0, ${intensity / 100})`; // Orange
                case 5:
                    return `rgb(128, 0, 128, ${intensity / 100})`; // Purple
                case 6:
                    gradient.addColorStop(0, `rgb(255, 0, 0, ${intensity / 1000})`); // Inner color
                    gradient.addColorStop(1,`rgb(255, 0, 0, ${intensity / 100})`); // Outer color
                    
                    return gradient; // Red
                default:
                    return `rgb(0, 0, 0, ${intensity / 100})`; // Default to black if the input is out of range
            }
        }

        function drawCircle(x, y, radius, intensity, type) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = getGradyNumber(x, y, radius, type, intensity)
            //ctx.fillStyle = `rgba(255, 255, 255, ${intensity / 100})`; // Adjust intensity
            ctx.shadowColor = 'white';
            ctx.shadowBlur = 20;
            ctx.fill();
        }

        function animateCircles() {

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const time = new Date().getTime();
            const intensity = (Math.sin(time * 0.001)  * 45 +55  ) ;
            const intensity2 = (Math.sin(time * 0.001+ Math.PI)  * 45 +55  ) ;

            //console.log(time)

            // Update the intensity of circles and draw them with varying intensity
            for (const circle of circles) {
               
                    drawCircle(circle.x, circle.y, circle.radius, intensity, circle.type);
            }

            requestAnimationFrame(animateCircles);
        }

        // Start the animation
        animateCircles();