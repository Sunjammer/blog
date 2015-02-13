package;

import haxe.Http;
import haxe.Timer;
import js.Browser;
import js.html.Element;
import js.html.KeyboardEvent;
import js.html.ParagraphElement;
import js.Lib;

enum State {
	WAITING_FOR_LETTER;
	WAITING_FOR_SPACE;
	WAITING_FOR_ENTER;
	IDLE;
}

enum TextInfo {
	CHAR(s:String, lastOfWord:Bool, lastOfLine:Bool);
	END;
}
abstract Line(Array<Array<String>>) {
	public inline function new() {
		this = new Array<Array<String>>();
	}
	public inline function add(w:String) {
		var wrd = w.split("");
		this.push(wrd);
	}
	
	public inline function next():TextInfo {
		if (complete()) return END;
		if (this[0].length == 0) this.shift();
		var lastCharInWord = this[0].length == 1;
		var lastCharInLine = this.length == 1 && lastCharInWord;
		return CHAR(this[0].shift(), lastCharInWord, lastCharInLine);
	}
	
	public inline function complete() {
		return this.length == 0;
	}
}

class Main 
{
	static inline var KEY_ENTER = 13;
	static inline var KEY_SPACE = 32;
	
	static inline var TAB = "    ";
	static var contentDiv:Element;
	
	static var requireSpaces:Bool = false;
	static var requireEnter:Bool  = true;
	static var allowSkipLine:Bool = true;
	static var interval:Int = 2;
	
	static var status:State = IDLE;
	
	static var currentParagraph:Null<Element>;
	
	static var lines:Array<Line> = [];
	
	static function main() 
	{
		var doc = Browser.document;
		doc.onkeydown = onKeyDown;
		contentDiv = doc.getElementById("contents");
		
		loadText();
		
		appendLine();
	}
	
	static function loadText() {
		var r = new Http("Main.hx");
		r.onError = js.Lib.alert;
		r.onData = onDataLoaded;
		r.request(false);
	}
	
	static function onDataLoaded(d:String) {
		var a = d.split("\n");
		lines = [];
		for (l in a) {
			if (l == "") continue;
			var line = new Line();
			var words = l.split(" ");
			for (w in words) {
				line.add(w);
			}
			lines.push(line);
		}
		status = WAITING_FOR_LETTER;
		appendLine();
	}
	
	static inline function appendLine() {
		contentDiv.appendChild(currentParagraph = Browser.document.createPreElement());
	}
	
	static inline function appendText(s:String) {
		if (s == "\t") s = TAB; 
		currentParagraph.innerHTML += s;
		Browser.window.scrollTo(0,Browser.document.body.scrollHeight+50);
	}
	
	static function completeLine():Void {
		while (true) {
			switch(lines[0].next()) {
				case CHAR(s, lastOfWord, lastOfLine):
					appendText(s);
					if (lastOfWord) appendText(" ");
					if (lastOfLine) break;
				case END:
					break;
			}
		}
		lines.shift();
		appendLine(); 
		status = WAITING_FOR_LETTER;
	}
	
	static function advance() {
		if (status != WAITING_FOR_LETTER) return false;
		if (lines.length == 0) {
			status = IDLE;
			appendLine(); 
			loadText();
			return false;
		}else {
			switch(lines[0].next()) {
				case CHAR(s, lastOfWord, lastOfLine):
					appendText(s);
					if (lastOfLine) {
						lines.shift();
						if (requireEnter && !allowSkipLine) {
							status = WAITING_FOR_ENTER;
						}else {
							appendLine();
						}
					}else if (lastOfWord) {
						if (requireSpaces) {
							status = WAITING_FOR_SPACE;
						}else {
							appendText(" ");
						}
					}
				case END:
					lines.shift();
					status = lines.length == 0?IDLE:requireEnter?WAITING_FOR_ENTER:WAITING_FOR_LETTER;
					return false;
			}
		}
		return true;
	}
	
	static function onKeyDown(keyevent:KeyboardEvent) 
	{
		var key = keyevent.keyCode;
		switch(status) {
			case WAITING_FOR_ENTER:
				if (key == KEY_ENTER) {
					appendLine();
					status = WAITING_FOR_LETTER;
				}
			case WAITING_FOR_SPACE:
				if (key == KEY_SPACE) {
					appendText(" ");
					status = WAITING_FOR_LETTER;
				}
			case WAITING_FOR_LETTER:
				if (allowSkipLine && key == KEY_ENTER) {
					completeLine();
				}else {
					for (i in 0...interval) {
						if (i == 0) advance();
						else Timer.delay(advance, i * (16+Std.random(60)));
					}
				}
			case IDLE: //We've no data to work with
		}
	}
	
}