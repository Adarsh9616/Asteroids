// alert("JS Loaded");

let startBtn=document.querySelector(".btn");
let box=document.querySelector(".box");

let canvas=document.querySelector(".board");

let tool=canvas.getContext("2d");
canvas.height=window.innerHeight-4.5;
canvas.width=window.innerWidth-4.5;
let spaceImage=new Image();
spaceImage.src="space.jpg";
let earthImg=new Image();
earthImg.src="earth.png";

class Planet
{
    constructor(x,y,width,height)
    {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }
    draw()
    {
        tool.drawImage(earthImg,this.x,this.y,this.width,this.height);
    }
}
class Bullet
{
    constructor(x,y,width,height,velocity)
    {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.velocity=velocity;
    }
    draw()
    {
        tool.fillStyle="white";
        tool.fillRect(this.x,this.y,this.width,this.height);
    }
    update()
    {
        this.draw();
        this.x=this.x+this.velocity.x;
        this.y=this.y+this.velocity.y;
    }
}
let bullets=[];
startBtn.addEventListener("click",function(e)
{
    e.stopImmediatePropagation();
    box.style.display="none";
    tool.fillRect(0,0,canvas.width,canvas.height);
    tool.drawImage(spaceImage,0,0,canvas.width,canvas.height);
    let eHeight=200;
    let eWidth=200;
    let ePosX=canvas.width/2-100;
    let ePosY=canvas.height/2-100;
    let earth=new Planet(ePosX,ePosY,eWidth,eHeight); 
    earth.draw();
    window.addEventListener("click",function(e){
        console.log(e);
        console.log("clicked");
        let bullet=new Bullet(e.clientX,e.clientY,7,7);
        bullet.draw()
        bullets.push(bullet);
    });
});