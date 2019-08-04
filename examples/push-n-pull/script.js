log=a=>console.log(JSON.stringify(a));
window.onload=setTimeout(()=>{

    var box=new DManager(48);
    box.addPoint(innerWidth/2,60);
    box.poin[0].pin=true;
    box.addPoint(innerWidth/2,360);
    box.addLine(0,1);

    for(var i=0;i<box.line.length;i++) {
        box.line[i].stif=2;
        box.line[i].colr="#187cde";
    }
    for(var i=0;i<box.poin.length;i++) {
        box.poin[i].grav=[0,0];
        box.poin[i].colr="#298def";
    }


    var last;
    var logo=new Image();
    logo.src="https://raw.githubusercontent.com/Qyther/d-Physics/master/logotransparent.png";
    function frame() {
    box.poin[0].posi[0]=innerWidth/2+Math.cos(Date.now()/500)*100;
    box.poin[0].posi[1]=160+Math.sin(Date.now()/500)*100;
    box.poin[1].posi[0]=innerWidth/2;
    var c=document.querySelector("canvas");
    w=c.width=innerWidth;
    h=c.height=innerHeight;
    var ctx=c.getContext("2d");
    //-=-//
    var now=Date.now();
    if(!last) last=now;
    var delta=now-last;
    ctx.strokeStyle="#222";
    ctx.beginPath();
    ctx.arc(innerWidth/2,160,120,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(innerWidth/2,160,80,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(innerWidth/2-20,360);
    ctx.lineTo(innerWidth/2-20,560);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(innerWidth/2+20,360);
    ctx.lineTo(innerWidth/2+20,560);
    ctx.stroke();
    ctx.closePath();

    box.handle();
    box.render(ctx);
    ctx.fillStyle="#187cde";
    ctx.font="20px forma";
    ctx.fillText((1000/delta).toFixed(1)+"FPS",0,16);
    ctx.globalAlpha=.7;
    ctx.drawImage(logo,innerWidth-96,innerHeight-96,96,96);
    last=now;
    }
    setInterval(frame,1000/60);
},250);