var createEditor = 
	function(editorId, runButtonId) {
		var editor,
			options = {
				lineNumbers: true,
				matchBrackets: true,
				onCursorActivity: function() {
					editor.setLineClass(highlight, null);
					highlight = editor.setLineClass(editor.getCursor().line, "activeline");
				}
			},
			editor = CodeMirror.fromTextArea(document.getElementById(editorId), options),
			highlight = editor.setLineClass(0, "activeline");
	
		$(document.getElementById(runButtonId)).click(function() {
			eval(editor.getValue());
		});
	
		return editor;
	},
	readableEditor = createEditor('ReadableCode', 'RunReadable'),
	speedEditor = createEditor('SpeedCode', 'RunSpeed'),
	wordList = [];

// HTML5 details polyfill
$('details').details();

// Conditionally load word list from server
if(!(wordList = amplify.store('wordList'))) {
	$.get('wordlist.txt', function(data) {
		wordList = data.split(/\s/);
		amplify.store('wordList', wordList);
	});
}


// // http://benchmarkjs.com/docs
// var suite = new Benchmark.Suite;
// 
// suite.add('RegExp#test', function() {
//   /o/.test('Hello World!');
// })
// .add('String#indexOf', function() {
//   'Hello World!'.indexOf('o') > -1;
// })
// .on('cycle', function(event, bench) {
//   console.log(String(bench));
// })
// .on('complete', function() {
//   console.log('Fastest is ' + this.filter('fastest').pluck('name'));
// })
// .run({ 'async': true });