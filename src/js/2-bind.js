window.oncontextmenu = (e) => rightmenu.toggle(e)

bind = {
    bar: function() {
        bar.getElementsByTagName('button')[0].onclick = () => video.toggle()
        bar.getElementsByTagName('button')[1].onclick = () => video.mute()
        bar.getElementsByTagName('button')[4].onclick = () => video.toggleFullscreen()
    },
    video: function() {
        video.onclick = () => video.click()
        video.ontimeupdate = () => proxy.currentTime = video.currentTime
        video.ondurationchange = () => proxy.bar.duration = video.duration
        video.onpause = () => proxy.bar.paused = video.paused
        video.onplay = () => proxy.bar.paused = video.paused
        video.onvolumechange = () => proxy.bar.volume = video.volume
    },
    rightclick: function() {
        
    }
}

bind.bar()
bind.video()
bind.rightclick()