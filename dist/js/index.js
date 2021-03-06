"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
                }var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];return o(n || r);
                }, p, p.exports, r, e, n, t);
            }return n[i].exports;
        }for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
            o(t[i]);
        }return o;
    }return r;
})()({ 1: [function (require, module, exports) {
        var proxy = new Proxy({}, {
            get: function get(obj, prop) {
                return _get(obj, prop);
            },
            set: function set(obj, prop, value) {
                return _set(obj, prop, value);
            }
        });

        function _set(obj, prop, value) {
            // if (prop != 'currentTime')
            //   console.log(obj._template,prop,value)
            obj[prop] = value;

            // for single values where we dont want to update the full template (i.e current time)
            if (!obj._template && document.getElementById(prop)) {
                if (prop == 'currentTime') {
                    document.getElementById('timebar-filler').style.width = template.defaults.imports.timebarPercent(proxy.currentTime / proxy.bar.duration) + '%';
                    document.getElementById(prop).innerHTML = template.defaults.imports.timeFormat(value);
                } else document.getElementById(prop).innerHTML = value;
                return true;
            }
            for (var i = 0; i < templates.length; i++) {
                if (!obj || !obj._template) break;
                if (obj._template.startsWith(templates[i])) {
                    if (!window[templates[i]]) return true;
                    window[templates[i]].outerHTML = template(templates[i] + '.html', proxy);
                    bind[templates[i]]();
                }
            }
            return true;
        }

        function _get(obj, prop) {
            if (!(prop in obj)) obj[prop] = new Proxy({ _template: prop }, {
                get: function get(obj, prop) {
                    return _get(obj, prop);
                },
                set: function set(obj, prop, value) {
                    return _set(obj, prop, value);
                }
            });

            return obj[prop];
        }
        template.defaults.imports.timeFormat = function (secs) {
            secs = Math.round(secs);
            var output = '';
            var mins = Math.floor(secs / 60);
            secs = secs % 60;
            var hours = Math.floor(mins / 60);
            mins = mins % 60;
            output = (secs < 10 ? '0' + secs : secs) + output;
            output = ':' + output;
            output = (mins < 10 ? '0' + mins : mins) + output;

            if (hours > 0) {
                output = ':' + output;
                output = (hours < 10 ? '0' + hours : hours) + output;
            }

            return output;
        };

        template.defaults.imports.timebarPercent = function (float) {
            return Math.round(10000 * float) / 100;
        };
        var templates = ['video', 'bar', 'rightmenu', 'settingsmenu', 'timebar'];
        proxy.bar.paused = true;
        proxy.bar.duration = 0;
        proxy.bar.volume = 0;
        proxy.currentTime = 0;
        proxy.isTimeBeingChanged = false;
        proxy.isVolumeBeingChanged = false;

        document.getElementById('content').innerHTML = template('video.html', proxy) + template('bar.html', proxy) + template('rightmenu.html', proxy) + template('settingsmenu.html', proxy) + template('timebar.html', proxy);

        window.oncontextmenu = function (e) {
            return rightmenu.toggle(e);
        };

        var bind = {
            bar: function (_bar) {
                function bar() {
                    return _bar.apply(this, arguments);
                }

                bar.toString = function () {
                    return _bar.toString();
                };

                return bar;
            }(function () {
                bar.getElementsByTagName('button')[0].onclick = function () {
                    return video.toggle();
                };
                bar.getElementsByTagName('button')[1].onclick = function () {
                    return video.mute();
                };
                bar.getElementsByTagName('button')[2].onclick = function () {
                    return settingsmenu.toggle();
                };
                bar.getElementsByTagName('button')[4].onclick = function () {
                    return video.toggleFullscreen();
                };

                // volume changer
                bar.spanVolume = document.getElementById('span-volume');
                bar.spanVolume.addEventListener('mousemove', function (e) {
                    if (typeof proxy.isVolumeBeingChanged == 'undefined' || !proxy.isVolumeBeingChanged) return;
                    video.volume = Math.round(100 * e.offsetX / bar.spanVolume.offsetWidth) / 100;
                }, false);
                bar.spanVolume.handleMouseDown = function (e) {
                    proxy.isVolumeBeingChanged = true;
                    console.log('mousedown');
                    video.volume = Math.round(100 * e.offsetX / bar.spanVolume.offsetWidth) / 100;
                };
                bar.spanVolume.addEventListener('mousedown', bar.spanVolume.handleMouseDown, false);
                bar.spanVolume.addEventListener('mouseup', function (e) {
                    proxy.isVolumeBeingChanged = false;
                    console.log('mouseup');
                    video.volume = Math.round(100 * e.offsetX / bar.spanVolume.offsetWidth) / 100;
                    bar.spanVolume.removeEventListener('mousemove', bar.spanVolume.handleMouseDown, false);
                }, false);
                bar.spanVolume.addEventListener('mouseleave', function (e) {
                    if (typeof proxy.isVolumeBeingChanged == 'undefined' || !proxy.isVolumeBeingChanged) return;
                    proxy.isVolumeBeingChanged = false;
                    console.log('mouseleave');
                    video.volume = Math.round(100 * e.offsetX / bar.spanVolume.offsetWidth) / 100;
                    bar.spanVolume.removeEventListener('mousemove', bar.spanVolume.handleMouseDown, false);
                }, false);
            }),
            video: function (_video) {
                function video() {
                    return _video.apply(this, arguments);
                }

                video.toString = function () {
                    return _video.toString();
                };

                return video;
            }(function () {
                video.onclick = function () {
                    return video.click();
                };
                video.ontimeupdate = function () {
                    return proxy.currentTime = video.currentTime;
                };
                video.ondurationchange = function () {
                    return proxy.bar.duration = video.duration;
                };
                video.onpause = function () {
                    return proxy.bar.paused = video.paused;
                };
                video.onplay = function () {
                    return proxy.bar.paused = video.paused;
                };
                proxy.bar.volume = video.volume;
                video.onvolumechange = function () {
                    return proxy.bar.volume = video.volume;
                };
                video.onprogress = function () {
                    return video.progress();
                };
            }),
            rightmenu: function rightmenu() {},
            settingsmenu: function settingsmenu() {},
            timebar: function (_timebar) {
                function timebar() {
                    return _timebar.apply(this, arguments);
                }

                timebar.toString = function () {
                    return _timebar.toString();
                };

                return timebar;
            }(function () {
                // time changer
                timebar.addEventListener('mousemove', function (e) {
                    if (typeof proxy.isTimeBeingChanged == 'undefined' || !proxy.isTimeBeingChanged) return;
                    video.currentTime = Math.round(100 * video.duration * e.offsetX / timebar.offsetWidth) / 100;
                }, false);
                timebar.handleMouseDown = function (e) {
                    proxy.isTimeBeingChanged = true;
                    console.log('mousedown');
                    video.currentTime = Math.round(100 * video.duration * e.offsetX / timebar.offsetWidth) / 100;
                };
                timebar.addEventListener('mousedown', timebar.handleMouseDown, false);
                timebar.addEventListener('mouseup', function (e) {
                    proxy.isTimeBeingChanged = false;
                    console.log('mouseup');
                    video.currentTime = Math.round(100 * video.duration * e.offsetX / timebar.offsetWidth) / 100;
                    timebar.removeEventListener('mousemove', timebar.handleMouseDown, false);
                }, false);
                timebar.addEventListener('mouseleave', function (e) {
                    if (typeof proxy.isTimeBeingChanged == 'undefined' || !proxy.isTimeBeingChanged) return;
                    proxy.isTimeBeingChanged = false;
                    console.log('mouseleave');
                    video.currentTime = Math.round(100 * video.duration * e.offsetX / timebar.offsetWidth) / 100;
                    timebar.removeEventListener('mousemove', timebar.handleMouseDown, false);
                }, false);
            })
        };

        bind.bar();
        bind.video();
        bind.rightmenu();
        bind.settingsmenu();
        bind.timebar();

        rightmenu.toggle = function (e) {
            //console.log('right click', rightmenu.style.display, e)
            // pressing alt key disables this menu for the normal menu
            if (e && e.altKey == true) return;

            if (rightmenu.style.display == 'table') rightmenu.style.display = 'none';else {
                rightmenu.style.display = 'table';
                var width = 358;
                var height = 244;
                if (e.clientX + width <= window.innerWidth) rightmenu.style.left = e.clientX;else rightmenu.style.left = e.clientX - width;

                if (e.clientY + height <= window.innerHeight) rightmenu.style.top = e.clientY;else rightmenu.style.top = e.clientY - height;
            }
            if (e) e.preventDefault();
        };
        settingsmenu.toggle = function () {
            if (settingsmenu.style.display == 'table') settingsmenu.style.display = 'none';else settingsmenu.style.display = 'table';
        };
        video.toggle = function () {
            if (video.paused) video.play();else video.pause();
        };

        video.mute = function () {
            if (video.volume == 0) video.volume = 1;else video.volume = 0;
        };

        video.toggleFullscreen = function (event) {
            var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;
            if (isFullscreen) video.closeFullscreen();else video.openFullScreen();
        };

        video.openFullScreen = function () {
            var html = document.documentElement;
            if (html.requestFullscreen) {
                html.requestFullscreen();
            } else if (html.mozRequestFullScreen) {
                html.mozRequestFullScreen();
            } else if (html.webkitRequestFullscreen) {
                html.webkitRequestFullscreen();
            } else if (html.msRequestFullscreen) {
                html.msRequestFullscreen();
            }
        };

        video.closeFullscreen = function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                /* IE/Edge */
                document.msExitFullscreen();
            }
        };

        video.click = function () {
            var newClick = new Date();
            var mustToggle = true;

            if ((typeof lastClickDate === "undefined" ? "undefined" : _typeof(lastClickDate)) == 'object' && newClick - lastClickDate < 200) {
                video.toggleFullscreen();
                mustToggle = false;
            }

            var lastClickDate = newClick;
            if (rightmenu.style.display == 'table') {
                rightmenu.toggle();
                mustToggle = false;
            }

            if (settingsmenu.style.display == 'table') {
                settingsmenu.toggle();
                mustToggle = false;
            }

            if (mustToggle) video.toggle();
        };

        video.progress = function () {
            // happens when the buffer zone changes
            var duration = video.duration;
            if (duration > 0) {
                for (var i = 0; i < video.buffered.length; i++) {
                    if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
                        document.getElementById("timebar-buffered").style.width = video.buffered.end(video.buffered.length - 1 - i) / duration * 100 + "%";
                        break;
                    }
                }
            }
        };
    }, {}] }, {}, [1]);

