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