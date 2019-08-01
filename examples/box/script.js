log=a=>console.log(JSON.stringify(a));
window.onload=setTimeout(()=>{

    var box=new DManager(24);
    box.addPoint(innerWidth/2-100,60);
    box.addPoint(innerWidth/2+100,60);
    box.addPoint(innerWidth/2+100,260);
    box.addPoint(innerWidth/2-100,260);
    box.addPoint(innerWidth/2,160);
    
    box.addLine(0,1);
    box.addLine(1,2);
    box.addLine(2,3);
    box.addLine(3,0);

    box.addLine(0,4);
    box.addLine(1,4);
    box.addLine(2,4);
    box.addLine(3,4);
    
    for(var i=0;i<box.line.length;i++) {
        box.line[i].stif=2;
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