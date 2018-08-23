document.getElementById('content').innerHTML = 
    template('video.html', {})
    + template('bar.html', {})
    + template('rightmenu.html', {})

// bind our views to the window
video = document.getElementById('video')
bar = document.getElementById('bar')
rightmenu = document.getElementById('rightmenu')
