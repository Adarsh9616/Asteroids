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
class Particle
{
    constructor(x,y,radius,velocity)
    {
        this.x=x;
        this.y=y;
        this.velocity=velocity;
        this.radius=radius;
        this.alpha=1;
    }
    draw()
    {
        tool.save();
        tool.globalAlpha=this.alpha;
        tool.beginPath();
        tool.fillstyle="white";
        tool.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        tool.fill();
        tool.restore();
    }
    update()
    {
        this.draw();
        this.x=this.x+this.velocity.x;
        this.y=this.y+this.velocity.y;
        this.alpha-=0.01;
    }
}
let eHeight=200;
let eWidth=200;
let ePosX=canvas.width/2-95;
let ePosY=canvas.height/2-100;
let bullets=[];
let coronas=[];
let particles=[];
let animId;
function animate()
{
    tool.clearRect(0,0,canvas.width,canvas.height);
    tool.fillRect(0,0,canvas.width,canvas.height);
    tool.drawImage(spaceImage,0,0,canvas.width,canvas.height);
    let earth=new Planet(ePosX,ePosY,eWidth,eHeight); 
    earth.draw();
    particles.forEach(function(particle,index){
        if(particle.alpha<=0)
        {
            setTimeout(function(){
                particles.splice(index,1);
            },0);
        }
        else
        {
            particle.update();
        } 
    });
    let bLength=bullets.length;
    for(let i=0;i<bLength;i++)
    {
        bullets[i].update();
        //console.log(bullets);
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
        //creating collisions
        let enemy = coronas[i];
        if(colRect(earth,enemy))
        {
            cancelAnimationFrame(animId);
            alert("Game Over");
        }
        bullets.forEach(function(bullet,bulletIndex){
            if(colRect1(bullet,enemy))
            {
                //explosion
                for(let i =0;i<enemy.width*4;i++)
                {
                    particles.push(new Particle(bullet.x,bullet.y,Math.random()*2,{
                        x:((Math.random()-0.5)*Math.random()*5),
                        y:((Math.random()-0.5)*Math.random()*5)
                    }));
                }
                setTimeout(()=>{
                    coronas.splice(i,1);
                    bullets.splice(bulletIndex,1)
                },0)
            }
        });
    }
    animId=requestAnimationFrame(animate);
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
        //console.log(e);
        //console.log("clicked");
        let angle=Math.atan2(e.clientY-canvas.height/2,e.clientX-canvas.width/2);
        let velocity={
            x:Math.cos(angle)*4,
            y:Math.sin(angle)*4
        }
        let bullet=new Bullet(canvas.width/2,canvas.height/2,7,7,velocity);
        bullets.push(bullet);
        
    });
});

function colRect(entity1,entity2)
{
    let l1= entity1.x+30;
    let l2= entity2.x+28;
    let r1=entity1.x + entity1.width-25;
    let r2=entity2.x + entity2.width-25;
    let t1=entity1.y+entity1.height-25;
    let t2=entity2.y+entity2.height-25;
    let b1=entity1.y+28;
    let b2=entity2.y+28;
    if(l1<r2&&l2<r1&&t1>b2&&t2>b1)
    {
        return true;
    }
    return false;
}
function colRect1(entity1,entity2)
{
    let l1= entity1.x;
    let l2= entity2.x;
    let r1=entity1.x + entity1.width;
    let r2=entity2.x + entity2.width;
    let t1=entity1.y+entity1.height;
    let t2=entity2.y+entity2.height;
    let b1=entity1.y;
    let b2=entity2.y;
    if(l1<r2&&l2<r1&&t1>b2&&t2>b1)
    {
        return true;
    }
    return false;
}