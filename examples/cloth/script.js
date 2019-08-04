log=a=>console.log(JSON.stringify(a));
window.onload=setTimeout(()=>{

    var box=new DManager(10);
    var cw=14;
    var ch=10;
    var csw=30;
    var csh=30;
    for(var y=0;y<ch;y++) {
        for(var x=0;x<cw;x++) {
            box.addPoint(x*csw+(innerWidth/2-csw*cw/2),y*csh+60,0,0,y===0&&true);
        }
    }
    for(var y=0;y<ch;y++) {
        for(var x=0;x<cw;x++) {
            if(x+y*cw<cw*ch&&(x%(cw-1)>0||x===0))
                box.addLine(x+y*cw,x+y*cw+1);
            if(x+y*cw<cw*ch&&(y%(ch-1)>0||y===0))
                box.addLine(x+y*cw,x+y*cw+cw);
        }
    }
    for(var i=0;i<box.poin.length;i++) {
        box.poin[i].colr="#298def";
    }
    for(var i=0;i<box.line.length;i++) {
        box.line[i].colr="#187cde";
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
    if(mdown) {
        var ha=box.handleTouch(mmove[0],mmove[1],30);
        if(ha.length>0) {
            ctx.beginPath();
            ctx.strokeStyle="#222";
            ctx.arc(ha[0].posi[0],ha[0].posi[1],30,0,2*Math.PI);
            ha[0].posi[0]=mmove[0];
            ha[0].posi[1]=mmove[1];
            ctx.stroke();
            ctx.closePath();
            if(des) box.removePoint(ha[0]);
        }
    }
    for(var i=0;i<box.line.length;i++) {
        var cli=box.line[i];
        if(Math.hypot(cli.firsPoin.posi[0]-cli.secoPoin.posi[0],cli.firsPoin.posi[1]-cli.secoPoin.posi[1])>200) {
            box.removeLine(cli);
        }
    }
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