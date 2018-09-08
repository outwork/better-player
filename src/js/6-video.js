var stream = undefined
var mimeCodec = 'video/mp4; codecs=avc1.64001E, mp4a.40.2'
var blockSize = 1024*1024
var lastClickDate = null

video.loadFromIpfs = function(hash) {
    console.log(hash)
    if (!'MediaSource' in window || !MediaSource.isTypeSupported(mimeCodec)) {
        console.log('Unsupported MIME type or codec: ', mimeCodec);
    }
    var mediaSource = new MediaSource()
    video.src = window.URL.createObjectURL(mediaSource)
    mediaSource.addEventListener('sourceopen', function() {
        var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec)
        sourceBuffer.mode = 'sequence';
        var chunks = []
        var i = 0

        streamData(0)

        function streamData(start) {
            chunks = []
            console.log(start)
            stream = ipfs.files.catReadableStream(hash.trim(), {
                offset: start,
                length: blockSize
            })
            stream.on('close', () => console.log('close stream'))
            stream.on('error', (error) => console.log('error', error))
            stream.on('data', (chunk) => incomingChunk(chunk))
            //stream.on('readable', () => console.log('readable', this.read()))
            stream.on('end', () => appendBlock(start))
            // else {
            //     if (sourceBuffer.updating || chunks.length > 0)
            //         sourceBuffer.mustEnd = true
            //     else
            //         mediaSource.endOfStream()
            // }
        }
    
        function incomingChunk(chunk) {
            chunks.push(chunk)
            console.log('chunk', chunks.length, chunk)
        }

        function appendBlock(start) {
            console.log('Adding chunks')
            let totalLength = 0
            for (let i = 0; i < chunks.length; i++)
                totalLength += chunks[i].length
            let block = new Uint8Array(totalLength)
            let offset = 0
            for (let i = 0; i < chunks.length; i++) {
                block.set(chunks[i], offset)
                offset += chunks[i].length
            }
            console.log(block, block.buffer)
            sourceBuffer.appendBuffer(block.buffer)
            sourceBuffer.onupdateend = (e) => {
                sourceBuffer.onupdateend = null
                console.log('nice')
                if (totalLength == blockSize)
                    streamData(start+totalLength)
                else
                    mediaSource.endOfStream();
            }
        }
    })
    


    
}

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

    var lastClickDate = newClick
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

video.progress = function() {
    // happens when the buffer zone changes
    console.log('progress')
    var duration =  video.duration;
    if (duration > 0) {
      for (var i = 0; i < video.buffered.length; i++) {
            if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
                document.getElementById("timebar-buffered").style.width = (video.buffered.end(video.buffered.length - 1 - i) / duration) * 100 + "%";
                break;
            }
        }
    }
}