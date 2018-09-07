rightmenu.toggle = function(e) {
    //console.log('right click', rightmenu.style.display, e)
    // pressing alt key disables this menu for the normal menu
    if (e && e.altKey == true)
        return

    if (rightmenu.style.display == 'table')
        rightmenu.style.display = 'none'
    else {
        rightmenu.style.display = 'table'
        var width = 358;
        var height = 244;
        if (e.clientX+width <= window.innerWidth)
            rightmenu.style.left = e.clientX
        else
            rightmenu.style.left = e.clientX-width

        if (e.clientY+height <= window.innerHeight)
            rightmenu.style.top = e.clientY
        else
            rightmenu.style.top = e.clientY-height

    }
    if (e)
        e.preventDefault();
}