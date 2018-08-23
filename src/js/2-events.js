// window
window.oncontextmenu = (e) => rightmenu.toggle(e)

// video
video.onclick = () => video.toggle()

// bar
bar.getElementsByTagName('button')[0].onclick = () => video.toggle()
bar.getElementsByTagName('button')[1].onclick = () => video.mute()
bar.getElementsByTagName('button')[4].onclick = () => video.toggleFullscreen()

// rightmenu
