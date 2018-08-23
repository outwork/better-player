if (document.addEventListener) { // IE >= 9; other browsers
    document.addEventListener('contextmenu', function(e) {
        if (toggleRightMenu(e))
            e.preventDefault();
    }, false);
} else { // IE < 9
    document.attachEvent('oncontextmenu', function() {
        toggleRightMenu()
        window.event.returnValue = false;
    });
}

function toggleRightMenu(e) {
    //console.log('right click', rightmenu.style.display, e)
    // pressing alt key disables this menu for the normal menu
    if (e && e.altKey == true)
        return false

    if (rightmenu.style.display == 'block')
        rightmenu.style.display = 'none'
    else
        rightmenu.style.display = 'block'

    rightmenu.style.left = e.clientX
    rightmenu.style.top = e.clientY

    return true
}