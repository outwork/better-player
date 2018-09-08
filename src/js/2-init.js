var templates = ['video', 'bar', 'rightmenu', 'settingsmenu', 'timebar']
proxy.bar.paused = true
proxy.bar.duration = 0
proxy.bar.volume = 0
proxy.currentTime = 0
proxy.isTimeBeingChanged = false
proxy.isVolumeBeingChanged = false

document.getElementById('content').innerHTML = 
    template('video.html', proxy)
    + template('bar.html', proxy)
    + template('rightmenu.html', proxy)
    + template('settingsmenu.html', proxy)
    + template('timebar.html', proxy)
