templates = ['video', 'bar', 'rightmenu']
proxy.bar.paused = true
proxy.bar.duration = 0
proxy.bar.volume = 0
proxy.currentTime = 0

document.getElementById('content').innerHTML = 
    template('video.html', proxy)
    + template('bar.html', proxy)
    + template('rightmenu.html', proxy)

// bind our views to the window
video = document.getElementById('video')
bar = document.getElementById('bar')
rightmenu = document.getElementById('rightmenu')
