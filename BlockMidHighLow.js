var rotateThresh;
var progThresh;
var seedThresh;
var boxColour = '#0000FF';
var lineColour = '#00FF00';
var energy1;
var energy2;

function BlockMidHighLow()
{
    this.name = "Block Mid High Low"
    var rot=0;
    var noiseStep=0.01;
    var prog=0;
    
    var gui;
    
    this.setup = function()
    {
        rotateThresh = 67;
        progThresh = 180;
        seedThresh = 100;
        
        gui = createGui('Audio Visualizer');
        gui.setPosition(width-200.0);
        
        sliderRange(0.001,1,0.001);
        gui.addGlobals('noiseStep');
        
        sliderRange(0,255,1);
        gui.addGlobals('rotateThresh');
        gui.addGlobals('progThresh');
        gui.addGlobals('seedThresh');
        
        gui.addGlobals('boxColour');
        gui.addGlobals('lineColour');
    }
    this.setup();
    
    this.onResize = function()
    {
        gui.setPosition(width-200,0);
    }
    this.onResize();
    
    this.draw = function()
    {
        fourier.analyze();
        var b = fourier.getEnergy("bass");
        var t = fourier.getEnergy("treble");
        rotatingBlocks(b);
        noiseLine(b,t);
    }
    function rotatingBlocks(energy)
    {
        if(energy < rotateThresh)
        {
            rot += 0.01;
        }
        
        var r = map(energy, 0, 255, 20, 100);
        
        push();
        rectMode(CENTER);
        translate(width/2, height/2);
        rotate(rot);
        //fill(255,0,0);
        fill(boxColour);
        
        var incr = width/(10 - 1);
        for(var i = 0; i < 10; i++)
        {
            rect(i * incr - width/2,0,r,r);
        }
        pop();
    }
    function noiseLine(energy1,energy2)
    {
        push();
        translate(width/2, height/2);
        
        beginShape();
        noFill();
        //stroke(0,255,0);
        stroke(lineColour);
        strokeWeight(3);
        
        for(var i = 0; i < 100; i++)
        {
            var x = map(noise(i* noiseStep + prog),0,1,-250,250);
            var y = map(noise(i* noiseStep + prog + 1000),0,1,-250,250);
            vertex(x,y);
        }
        endShape();
        
        if(energy1 > progThresh)
        {
            prog += 0.05;
        }
        if(energy2 > seedThresh)
        {
           noiseSeed();
        }
        pop();
    }
    this.isMouseInGUI = function()
    {
        var inGUI = false;
        var gui_x = gui.prototype._panel.style.left;
        var gui_y = gui.prototype._panel.style.top;
        var gui_height = gui.prototype._panel.clientHeight;
        var gui_width = gui.prototype._panel.clientWidth;
        gui_x = parseInt(gui_x,10);
        gui_y = parseInt(gui_y,10);
        gui_height = parseInt(gui_height,10);
        gui_width = parseInt(gui_width,10);
        if(mouseX>gui_x && mouseX<gui_x+gui_width)
        {
            if(mouseY>gui_y && mouseY<gui_y+gui_height)
            {
                inGUI=true;
            }
        }
        return inGUI;
    }
    this.unSelectVisual = function()
    {
        console.log("de select");
        gui.hide();
    }
    this.selectVisual = function()
    {
        console.log("select");
        gui.show();
    }
}