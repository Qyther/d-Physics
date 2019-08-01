log=a=>console.log(JSON.stringify(a));
window.onload=setTimeout(()=>{

    var box=new DManager(6);
    box.addPoint(innerWidth/4-50,60);
    box.addPoint(innerWidth/4+50,60);
    box.addPoint(innerWidth/4+50,160);
    box.addPoint(innerWidth/4-50,160);
    box.addPoint(innerWidth/4,110);
    box.addLine(0,1);
    box.addLine(1,2);
    box.addLine(2,3);
    box.addLine(3,0);
    box.addLine(0,4);
    box.addLine(1,4);
    box.addLine(2,4);
    box.addLine(3,4);

    box.addPoint(innerWidth/4*3,60);
    box.addPoint(innerWidth/4*3-60,160);
    box.addPoint(innerWidth/4*3+60,160);
    box.addLine(5,6);
    box.addLine(6,7);
    box.addLine(7,5);

    box.addPoint(innerWidth/2-30,60);
    box.addPoint(innerWidth/2+30,60);
    box.addPoint(innerWidth/2+30,120);
    box.addPoint(innerWidth/2-30,120);
    box.addPoint(innerWidth/2,90);
    box.addPoint(innerWidth/2,120);
    box.addLine(8,9);
    box.addLine(9,10);
    box.addLine(10,11);
    box.addLine(11,8);
    box.addLine(8,12);
    box.addLine(9,12);
    box.addLine(10,12);
    box.addLine(11,12);
    box.addLine(10,13);
    box.addLine(11,13);

    box.addPoint(innerWidth/2,150);
    box.addPoint(innerWidth/2-30,180);
    box.addPoint(innerWidth/2+30,180);
    box.addPoint(innerWidth/2,210);
    box.addPoint(innerWidth/2-30,240);
    box.addPoint(innerWidth/2+30,240);
    box.addLine(13,14);
    box.addLine(14,15);
    box.addLine(14,16);
    box.addLine(14,17);
    box.addLine(17,18);
    box.addLine(17,19);

    for(var i=0;i<box.line.length;i++) {
        box.line[i].colr="dodgerblue";
    }
    for(var i=0;i<box.poin.length;i++) {
        box.poin[i].colr="aqua";
    }

    for(var i=0;i<100;i++) {
        box.addPoint(Math.random()*w,Math.random()*h);
    }
    for(var i=0;i<30;i++) {
        box.addLine(Math.floor(Math.random()*100)+20,Math.floor(Math.random()*100)+20);
    }

    
    for(var i=0;i<box.line.length;i++) {
        box.line[i].stif=.1;
    }
    for(var i=0;i<box.poin.length;i++) {
        box.poin[i].grav=[0,0];
    }

    var mdown=false;
    var mmove=[-1,-1];
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
    var last;
    var des;
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
    if(mdown) {
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
    }
    box.render(ctx);
    ctx.fillStyle="white";
    ctx.fillText((1000/delta).toFixed(1)+"FPS",0,10);
    last=now;
    }
    setInterval(frame,1000/60);
},250);