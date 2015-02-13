(function () { "use strict";
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
};
var State = { __ename__ : true, __constructs__ : ["WAITING_FOR_LETTER","WAITING_FOR_SPACE","WAITING_FOR_ENTER","IDLE"] };
State.WAITING_FOR_LETTER = ["WAITING_FOR_LETTER",0];
State.WAITING_FOR_LETTER.__enum__ = State;
State.WAITING_FOR_SPACE = ["WAITING_FOR_SPACE",1];
State.WAITING_FOR_SPACE.__enum__ = State;
State.WAITING_FOR_ENTER = ["WAITING_FOR_ENTER",2];
State.WAITING_FOR_ENTER.__enum__ = State;
State.IDLE = ["IDLE",3];
State.IDLE.__enum__ = State;
var TextInfo = { __ename__ : true, __constructs__ : ["CHAR","END"] };
TextInfo.CHAR = function(s,lastOfWord,lastOfLine) { var $x = ["CHAR",0,s,lastOfWord,lastOfLine]; $x.__enum__ = TextInfo; return $x; };
TextInfo.END = ["END",1];
TextInfo.END.__enum__ = TextInfo;
var _Main = {};
_Main.Line_Impl_ = function() { };
_Main.Line_Impl_.__name__ = true;
_Main.Line_Impl_._new = function() {
	return new Array();
};
_Main.Line_Impl_.add = function(this1,w) {
	var wrd = w.split("");
	this1.push(wrd);
};
_Main.Line_Impl_.next = function(this1) {
	if(this1.length == 0) return TextInfo.END;
	if(this1[0].length == 0) this1.shift();
	var lastCharInWord = this1[0].length == 1;
	var lastCharInLine = this1.length == 1 && lastCharInWord;
	return TextInfo.CHAR(this1[0].shift(),lastCharInWord,lastCharInLine);
};
_Main.Line_Impl_.complete = function(this1) {
	return this1.length == 0;
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	var doc = window.document;
	doc.onkeydown = Main.onKeyDown;
	Main.contentDiv = doc.getElementById("contents");
	Main.loadText();
	Main.appendLine();
};
Main.loadText = function() {
	var r = new haxe.Http("Main.hx");
	r.onError = js.Lib.alert;
	r.onData = Main.onDataLoaded;
	r.request(false);
};
Main.onDataLoaded = function(d) {
	var a = d.split("\n");
	Main.lines = [];
	var _g = 0;
	while(_g < a.length) {
		var l = a[_g];
		++_g;
		if(l == "") continue;
		var line = new Array();
		var words = l.split(" ");
		var _g1 = 0;
		while(_g1 < words.length) {
			var w = words[_g1];
			++_g1;
			if(w == "") continue;
			var wrd = w.split("");
			line.push(wrd);
		}
		Main.lines.push(line);
	}
	Main.status = State.WAITING_FOR_LETTER;
	Main.appendLine();
};
Main.appendLine = function() {
	Main.contentDiv.appendChild((function($this) {
		var $r;
		var _this = window.document;
		$r = Main.currentParagraph = _this.createElement("pre");
		return $r;
	}(this)));
};
Main.appendText = function(s) {
	if(s == "\t") s = "    ";
	Main.currentParagraph.innerHTML += s;
	window.scrollTo(0,window.document.body.scrollHeight + 50);
};
Main.completeLine = function() {
	try {
		while(true) {
			var _g;
			var this1 = Main.lines[0];
			if(this1.length == 0) _g = TextInfo.END; else {
				if(this1[0].length == 0) this1.shift();
				var lastCharInWord = this1[0].length == 1;
				var lastCharInLine = this1.length == 1 && lastCharInWord;
				_g = TextInfo.CHAR(this1[0].shift(),lastCharInWord,lastCharInLine);
			}
			switch(_g[1]) {
			case 0:
				var lastOfLine = _g[4];
				var lastOfWord = _g[3];
				var s = _g[2];
				Main.appendText(s);
				if(lastOfWord) Main.appendText(" ");
				if(lastOfLine) throw "__break__";
				break;
			case 1:
				throw "__break__";
				break;
			}
		}
	} catch( e ) { if( e != "__break__" ) throw e; }
	Main.lines.shift();
	Main.appendLine();
	Main.status = State.WAITING_FOR_LETTER;
};
Main.advance = function() {
	if(Main.status != State.WAITING_FOR_LETTER) return false;
	if(Main.lines.length == 0) {
		Main.status = State.IDLE;
		Main.appendLine();
		Main.loadText();
		return false;
	} else {
		var _g;
		var this1 = Main.lines[0];
		if(this1.length == 0) _g = TextInfo.END; else {
			if(this1[0].length == 0) this1.shift();
			var lastCharInWord = this1[0].length == 1;
			var lastCharInLine = this1.length == 1 && lastCharInWord;
			_g = TextInfo.CHAR(this1[0].shift(),lastCharInWord,lastCharInLine);
		}
		switch(_g[1]) {
		case 0:
			var lastOfLine = _g[4];
			var lastOfWord = _g[3];
			var s = _g[2];
			Main.appendText(s);
			if(lastOfLine) {
				Main.lines.shift();
				if(Main.requireEnter && !Main.allowSkipLine) Main.status = State.WAITING_FOR_ENTER; else Main.appendLine();
			} else if(lastOfWord) {
				if(Main.requireSpaces) Main.status = State.WAITING_FOR_SPACE; else Main.appendText(" ");
			}
			break;
		case 1:
			Main.lines.shift();
			if(Main.lines.length == 0) Main.status = State.IDLE; else if(Main.requireEnter) Main.status = State.WAITING_FOR_ENTER; else Main.status = State.WAITING_FOR_LETTER;
			return false;
		}
	}
	return true;
};
Main.onKeyDown = function(keyevent) {
	var key = keyevent.keyCode;
	var _g = Main.status;
	switch(_g[1]) {
	case 2:
		if(key == 13) {
			Main.appendLine();
			Main.status = State.WAITING_FOR_LETTER;
		}
		break;
	case 1:
		if(key == 32) {
			Main.appendText(" ");
			Main.status = State.WAITING_FOR_LETTER;
		}
		break;
	case 0:
		if(Main.allowSkipLine && key == 13) Main.completeLine(); else {
			var _g2 = 0;
			var _g1 = Main.interval;
			while(_g2 < _g1) {
				var i = _g2++;
				if(i == 0) Main.advance(); else haxe.Timer.delay(Main.advance,i * (16 + Std.random(60)));
			}
		}
		break;
	case 3:
		break;
	}
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var haxe = {};
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe.Http.__name__ = true;
haxe.Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h1 = $it1.next();
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Browser = function() { };
js.Browser.__name__ = true;
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
js.Lib = function() { };
js.Lib.__name__ = true;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.__name__ = true;
Array.__name__ = true;
Main.KEY_ENTER = 13;
Main.KEY_SPACE = 32;
Main.TAB = "    ";
Main.requireSpaces = false;
Main.requireEnter = true;
Main.allowSkipLine = true;
Main.interval = 2;
Main.status = State.IDLE;
Main.lines = [];
Main.main();
})();
