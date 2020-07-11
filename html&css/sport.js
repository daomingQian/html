

function getStyle(el) {
    let elStyle = getComputedStyle(el)
    return function (name) {
        let result = parseFloat(elStyle[name]);
        return result;
    }
}

function setStyle(el, style) {
    for (let name in style){
        el.style[name] = style[name]+"px"
    }
}

function active(el, elStyleAll, duration, f) {
    let startStyle = {};  //当前的样式
    let styleFoo = getStyle(el);
    for(let name in elStyleAll){
        startStyle[name] = styleFoo(name);
    }
    // console.log(need)
    let speedStyle = {}  //样式改变速度
    for(let name in elStyleAll){
        speedStyle[name] = (elStyleAll[name]-startStyle[name])/duration;
    }

    let startTime = new Date()
    function currentStyle() {
        let currentTime = new Date()
        if(currentTime-startTime >= duration){
            f && f()
            return;
        }

        requestAnimationFrame(currentStyle)

        let presentStyle = {}
        for(let name in elStyleAll){
            presentStyle[name] = startStyle[name] + speedStyle[name]*(currentTime-startTime)
        }
        setStyle(el, presentStyle)

    }
    currentStyle()
}