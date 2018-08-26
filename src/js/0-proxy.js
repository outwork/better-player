proxy = new Proxy({},{
  get: function(obj, prop) {
    return get(obj, prop)
  },
  set: function(obj, prop, value) {
    return set(obj, prop, value)
  }
})



function set(obj, prop, value) {
  console.log(obj._template,prop,value)
  obj[prop] = value;

  if (!obj._template && document.getElementById(prop)) {
    document.getElementById(prop).innerHTML = value
    return true;
  }

  for (let i = 0; i < templates.length; i++) {
    if (!obj || !obj._template) break;
    if (obj._template.startsWith(templates[i])) {
      if (!window[templates[i]]) return
      window[templates[i]].outerHTML = template(templates[i]+'.html', proxy)
      window[templates[i]] = document.getElementById(templates[i])
      bind[templates[i]]()
    }
    
  }
  
  return true;
}

function get(obj, prop) {
  if (!(prop in obj))
    obj[prop] = new Proxy({_template: prop},{
      get: function(obj, prop) {
        return get(obj, prop)
      },
      set: function(obj, prop, value) {
        return set(obj, prop, value)
      }
    })

  return obj[prop]
}