log=a=>console.log(JSON.stringify(a));
var box;
window.onload=setTimeout(()=>{
    var ballsa=125;
    var forces=20;
    var rads=Math.sqrt((w*h)/(ballsa)/Math.PI);
    box=new DManager(1);;
    for(var i=0;i<ballsa;i++) {
        var b=box.addPoint(Math.random()*w,Math.random()*h);
        b.colr="yellow";
        b.grav=[0,.2];
        b.radi=rads;
    }

    var mdown=false;
    var mmove=[-1,-1];
    if(!("ontouchstart" in document)) {
        document.addEventListener("mousemove",e=>{
            if(mdown)
                mmove=[e.clientX,e.clientY];
        });
        document.addEventListener("mousedown",e=>{
            box.handleTouchStart(e.clientX,e.clientY,rads);
            if(e.button===1) des=true;
            mdown=true;
            mmove=[e.clientX,e.clientY];
        });
        document.addEventListener("mouseup",()=>{
            mdown=false;
            des=false;
            box.handleTouchEnd();
        });
    } else {
        document.addEventListener("touchmove",e=>{
            if(e.changedTouches) e=e.changedTouches[0];
            if(mdown)
                mmove=[e.clientX,e.clientY];
        });
        document.addEventListener("touchstart",e=>{
            if(e.changedTouches) e=e.changedTouches[0];
            box.handleTouchStart(e.clientX,e.clientY,rads);
            mdown=true;
            mmove=[e.clientX,e.clientY];
        });
        document.addEventListener("touchend",()=>{
            mdown=false;
            box.handleTouchEnd();
        });
    }
    var last;
    var des;
    var logo=new Image();
    logo.src="https://raw.githubusercontent.com/Qyther/d-Physics/master/logotransparent.png";
    function frame() {
    var c=document.querySelector("canvas");
    w=c.width=innerWidth;
    h=c.height=innerHeight;
    var ctx=c.getContext("2d");
    //-=-//
    var now=Date.now();
    if(!last) last=now;
    var delta=now-last;
    box.handle();
    box.render(ctx);
    if(mdown) {
        var ha=box.handleTouch(mmove[0],mmove[1],rads*1.5);
        if(ha.length>0) {
            ctx.beginPath();
            ctx.strokeStyle="white";
            ctx.lineWidth=5;
            ctx.arc(ha[0].posi[0],ha[0].posi[1],rads*1.5,0,2*Math.PI);
            ha[0].posi[0]=mmove[0];
            ha[0].posi[1]=mmove[1];
            ctx.stroke();
            ctx.closePath();
            if(des) box.removePoint(ha[0]);
        }
    }
    for(var i=0;i<box.poin.length;i++) {
        for(var j=0;j<box.poin.length;j++) {
            if(i!==j) box.poin[i].resolveCollision(box.poin[j],box.poin[i].radi+box.poin[j].radi,forces);
        }
    }
    ctx.fillStyle="white";
    ctx.fillText((1000/delta).toFixed(1)+"FPS",0,10);
    ctx.globalAlpha=.7;
    ctx.drawImage(logo,innerWidth-96,innerHeight-96,96,96);
    last=now;
    }
    setInterval(frame,1000/60);
},250);