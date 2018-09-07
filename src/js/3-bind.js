window.oncontextmenu = (e) => rightmenu.toggle(e)

bind = {
    bar: function() {
        bar.getElementsByTagName('button')[0].onclick = () => video.toggle()
        bar.getElementsByTagName('button')[1].onclick = () => video.mute()
        bar.getElementsByTagName('button')[2].onclick = () => settingsmenu.toggle()
        bar.getElementsByTagName('button')[4].onclick = () => video.toggleFullscreen()
        
        // volume changer
        bar.spanVolume = document.getElementById('span-volume')
        bar.spanVolume.addEventListener('mousemove', function(e){
            if (typeof isVolumeBeingChanged == 'undefined' || !isVolumeBeingChanged) return
            video.volume = Math.round(100*e.offsetX/bar.spanVolume.offsetWidth)/100
        }, false)
        bar.spanVolume.handleMouseDown = function(e) {
            isVolumeBeingChanged = true
            console.log('mousedown')
            video.volume = Math.round(100*e.offsetX/bar.spanVolume.offsetWidth)/100
        }
        bar.spanVolume.addEventListener('mousedown', bar.spanVolume.handleMouseDown, false)
        bar.spanVolume.addEventListener('mouseup', function(e){
            isVolumeBeingChanged = false
            console.log('mouseup')
            video.volume = Math.round(100*e.offsetX/bar.spanVolume.offsetWidth)/100
            bar.spanVolume.removeEventListener('mousemove', bar.spanVolume.handleMouseDown, false)
        }, false)
        bar.spanVolume.addEventListener('mouseleave', function(e){
            if (typeof isVolumeBeingChanged == 'undefined' || !isVolumeBeingChanged) return            
            isVolumeBeingChanged = false
            console.log('mouseleave')
            video.volume = Math.round(100*e.offsetX/bar.spanVolume.offsetWidth)/100
            bar.spanVolume.removeEventListener('mousemove', bar.spanVolume.handleMouseDown, false)
        }, false)
        
    },
    video: function() {
        video.onclick = () => video.click()
        video.ontimeupdate = () => proxy.currentTime = video.currentTime
        video.ondurationchange = () => proxy.bar.duration = video.duration
        video.onpause = () => proxy.bar.paused = video.paused
        video.onplay = () => proxy.bar.paused = video.paused
        proxy.bar.volume = video.volume
        video.onvolumechange = () => proxy.bar.volume = video.volume
        video.onprogress = () => video.progress()
    },
    rightmenu: function() {
    },
    settingsmenu: function() {
    },
    timebar: function() {
        // time changer
        timebar.addEventListener('mousemove', function(e){
            if (typeof isTimeBeingChanged == 'undefined' || !isTimeBeingChanged) return
            video.currentTime = Math.round(100*video.duration*e.offsetX/timebar.offsetWidth)/100
        }, false)
        timebar.handleMouseDown = function(e) {
            isTimeBeingChanged = true
            console.log('mousedown')
            video.currentTime = Math.round(100*video.duration*e.offsetX/timebar.offsetWidth)/100
        }
        timebar.addEventListener('mousedown', timebar.handleMouseDown, false)
        timebar.addEventListener('mouseup', function(e){
            isTimeBeingChanged = false
            console.log('mouseup')
            video.currentTime = Math.round(100*video.duration*e.offsetX/timebar.offsetWidth)/100
            timebar.removeEventListener('mousemove', timebar.handleMouseDown, false)
        }, false)
        timebar.addEventListener('mouseleave', function(e){
            if (typeof isTimeBeingChanged == 'undefined' || !isTimeBeingChanged) return            
            isTimeBeingChanged = false
            console.log('mouseleave')
            video.currentTime = Math.round(100*video.duration*e.offsetX/timebar.offsetWidth)/100
            timebar.removeEventListener('mousemove', timebar.handleMouseDown, false)
        }, false)
    }
}

bind.bar()
bind.video()
bind.rightmenu()
bind.settingsmenu()
bind.timebar()
