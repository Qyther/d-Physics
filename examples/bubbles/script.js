log=a=>console.log(JSON.stringify(a));
window.onload=setTimeout(()=>{

    var box=new DManager(24);
    for(var i=0;i<400;i++) {
        box.addPoint(Math.random()*w,Math.random()*h);
    }
    var ncol="dodgerblue";
    for(var i=0;i<box.poin.length;i++) {
        box.poin[i].colr=ncol;
        box.poin[i].grav=[0,-.1];
    }

    var mdown=false;
    var mmove=[-1,-1];
    if(!("ontouchstart" in document)) {
        document.addEventListener("mousemove",e=>{
            if(mdown)
                mmove=[e.clientX,e.clientY];
        });
        document.addEventListener("mousedown",e=>{
            box.handleTouchStart(e.clientX,e.clientY,30);
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
            box.handleTouchStart(e.clientX,e.clientY,30);
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
    var back;
    var mpoint=[innerWidth/2,innerHeight/2];
    var angle=0;
    var mp=box.addPoint(mpoint[0],mpoint[1]);
    mp.radi=10;
    mp.grav=[0,0];
    mp.colr=ncol;
    var angle=0;
    var mpoint0=[innerWidth/2,innerHeight/4];
    var mp0=box.addPoint(mpoint0[0],mpoint0[1]);
    mp0.radi=10;
    mp0.grav=[0,0];
    mp0.colr=ncol;
    var mpoint1=[innerWidth/2,innerHeight/4*3];
    var mp1=box.addPoint(mpoint1[0],mpoint1[1]);
    mp1.radi=10;
    mp1.grav=[0,0];
    mp1.colr=ncol;
    var mmove=[0,0];
    var mpoint2=[0,0];
    var mp2=box.addPoint(mpoint2[0],mpoint2[1]);
    mp2.radi=10;
    mp2.grav=[0,0];
    mp2.colr=ncol;
    if("ontouchstart" in document) {
        document.addEventListener("touchmove",e=>{
            if(e.changedTouches) e=e.changedTouches[0];
            mmove=[e.clientX,e.clientY];
        });
    } else {
        document.addEventListener("mousemove",e=>{
            mmove=[e.clientX,e.clientY];
        });
    }
    var hw=0;
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
    for(var i=0;i<box.poin.length-4;i++) {
        for(var j=0;j<box.poin.length;j++) {
            if(i!==j)
                box.poin[i].resolveCollision(box.poin[j],(box.poin[i].radi+box.poin[j].radi)*2,1);
        }
        box.poin[i].resolveCollision(mp,w/3,-.8);
        box.poin[i].resolveCollision(mp,w/8,1);
        box.poin[i].resolveCollision(mp0,w/3,-.8);
        box.poin[i].resolveCollision(mp0,w/8,1);
        box.poin[i].resolveCollision(mp1,w/3,-.8);
        box.poin[i].resolveCollision(mp1,w/8,1);
        box.poin[i].resolveCollision(mp2,w/3,-.8);
        box.poin[i].resolveCollision(mp2,w/8,1);
    }
    box.handle();
    /*if(mdown) {
        var ha=box.handleTouch(mmove[0],mmove[1],30);
        if(ha.length>0) {
            ctx.beginPath();
            ctx.strokeStyle="white";
            ctx.arc(ha[0].posi[0],ha[0].posi[1],30,0,2*Math.PI);
            ha[0].posi[0]=mmove[0];
            ha[0].posi[1]=mmove[1];
            ctx.stroke();
            ctx.closePath();
            if(des) box.removePoint(ha[0]);
        }
    }*/
    box.render(ctx);
    if(!back)
        angle+=.021;
    else
        angle-=.021;
    if(angle/(Math.PI*2)>=1||angle/(Math.PI*2)<=-1) {
        if(!back) back=true;
        else back=false;
    }
    mp.posi[0]=Math.cos(angle)*w/14+w/2;
    mp.posi[1]=Math.sin(angle)*w/14+h/2;
    mp0.posi[0]=Math.cos(angle/2+Math.PI)*w/3+w/2
    mp1.posi[0]=Math.cos(angle+Math.PI)*w/3+w/2
    mp2.posi[0]=mmove[0];
    mp2.posi[1]=mmove[1];
    if(1000/delta<45) hw++;
    if(hw>20) {
        hw=0;
        for(var i=0;i<box.poin.length/10-4;i++) {
            box.poin.splice(i,1);
        }
    }
    ctx.fillStyle="white";
    ctx.strokeStyle="#ddd";
    ctx.beginPath();
    ctx.arc(mp2.posi[0],mp2.posi[1],mp2.radi*1.5,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillText((1000/delta).toFixed(1)+"FPS",0,10);
    ctx.globalAlpha=.7;
    ctx.drawImage(logo,innerWidth-96,innerHeight-96,96,96);
    last=now;
    }
    setInterval(frame,1000/60);
},250);