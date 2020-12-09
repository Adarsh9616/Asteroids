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
let coronaImg=new Image();
coronaImg.src="Asteroid.png";

class Corona
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
        tool.drawImage(coronaImg,this.x,this.y,this.width,this.height);
    }
    update()
    {
        this.draw();
        this.x=this.x+this.velocity.x;
        this.y=this.y+this.velocity.y;
    }
}
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
let eHeight=200;
let eWidth=200;
let ePosX=canvas.width/2-95;
let ePosY=canvas.height/2-100;
let bullets=[];
let coronas=[];
function animate()
{
    tool.clearRect(0,0,canvas.width,canvas.height);
    tool.fillRect(0,0,canvas.width,canvas.height);
    tool.drawImage(spaceImage,0,0,canvas.width,canvas.height);
    let earth=new Planet(ePosX,ePosY,eWidth,eHeight); 
    earth.draw();
    let bLength=bullets.length;
    for(let i=0;i<bLength;i++)
    {
        bullets[i].update();
        console.log(bullets);
        if(bullets[i].x<0||bullets[i].y<0||bullets[i].x>canvas.width||bullets[i].y>canvas.height)
        {
            setTimeout(function(){
                bullets.splice(i,1);
            });

        }
    }
    let cLength=coronas.length;
    for(let i=0;i<cLength;i++)
    {
        coronas[i].update();
        // console.log(bullets);
        // if(bullets[i].x<0||bullets[i].y<0||bullets[i].x>canvas.width||bullets[i].y>canvas.height)
        // {
        //     setTimeout(function(){
        //         bullets.splice(i,1);
        //     });

        // }
    }
    requestAnimationFrame(animate);
}
function createCorona()
{
    setInterval(() => {
        let x=Math.random()*canvas.width;
        let y=Math.random()*canvas.height;
        let delta=Math.random();
        if(delta<0.5)
        {
            x=Math.random()<0.5?0:canvas.width;
            y=Math.random()*canvas.height;
        }
        else
        {
            y=Math.random()<0.5?0:canvas.height;
            x=Math.random()*canvas.width;
        }
        let angle=Math.atan2(canvas.height/2-50-y,canvas.width/2-50-x);
        let velocity={
            x:Math.cos(angle)*2,
            y:Math.sin(angle)*2
        }
        let corona=new Corona(x,y,100,100,velocity);
        coronas.push(corona);
    }, 1000);
}
startBtn.addEventListener("click",function(e)
{
    e.stopImmediatePropagation();
    box.style.display="none";
    tool.fillRect(0,0,canvas.width,canvas.height);
    tool.drawImage(spaceImage,0,0,canvas.width,canvas.height);
    let earth=new Planet(ePosX,ePosY,eWidth,eHeight); 
    earth.draw();
    animate();
    createCorona();
    window.addEventListener("click",function(e){
        console.log(e);
        console.log("clicked");
        let angle=Math.atan2(e.clientY-canvas.height/2,e.clientX-canvas.width/2);
        let velocity={
            x:Math.cos(angle)*4,
            y:Math.sin(angle)*4
        }
        let bullet=new Bullet(canvas.width/2,canvas.height/2,7,7,velocity);
        bullets.push(bullet);
        
    });
});