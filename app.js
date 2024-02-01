import SketchPad from "./js/sketckpad.js";
const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 80;
const sketckpad = new SketchPad(canvas);

const red_btn=document.getElementById('red-btn')
const green_btn=document.getElementById('green-btn')
const blue_btn=document.getElementById('blue-btn')

function changeColor(color='black') {
  sketckpad.setColor(color);
}

red_btn.addEventListener('click',()=>changeColor('red'))
green_btn.addEventListener('click',()=>changeColor('green'))
blue_btn.addEventListener('click',()=>changeColor('blue'))