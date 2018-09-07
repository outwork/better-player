templates = ['video', 'bar', 'rightmenu']
proxy.bar.paused = true
proxy.bar.duration = 0
proxy.bar.volume = 0
proxy.currentTime = 0

document.getElementById('content').innerHTML = 
    template('video.html', proxy)
    + template('bar.html', proxy)
    + template('rightmenu.html', proxy)
    + template('settingsmenu.html', proxy)
