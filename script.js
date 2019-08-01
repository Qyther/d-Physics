var discordLink="https://discord.gg/RBcwYTN";
function scrolldown() {
  document.documentElement.scrollTop+=innerHeight-(document.documentElement.scrollTop%innerHeight);
}
setTimeout(()=>{
var smobjects=[
  [document.getElementsByClassName("icon")[0],0],
  [document.getElementsByClassName("description")[0],-.5],
  [document.getElementsByClassName("content")[0],.8],
  [document.getElementsByClassName("buttons")[0],.85],
  [document.getElementsByClassName("content")[1],.9],
  [document.getElementsByClassName("buttons")[1],.85],
  [document.getElementsByClassName("buttons0")[0],.85],
  [document.getElementsByClassName("buttons0")[1],.85]
];
document.getElementsByClassName("cover")[0].addEventListener("mouseup",()=>{
  document.getElementsByClassName("cover")[0].style.display="none";
  document.getElementsByClassName("notific")[0].style.display="none";
});
document.getElementsByClassName("cover")[0].addEventListener("touchend",()=>{
  document.getElementsByClassName("cover")[0].style.display="none";
  document.getElementsByClassName("notific")[0].style.display="none";
});
setInterval(()=>{
  for(var i=0;i<smobjects.length;i++) {
    var ob=smobjects[i];
    if(document.documentElement.scrollTop>ob[0].offsetTop+ob[1]*innerHeight+ob[0].clientHeight/4) ob[0].style.opacity=.4;
    else ob[0].style.opacity=1;
  }
});
});
var wai=.5;
var blocked=false;
function docs() {
  if(blocked) return;
  blocked=true;
  document.getElementsByClassName("home")[0].classList.remove("vis");
  document.getElementsByClassName("docs")[0].classList.add("vis");
  document.getElementsByClassName("docs")[0].style.display="block";
  setTimeout(()=>{
    document.getElementsByClassName("home")[0].style.display="none";
    blocked=false;
  },wai*1000);
}
function home() {
  if(blocked) return;
  blocked=true;
  document.getElementsByClassName("docs")[0].classList.remove("vis");
  document.getElementsByClassName("home")[0].classList.add("vis");
  document.getElementsByClassName("home")[0].style.display="block";
  setTimeout(()=>{
    document.getElementsByClassName("docs")[0].style.display="none";
    blocked=false;
  },wai*1000);
}
function linkdscript() {
  document.getElementsByClassName("cover")[0].style.display="block";
  document.getElementsByClassName("notific")[0].style.display="block";
}
function copyscript() {
  var txt = document.getElementsByClassName("lscrip")[0];
  txt.disabled=false;
  txt.select();
  document.execCommand("copy");
  txt.disabled=true;
}