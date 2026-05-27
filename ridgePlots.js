
function RidgePlots(){
    this.name="Ridge Plots";

    var startX;
    var startY;
    var endY;
    var spectrumWidth;
    var speed =0.7;
    var output =[];

    this.oneResize = function(){
        startX=width/5;
        endY=height/5;
        startY=height - endY;
        spectrumWidth = (width/5)*3;
    };
    
    this.oneResize();

    function addWave() {
        var w = fourier.waveform();
        var outputWave = [];
        var smallScale = 3;
        var bigScale = 40;

        for (var i = 0; i < w.length; i++) {
            if (i % 20 == 0) {
                var x = map(i, 0, 1024, startX, startX + spectrumWidth);

                if (i < 1024 * 0.25 || i > 1024 * 0.75) {
                    var y = map(w[i], -1, 1, -smallScale, smallScale);
                    var o = { x: x, y: startY + y };
                    outputWave.push(o);
                } else {
                    var y = map(w[i], -1, 1, -bigScale, bigScale);
                    var o = { x: x, y: startY + y };
                    outputWave.push(o);
                }
            }
        }

        output.push(outputWave);
    }


    this.draw = function() {
        
        //console.log("in ridgeplot draw()");
        background(0);
        stroke(255,255,255);
        strokeWeight(2);

        if (frameCount % 10 == 0) {
            addWave();
        }

        //console.log("output length:"+output.length);
        for (var i = output.length - 1; i >= 0; i--) {
            console.log("in ridgeplot loop");      

            var wave = output[i];
            colorMode(HSB, 360);
            fill(frameCount % 255, 255, 255);
        
            beginShape();
            for (var j = 0; j < wave.length; j++) {
               //console.log("in ridgeplot wave loop:",wave[j].x, wave[j].y);
               wave[j].y -= speed;
               vertex(wave[j].x, wave[j].y);
            }
            endShape();
            if (wave[0].y < endY) {
                output.splice(i, 1);
            }
        }
        colorMode(RGB);
    }
}