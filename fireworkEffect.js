function fireworkEffect()
{
    this.name = "firework";
    
    this.setup = function()
    {
        background(0);
        angleMode(DEGREES);
        frameRate(60);
        beatDetect = new BeatDetect();
    }
    this.setup();
    
    this.draw = function()
    {
        background(0);
        var spectrum = fourier.analyze();
        if(beatDetect.detectBeat(spectrum))
        {
            fill(255,0,0);
            ellipse(width/2,height/2,300,300);
        }
    }
}