// alert("JS Loaded");

let startBtn=document.querySelector(".btn");
let box=document.querySelector(".box");

let canvas=document.querySelector(".board");

let tool=canvas.getContext("2d");
canvas.height=window.innerHeight-4.5;
canvas.width=window.innerWidth-4.5;
let spaceImage=new Image();
spaceImage.src="space.jpg";
startBtn.addEventListener("click",function()
{
    box.style.display="none";
    tool.fillRect(0,0,canvas.width,canvas.height);
    tool.drawImage(spaceImage,0,0,canvas.width,canvas.height);
});