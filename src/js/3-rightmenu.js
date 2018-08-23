rightmenu.toggle = function(e) {
    //console.log('right click', rightmenu.style.display, e)
    // pressing alt key disables this menu for the normal menu
    if (e && e.altKey == true)
        return

    if (rightmenu.style.display == 'block')
        rightmenu.style.display = 'none'
    else
        rightmenu.style.display = 'block'

    rightmenu.style.left = e.clientX
    rightmenu.style.top = e.clientY

    e.preventDefault();
}