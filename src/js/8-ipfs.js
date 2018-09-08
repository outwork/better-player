const ipfs = new Ipfs({ repo: 'ipfs-' + Math.random() })

ipfs.on('ready', () => {
    video.loadFromIpfs('QmSaVEaE9raFxYCLi5m9LbKwn6rcMRH9KpZdrwXmGcfezu')
    video.play()
})