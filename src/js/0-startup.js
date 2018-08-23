document.getElementById('content').innerHTML = 
    template('video.html', {})
    + template('bar.html', {})
    + template('rightmenu.html', {})

video = document.getElementsByTagName('video')[0]
bar = document.getElementById('bar')
rightmenu = document.getElementById('rightmenu')
