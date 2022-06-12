(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Sandbox = function(sr){

  sr = {};
  sr.up = function(msg){ window.parent.postMessage(msg, '*'); }  // TODO: AUDIT! THIS LOOKS SCARY, BUT '/' NOT WORK FOR SANDBOX 'null' ORIGIN. IS THERE ANYTHING BETTER?

  function fail(){ fail.yes = 1; document.body.innerHTML = "<center>SecureRender has detected an external threat trying to tamper with the security of your application.<br/>Please reload to restore security. If you still have problems, search for a more trusted source to load the application from.</center>" }

  ;(function(){
    sr.fail = "Blocked a script from leaking secure data (sandbox).";
    sr.ban = new Map;
    var tmp = window;
    while(tmp !== tmp.parent && (tmp = tmp.parent)){
      sr.ban.set(tmp, 1);
      sr.ban.set(tmp.postMessage, 1);
    }
  }());

  window.onmessage = function(eve){ // hear from app, enclave, and workers.
    var msg = eve.data;
    if(!msg){ return }
    if(u !== msg.length){ return sr.how.view(msg) }
    //if(msg.length){ return sr.how.run(msg) }
    var tmp = sr.how[msg.how];
    if(!tmp){ return }
    tmp(msg, eve);
  };

  sr.workers = new Map;
  sr.run = function(msg, eve){
    if(sr.workers.get(msg.get)){ return }
    console.log("spawn untrusted script in worker:", msg);

    var url = window.URL.createObjectURL(new Blob(["("+the+")()||(breath = async function(){"+msg.put+"})"]));
    var worker = new Worker(url), u;
    sr.workers.set(worker.id = msg.get, worker);
    worker.last = worker.rate = msg.rate || 16; // 1000/60

    worker.addEventListener('message', window.onmessage);
  }

  var view;
  sr.how = {}; // RPC
  sr.how.html = function(msg){
    if(view){ return fail() } // only run once.
    view = document.getElementById('SecureRender');
    var div = document.createElement('div');
    div.innerHTML = msg.put;
    var all = div.getElementsByTagName('script'), i = 0, s, t;
    while(s = all[i++]){
      if(!s.matches('secured')){
        s.className = 'secured';
        if(!s.id){ s.id = 's'+Math.random().toString(32).slice(2) }
        if(!s.rate){ s.rate = (parseFloat(s.getAttribute('rate'))||0.016)*1000 }
        if(t = s.innerText){
          sr.run({how: 'script', put: t, get: s.id, rate: s.rate});
        }
      }
    }
  }

  sr.how.localStore = function(msg, eve){
    var tmp;
    if(tmp = msg.to){
      (tmp = sr.workers.get(tmp)) && tmp.postMessage(msg);
      return;
    }
    msg.via = eve.target.id;
    sr.up(msg);
  }
  window.addEventListener('storage', function(a,b,c,d,e,f){
    //console.log("store", a,b,c,d,e,f); // TODO: Implement update.
  });
  sr.how.say = function(msg){
    (beep = new SpeechSynthesisUtterance()).text = msg.text;
    beep.rate = msg.rate || 1, beep.pitch = msg.pitch || 1, speechSynthesis.speak(beep);
  }

  function the(){ // THIS CODE RUNS INSIDE THE WEBWORKER!
    if(this.the){ return the }
    this.the = the;
    the.aim = the.aim || {};
    the.key = the.key || {};
    onmessage = async function(eve){
      var msg = eve.data;
      if(view !== the.view){
        place(stay).into(view);
        place(the.view).into(stay);
        the.view = view;
      }
      if(!msg){ return }
      if(u !== msg.length){
        if(breath.ago){ return } // app wants to await an earlier frame, so hold breath. :(
        var l = msg.length/2, i = -1, t, p, k, v; while(++i < l){
          p = msg[i];
          v = msg[l+i];
          t = the;
          p = p.split('_');
          while((k = p.shift()) && p.length){ t = t[k] || (t[k] = {}) }
          t[k] = v;
        }
        l = breath.now || -1;
        breath.ago = ((breath.now = perf.now()) - l);
        await breath();
        breath.was = l;
        breath.ago = 0;
        if(!up.s.length){ return }
        up(up.s);
        up.s = [];
        return;
      }
      if(msg.ack){
        map.get(msg.ack).apply(this, msg.ask);
      }
    }

    var up = postMessage, opt = {}, map = new Map, id = 0, bc = 0, perf, u;
    up.s = []; perf = this.performance || {now: function(){ return +new Date }};

    Math.mix = function (a,b,m) { m = m || 0; return a + (b-a) * m }
    Math.remix = function(a,b,m){ m = m || 0; return (m - a) / (b - a) }
    
    // localStorage is not async, so here is a quick async version for testing.
    // TODO: indexedDB is in webworkers, so maybe that should be encouraged instead, to stick with standards?
    this.localStore = new Proxy({}, {get: function(at,has,put){
      if(u !== (put = at[has])){ return put }
      put = new Promise(function(res, rej){
        var ack = Math.random(), any = function(v){
          res(at[has] = v);
          map.delete(ack);
          clearTimeout(ack);
        }, to = setTimeout(any, opt.lack || 9000);
        map.set(ack, any);
        up({how: 'localStore', get: has, ack: ack});
      });
      put.toString = tS;
      return put;
    }, set: function(at,has,put){
      console.log("store:", has, put);
      up({how: 'localStore', get: has, put: put});
    }});
    function tS(){ return '' };

    var pid = Math.random().toString(32).slice(-4), pi = 0;
    var view = function(what){
      what.C = (what.C||0)+1;
      return places.get(what) ||
        (what && place === what.place && what) ||
        (places.set(what, what = new Proxy(what, place.ing)) && what)
    }, was = {}, stay = {fill:''}, places = new Map, place;
    places.set(the.view = view, {name:'SecureRender'});
    place = view.place = function(what, how, where){
      if(!how){
        was.what = what;
        was.how = how;
        was.where = where;
        return place;
      }
      var b = places.get(where || the.view) || (place === where.place && where)
      if(!b){ return }
      if(what instanceof Array){
        if(where){ where.fill = u }
        var i = 0, tmp;
        while(tmp = what[i++]){ place(tmp, how, where) }
        return;
      }
      var a = places.get(what) || (what && place === what.place && what), msg = {};
      if(!a){
        text = ('string' == typeof what);
        if(text && 0.1 == how && u !== b.fill){
          b.fill = msg.fill = what; // proxy will handle it now.
          return;
        } else {
          if(text){
            a = {fill: msg.fill = what};
          } else {
            a = msg = what;
          }
          places.set(what, a = new Proxy(a, place.ing));
        }
      }
      a.fill = what.fill;
      if((0.1 === how) || (-0.1 === how)){
        //if(b === a.up){ return }
        //a.up = b;
      } else {
        //a.up = b.up;
      }

      msg.name = a.name || ((msg = what).name = (pid+(++pi)));
      msg.sort = [how, (b||'').name];
      up.s.push(msg);
      return a;
    };
    place.ing = {get: function(at,has,put){
      if(place[has]){ return place(at)[has] }
      return at[has];
    }, set: function(at,has,put){
      var msg = {name: at.name};
      if(put){
        if(put.then){ at[has] = u; return }
        //if('function' == typeof put){ put = put.toString().slice(14, -4) } // TODO: shader support
      }
      msg[has] = at[has] = put;
      up.s.push(msg);
    }};
    place.place = place;
    place.begin = function(on){ return place(was.what, -0.1, on) }
    place.after = function(on){ return place(was.what, 1, on) }
    place.before = function(on){ return place(was.what, -1, on) }
    place.into = function(on){ return place(was.what, 0.1, on) }
    //place.text = function(t){ pm.s.push({what: }) }
    
    the.player = this.localStore;
    the.words = "english"; // TODO! Do not hardcode.
    the.unit = {cs: 5, ps: 1}; // TODO! Do not hardcode.
  }

  var breathe = function(){
    var time = perf.now();
    var change = Array.from(share.keys());
    push.apply(change, Array.from(share.values()));
    share = new Map;
    var s = sr.workers, l = Array.from(s.keys()), i = 0, c = change.length, w;
    while(w = l[i++]){
      if((w = s.get(w)) && c || (time - w.last) > w.rate){
        w.postMessage(change)
        w.last = time;
      }
    }
  }, push = Array.prototype.push, share = new Map, u;
  var perf = window.performance || {now: function(){ return +new Date }};
  setInterval(breathe,0);

  ;(function(){
    // This module needs to serialize various web events
    // so they are accessible in the web worker
    window.onmousemove = function(eve){
      share.set('aim_x', eve.pageX);
      share.set('aim_y', eve.pageY);
    }
    var keys = {};
    window.onkeydown = function (eve) {
      var key = "key_" + eve.code.replace('Key','');
      if (keys[key]) {
        return;
      }
      var now = +new Date();
      share.set(key, (keys[key] = now));
      key = "key_" + eve.which;
      share.set(key, (keys[key] = now));
    };
    window.onkeyup = function (eve) {
      var key = "key_" + eve.code.replace('Key','');
      share.set(key, (keys[key] = 0));
      key = "key_" + eve.which;
      share.set(key, (keys[key] = 0));
    };
    /* JOY
      LS move: [WASD]
        tap (or quick charge): jump (standing), leap (moving), hurdle/climb (obstacle), rebound (wall). [WW,AA,SS,DD]
        hold: drop (standing), slide (moving), dive (in air). [WS,SW]
      RS aim: [pointer]
        tap: grab/toss/interact, bash (double tap), crawl/climb
        hold: brace/shield (chargeable), 
      RT/LT fire/use (secondary, grenade) [space/shift]
      RB/LB switch/inventory [cmd/caps]
    */
    // 20dice 7px min.
  }());

  ;(function(){
  // this is the CSS3 matrix transform rendering engine fallback. WebGL would be preferred.
  sr.how.view = function(list){
    //console.log("render:", list);
    //view.innerHTML = "";
    // fill
    // turn
    // size
    // grab
    // sort
    var change, i = 0, u;
    while(change = list[i++]){ each(change) }
    function each(change, name, what, has, put, text, tmp){
      if(!(name = change.name)){ return }
      text = ('string' == typeof change.fill);
      if(!(what = map.get(name))){
        map.set(name, what = (text?
          document.createElement('p')
        : document.createElement('div')));
        if(!text){
          what.style.minWidth = '1'+place['cs'];
          what.style.minHeight = '1'+place['cs'];
        }
        what.id = 'v'+name.replace(aZ09,'');
        what.turn = [0,0,0];
        what.grab = [0,0,0];
        what.zoom = [1,1,1];
        what.unit = { turn: [], zoom: [], grab: [] };
        what.contentEditable = 'true';
      }
      if(u !== (put = change.time)){
        what.style.transitionDuration = put+'s';
      }
      if(u !== (put = change.flow)){
        what.style.textOrientation = 'upright';
        tmp = (put[0][0] || put[0]);
        what.style.whiteSpace = ('' == put[1])? 'nowrap' : 'normal';
        if('v' == put[1]){ what.style.writingMode = 'horizontal-tb' }
        else if('^' == put[1]){ console.warn('Flow up not supported.') }
        if('>' == tmp || '>' == put[1]){
          what.dir = 'ltr';
          if('v' == tmp){
            what.style.writingMode = what.stand = 'vertical-lr';
          } else
          if('^' == tmp){
            what.dir = 'rtl';
            what.style.writingMode = what.stand = 'vertical-lr';
          } else { what.stand = 0 }
        } else
        if('<' == tmp || '<' == put[1]){
          what.dir = 'rtl';
          if('v' == tmp){
            what.dir = 'ltr';
            what.style.writingMode = what.stand = 'vertical-rl';
          } else
          if('^' == tmp){
            what.style.writingMode = what.stand = 'vertical-rl';
          } else { what.stand = 0 }
        }
        change.drip = (u === (tmp = change.drip))? what.drip : tmp;
      }
      if(u !== (put = change.size)){
        if(text){
          what.style.fontSize = (put[0] || put)*100+'%';
        } else {
          if(tmp = put[0]){
            what.style.minWidth = tmp[0]+place[tmp[1]];
            what.style.maxWidth = tmp[2]+place[tmp[3]];
            if(what.stand){ what.style.lineHeight = what.style.minWidth }
          }
          // TODO: Support a default "resting state" between min/max.
          if(tmp = put[1]){
            what.style.minHeight = tmp[0]+place[tmp[1]];
            what.style.maxHeight = tmp[2]+place[tmp[3]];
            if(!what.stand){ what.style.lineHeight = what.style.minHeight }
          }
        }
      }
      if(u !== (put = change.drip)){
        what.drip = change.drip;
        tmp = ('rtl' === what.dir && what.stand)? ((1 === put)? 'right' : 'left') : '';
        what.style.textAlign = (1 === put)? (tmp || 'left') : ((-1 === put)? (tmp || 'right') : 'center');
      }
      //change.top && (what.style.verticalAlign = '-1em');
      if(text){ what.innerText = change.fill }
      if(u !== (tmp = change.sort)){
        // A dot on a line is at a defined place, but it might stretch up to a max.
        has = tmp[0][0] || tmp[0];
        put = map.get(tmp[1]) || '';
        if((tmp = what.nextSibling) && 'BR' === tmp.tagName){ tmp.remove() }
        if(put){ put.insertAdjacentElement(place[has], what) }
        if(text){
          if((tmp = what.previousSibling) && 'P' === tmp.tagName){ endline(tmp) }
          if((tmp = what.nextSibling) && 'P' === tmp.tagName){ endline(what) }
        }
      }
      if(u !== (tmp = change.fill)){
        var i = -1, l = tmp.length; while(++i < l){ tmp[i] = (tmp[i]*100)+'%' }
        what.style[text?'color':'background'] = "rgba("+tmp+")";
      }
      if(u !== (put = change.away)){
        what.style.verticalAlign = (-put[0])+place[put[1]]; // TODO
      }
      if(u !== (put = change.grab)){
        if(u !== put[2]){ change.zoom = [put[2], put[2], what.zoom[2]]; put[2] = 0; } // simulate 3D by converting Z to zoom.
        tmp = what.grab;
        var j = -1, l = put.length; while(++j < l){
          tmp[j] = put[j] || tmp[j] || 0;
            what.unit.grab[j] = "~";
        }
        change.t = 1;
      }
      if(u !== (put = change.turn)){
        tmp = what.turn;
        var j = -1, l = put.length; while(++j < l){
          tmp[j] = put[j] || tmp[j] || 0;
        }
        change.t = 1;
      }
      if(u !== (put = change.zoom)){
        tmp = what.zoom;
        var j = -1, l = put.length; while(++j < l){
          tmp[j] = put[j] || tmp[j] || 0;
        }
        change.t = 1;
      }
      if(change.t){
        tmp = what.style.transform = "translate3d("+what.grab.join(place[what.unit.grab[0]] + ",")+") rotateZ("+what.turn[0]+"turn) " + "rotateX("+what.turn[1]+"turn) " + "rotateY("+what.turn[2]+"turn) scale3d("+what.zoom+")";
      }
    }
    
  };

  map = new Map, place = {'-1':'beforebegin', '-0.1': 'afterbegin', '0.1':'beforeend', '1': 'afterend', '%':'%', '~':'em', '.':'px'}, aZ09 = /\W/ig;
  function endline(tmp){ tmp.insertAdjacentElement(place[1], document.createElement('br')); }
  map.set('SecureRender', document.getElementById('SecureRender'));
  map.set(1, window);

  }());


  ;(function(){


  return; // WEBGL RENDERER TURNED OFF BY DEFAULT, COMMENT OUT THIS LINE TO REPLACE THE HTML ONE. IT IS STILL COMPLETELY BROKEN AND DOES NOT OBEY THE LAYOUT RULES YET.
  var see = {};
  var map = new Map;
  var Numbers = Float32Array;

  //attribute vec4 hue;
  //uniform mat4 mat;
  //gl_Position = mat * move * dot;
  see.dot = function(){/*
  attribute vec4 dot;
  attribute vec2 grab;
  attribute vec4 hue;
  uniform float scroll;
  varying vec4 fill;
  void main() {
    mat4 move = mat4(
      vec4(1, 0, 0, 0),
      vec4(0, 1, 0, 0),
      vec4(0, 0, 1, 0),
      vec4(grab, 0, 1));
    gl_Position = move * (dot + vec4(0,scroll,0,0));
    fill = hue;
  }
  */}
  see.fill = function(){/*
  precision mediump float;
  varying vec4 fill;
  void main() {
    gl_FragColor = fill;
  }
  */}

  see.create = function(){
    if(see.DOM){ return }
    var w = window, c = document.createElement('canvas'), tmp;
    c.width = w.innerWidth, c.height = see.tall = w.innerHeight;
    (tmp = c.style).position = 'fixed'; tmp.left = tmp.top = 0;
    SecureRender.appendChild(see.DOM = c);
    var gl = see.gl = c.getContext('webgl');
    gl.goto = gl.useProgram;
    gl.select = gl.bindBuffer;
    gl.load = gl.bufferData;
    gl.modify = gl.bufferSubData;
    gl.find = gl.getAttribLocation;
    gl.focus = gl.enableVertexAttribArray;
    gl.describe = gl.vertexAttribPointer;
    gl.many = gl.getExtension('ANGLE_instanced_arrays');

    see.view(see.code(see.dot), see.code(see.fill), 'box');
    sr.how.view = render;
  }
  see.view = function(dots, fills, name){
    var gl = see.gl, err = gl.COMPILE_STATUS;
    // Compile the vertex shader:
    var dot = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(dot, dots);
    gl.compileShader(dot);
    if(!gl.getShaderParameter(dot, err)){ throw new Error(gl.getShaderInfoLog(dot)) }

    // Compile the fragment shader:
    var fill = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fill, fills);
    gl.compileShader(fill);
    if(!gl.getShaderParameter(fill, err)){ throw new Error(gl.getShaderInfoLog(fill)) }

    // Link the view to use it.
    var view = see.view[name || Math.random()] = gl.createProgram();
    gl.attachShader(view, dot);
    gl.attachShader(view, fill);
    gl.linkProgram(view);
    if(!gl.getProgramParameter(view, gl.LINK_STATUS)){ throw new Error(gl.getProgramInfoLog(view)) }
    gl.goto(view);

    // The view needs to know where every dot/corner of a 3D/2D/1D shape model will be:
    view.box = gl.createBuffer(); // This is like saying `var box = new Array;` in JS.
    // However, when we want to modify it, gl does not know our variable name...
    gl.select(gl.ARRAY_BUFFER, view.box); // so we have to select it
    gl.load(gl.ARRAY_BUFFER, new Float32Array([ // in order to modify
      -0.1,-0.1,
        0.1,-0.1,
      -0.1, 0.1,
      -0.1, 0.1,
        0.1,-0.1,
        0.1, 0.1
    ]), gl.STATIC_DRAW);
    // Now we need to explain how the data is laid out in the matrix.
    view.dot = gl.find(view, 'dot'); // The dots/corners are at this place.
    gl.focus(view.dot); // Now let's explain how to extract just this variable
    gl.describe(view.dot, 2, gl.FLOAT, false, 0, 0); // out of the selected buffer.
    // ^ "Each dot is 2 numbers at a time, no normalizing, ? + ?"

    var bytes = Numbers.BYTES_PER_ELEMENT;
    view.buff = gl.createBuffer();
    view.update = new Numbers([]);
    gl.select(gl.ARRAY_BUFFER, view.buff);
    gl.load(gl.ARRAY_BUFFER, view.update, gl.DYNAMIC_DRAW);
    view.grab = gl.find(view, 'grab');
    gl.focus(view.grab);
    gl.describe(view.grab, 2, gl.FLOAT, false, 6*bytes, 0); // (x,y r,g,b,a) = 6 floats of 4 bytes
    gl.many && gl.many.vertexAttribDivisorANGLE(view.grab, 1);
    view.hue = gl.find(view, 'hue');
    gl.focus(view.hue);
    gl.describe(view.hue, 4, gl.FLOAT, false, 6*bytes, 2*bytes); // rgba = 4 items, 6 floats per box, the colors start at 2*bytes into the list (grab is the first 2*bytes).
    gl.many && gl.many.vertexAttribDivisorANGLE(view.hue, 1);
    //gl.many.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, instances);
  };
  see.code = function(fn){ return fn.toString().slice(14, -4) };
  see.create();
  see.all = 0;

  //function grow(a, x, r){ return (r = new Numbers(a.length + (x||100))).set(a, 0), r } // however much bigger you want it. Delete this, just inline it!
  function render(list){
    var gl = see.gl, box = see.view.box;
    var change, i = 0, u;
    while(change = list[i++]){ each(change) }
    function each(change, name, what, has, put, text, tmp){
      if(!(name = change.name)){ return }
      text = ('string' == typeof change.fill);
      if(!(what = map.get(name))){
        map.set(name, what = {i: see.all});
        box.s = (box.s || 0) + 1;
        see.all += 6;
        (tmp = new Numbers(box.update.length + 6)).set(box.update, 0); box.update = tmp;
        gl.select(gl.ARRAY_BUFFER, box.buff);
        gl.load(gl.ARRAY_BUFFER, box.update, gl.DYNAMIC_DRAW); 
        if(!text){
          //what.style.minWidth = '1'+place['cs'];
          //what.style.minHeight = '1'+place['cs'];
          var i = what.i;
          box.update[i+0] = 0;
          box.update[i+1] = 0;
        }
        what.id = 'v'+name.replace(aZ09,'');
        //what.size = [1,1,1]
        what.turn = [0,0,0];
        what.grab = [0,0,0];
        what.zoom = [1,1,1];
        what.fill = [0,0,0];
        what.away;
        what.drip;
        what.flow;
        what.sort;
        what.unit = { turn: [], zoom: [], grab: [] };
      }
      var i = what.i;
      if(u !== (put = change.size)){
        //console.log(name, "should be size", put[0], put[1]);
        //gl.uniform2fv(gl.size, [(put[0][0] || put[0])/4, (put[1][0] || put[1])/4 ]);
      }
      if(u !== (put = change.grab)){
        box.update[i+0] = what.grab[0] = put[0]/50; // this is the gl X coordinate of the box
        box.update[i+1] = what.grab[1] = (put[1]/50) + (see.scroll); // this is the gl Y coordinate of the box.
      }
      if(u !== (put = change.fill)){
        box.update[i+2] = what.fill[0] = put[0];
        box.update[i+3] = what.fill[1] = put[1];
        box.update[i+4] = what.fill[2] = put[2];
        box.update[i+5] = what.fill[3] = put[3]||1;
      }
    }
    gl.select(gl.ARRAY_BUFFER, box.buff);
    gl.modify(gl.ARRAY_BUFFER, 0, box.update);
    //console.log("?", box.update);
    gl.many.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, box.s); // TODO: enable fallback!
    return;
  }
  render.scroll = function(){ // UPGRADE THIS TO VIEW MATRIX TRANSFORM.
    var gl = see.gl, box = see.view.box;
    box.scroll = gl.getUniformLocation(box, 'scroll'); // THIS IS THE SLOW WAY TO DO THIS, REFACTOR TO viewspace/translation
    gl.uniform1f(box.scroll, see.scroll); // out of the selected buffer.
    render([]);
  }

  see.scroll = 0;
  ;(function(){ // TMP! DELTE! // NOTE: Why is this with GL? It should work with both. But for now, we're working on GL, so ... we hacked it in here.
  var s = document.body.style, i = window.innerHeight, h = i, _y;
  s.height = (h *= 10)+'px';
  function scroll(){
    var y = window.scrollY, r = y / h, d = y - _y; _y = y;
    see.scroll = y/see.tall;
    if(d > 0){
      s.height = (h += i*0.1*r)+'px';
    } else
    if(r < 0.75 && (i*10) < h){
      s.height = (h -= i*0.1)+'px';
    }
    render.scroll();
  }
  window.onwheel = scroll;
  }());

  }());

}


Sandbox.layoutcss = "html, body {\n\tmargin: 0;\n\tpadding: 0;\n  width: 100vw;\n  min-height: 100vh;\n  line-height: 100vh;\n\tposition: relative;\n  text-align: center;\n  vertical-align: middle;\n\n  b-ackground: black;\n  c-olor: white;\n  font-size: 18pt;\n}\n\n* { out-line: 1px dashed black; }\n\nbody > div {\n  width: 100%;\n  ov-erflow: auto;\n}\n\n\ndiv, ul, ol, li, p, span, form, button, input, textarea, img, line, text {\n  margin: 0;\n  padding: 0;\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box;\n  vertical-align: middle;\n  text-align: center;\n  line-height: normal;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}\n\na, button, input, textarea {\n  background: inherit;\n  border: inherit;\n  color: inherit;\n  text-decoration: inherit;\n  outline: none;\n}\ninput:not([type=button]):not([type=submit]), textarea {\n\twidth: 100%;\n}\n\na:focus, button:focus, input[type=button]:focus, input[type=submit]:focus {\n  animation: pulse 2s infinite;\n}\n\nul, li {\n  list-style: none;\n}\n\np, text {\n  line-height: 1.5;\n  text-align: left;\n  text-align: initial;\n  text-align: start;\n  v-ertical-align: baseline;\n  max-width: 48em;\n  padding: 0 0.4em;\n}\np + p, text + text {\n  padding-top: 0;\n}\n\n[contenteditable=true]:empty:before {\n  content: attr(placeholder);\n}\n::placeholder, .hint {\n  color: inherit;\n  opacity: 0.3;\n}\n\n.model, .none { display: none }\n.hide {\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s;\n}\n\n.full {\n  width: 100%;\n  min-height: 100vh;\n}\n.max {\n  max-width: 48em;\n}\n.min {\n  min-width: 12em;\n}\n.pad {\n  width: 95%;\n  margin: 5% auto;\n  max-width: 48em;\n  min-width: 12em;\n}\n\n.row {\n  width: 100%;\n}\n.row::after {\n  content: \"\";\n  display: block;\n  clear: both;\n}\n.col {\n  max-width: 24em;\n  min-width: 12em;\n}\n\n.center {\n  text-align: center;\n  vertical-align: middle;\n  margin-left: auto;\n  margin-right: auto;\n}\n.right {\n  float: right;\n  text-align: right;\n}\n.left {\n  float: left;\n  text-align: left;\n}\n.mid { \n  margin-left: auto;\n  margin-right: auto; \n}\n.top {\n  vertical-align: top;\n}\n.low {\n  vertical-align: bottom;\n}\n\n.rim { margin: 1%; }\n.gap {\n  padding: 3%;\n  padding: clamp(0.5em, 3%, 1.5em);\n}\n.stack { line-height: 0; }\n.crack { margin-bottom: 1%; }\n.sit { margin-bottom: 0; }\n\n.focus {\n  margin-left: auto;\n  margin-right: auto;\n  float: none;\n  clear: both;\n}\n\n.leak { overflow: visible; }\n.hold { overflow: hidden; }\n\n.act {\n  /*display: block;*/\n  font-weight: normal;\n  text-decoration: none;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  cursor: pointer;\n}\n\n.unit, .symbol {\n  display: inline-block;\n  vertical-align: inherit;\n}\n\n.shade { background: rgba(0%, 0%, 0%, 0.1); }\n.tint { background: rgba(100%, 100%, 100%, 0.1); }\n\n.pulse {\n  animation: pulse 2s infinite;\n} @keyframes pulse {\n  0% {opacity: 1;}\n  50% {opacity: 0.5;}\n  100% {opacity: 1;}\n}";

module.exports = Sandbox;
},{}],2:[function(require,module,exports){
;(function(sr){
/* WITHOUT SECURE RENDER, BROWSERS SAVE USER DATA TO THE APPLICATION'S DOMAIN.
THIS MEANS THE DOMAIN'S OWNER CAN ACCESS YOUR DATA. SECURE RENDER FIXES THIS.
SECURE RENDER CREATES A SECURITY CONTEXT UNDER THE USER INSTEAD, NOT THE APP.
APPLICATION LOGIC IS THEN RUN IN A THIRD CONTEXT, ISOLATED FROM ALL DOMAINS.

THIS CODE IS USED AS BOTH A BROWSER EXTENSION AND A POLYFILL SHIM FOR WEBSITE APPS.
IF THIS CODE IS RUNNING INSIDE THE BROWSER: USER DATA IS SAVED AND PROTECTED THERE.
ELSE WARNING: UNTIL BROWSERS SUPPORT THIS, A USER CONTEXT IS SHIMMED UNDER THE POLYFILL,
WHILE THIS IS MORE SECURE THAN APP OWNERS HAVING ACCESS TO DATA, IT STILL HAS RISKS.
TO LEARN MORE ABOUT THESE LIMITATIONS, PLEASE READ SECURERENDER.ORG

HOW SECURE RENDER WORKS: APP -> [ IFRAME SHIELD -> [SECURE RENDER] <-> USER DATA ]
AN APP ONLY EVER FEEDS IN VIEW LOGIC. DATA IS NEVER SENT BACK UP! */
sr = {browser: (window.browser || window.chrome)};
try{ !sr.browser && navigator.serviceWorker.register('./service.js') }catch(e){};

(function start(i){
  var sandbox = require("./sandbox")
  // TODO: talk to cloudflare about enforcing integrity meanwhile?
  i = sr.i = document.createElement('iframe');
  i.className = 'SecureRender';
  i.style = "position: fixed; border: 0; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0;";
  i.sandbox = 'allow-scripts allow-popups allow-downloads allow-pointer-lock';
  i.csp = "script-src 'self' 'unsafe-inline'; default-src data: blob: mediastream: filesystem:; style-src 'self' 'unsafe-inline'; child-src 'self' blob:; worker-src blob: 'self';";
  sr.send = function(msg){ i.contentWindow.postMessage(msg, '*') } // TODO: AUDIT! THIS LOOKS SCARY, BUT '/' NOT WORK FOR SANDBOX 'null' ORIGIN. IS THERE ANYTHING BETTER?
  // i.src = "./sandbox.html";
  i.src = window.URL.createObjectURL(new Blob([`<!DOCTYPE html>
  <html><head>  
  <meta http-equiv="x-dns-prefetch-control" content="off">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>${sandbox.layoutcss}</style>
  </head>
  <body>
  <div id='SecureRender'></div>
  \x3Cscript>;(${sandbox})();\x3C/script>
  </body></html>`], {type : 'text/html'}));
  document.body.appendChild(i);
}());

window.onmessage = function(eve){
  eve.preventDefault();
  eve.stopImmediatePropagation();
  var msg = eve.data, tmp, u;
  //console.log("ENCLAVE ONMESSAGE", msg);
  if(!msg){ return }
  //if(eve.origin !== location.origin){ console.log('meow?',eve); return }
  if(eve.source !== sr.i.contentWindow){ return sr.send(msg) }
  tmp = sr.how[msg.how];
  if(!tmp){ return }
  tmp(msg, eve);
};

sr.how = {
  // localStorage is not async, so here is a quick async version for testing.
  localStore: function(msg, eve){ var u;
    if(u !== msg.put){
      localStorage.setItem(msg.get, msg.put);
    } else
    if(msg.get){
      sr.send({to: msg.via, ack: msg.ack, ask: [localStorage.getItem(msg.get)], how: 'localStore'});
    }
  }
}

window.addEventListener('storage', function(a,b,c,d,e,f){
  console.log("enclave", a,b,c,d,e,f);
});

}());
},{"./sandbox":1}]},{},[2]);