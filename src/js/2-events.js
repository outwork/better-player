video.onclick = () => toggle()
bar.getElementsByTagName('button')[0].onclick = () => toggle()
bar.getElementsByTagName('button')[1].onclick = () => mute()

function toggle() {
    video.toggle()
}

function mute() {
    if (video.volume == 0)
        video.volume = 1
    else
        video.volume = 0
}