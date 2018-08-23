// window
window.oncontextmenu = (e) => rightmenu.toggle(e)

// video
video.onclick = () => video.click()
video.ontimeupdate = () => proxy.currentTime = video.currentTime
video.ondurationchange = () => proxy.duration = video.duration

// bar
bar.getElementsByTagName('button')[0].onclick = () => video.toggle()
bar.getElementsByTagName('button')[1].onclick = () => video.mute()
bar.getElementsByTagName('button')[4].onclick = () => video.toggleFullscreen()

// rightmenu
