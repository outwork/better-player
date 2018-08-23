proxy = new Proxy({
  currentTime: 0
},{
  get: function(obj, prop) {
    if (prop in obj)
      return obj[prop]
    return undefined;
  },
  set: function(obj, prop, value) {
    obj[prop] = value;
    if (document.getElementById(prop))
      document.getElementById(prop).innerHTML = value;
    return true;
  }
})

