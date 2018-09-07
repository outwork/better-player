template.defaults.imports.timeFormat = function(secs){
    secs = Math.round(secs)
    var output = ''
    var mins = Math.floor(secs/60)
    secs = secs%60
    var hours = Math.floor(mins/60)
    mins = mins%60
    output = (secs < 10 ? '0'+secs : secs)+output
    output = ':'+output
    output = (mins < 10 ? '0'+mins : mins)+output
    
    if (hours>0) {
        output = ':'+output
        output = (hours < 10 ? '0'+hours : hours)+output
    }
        
    return output
};