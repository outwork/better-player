video.toggle = function() {
    if (video.paused)
        video.play()
    else
        video.pause()
}

video.mute = function() {
    if (video.volume == 0)
        video.volume = 1
    else
        video.volume = 0
}

video.toggleFullscreen = function(event) {
    var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;
    if (isFullscreen)
        video.closeFullscreen()
    else
        video.openFullScreen()
}

video.openFullScreen = function() {
    var html = document.documentElement
    if (html.requestFullscreen) {
        html.requestFullscreen();
    } else if (html.mozRequestFullScreen) {
        html.mozRequestFullScreen();
    } else if (html.webkitRequestFullscreen) {
        html.webkitRequestFullscreen();
    } else if (html.msRequestFullscreen) { 
        html.msRequestFullscreen();
    }
}

video.closeFullscreen = function() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
}

video.click = function() {
    var newClick = new Date()
    var mustToggle = true

    if (typeof lastClickDate == 'object' && newClick-lastClickDate<200) {
        video.toggleFullscreen()
        mustToggle = false
    }

    lastClickDate = newClick
    if (rightmenu.style.display == 'table') {
        rightmenu.toggle()
        mustToggle = false
    }
        
    if (settingsmenu.style.display == 'table') {
        settingsmenu.toggle()
        mustToggle = false
    }
        
    if (mustToggle)
        video.toggle()
}