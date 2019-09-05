function fetchExample(exampleId) {
	return fetch(`examples/${exampleId}`)
		.then(res => res.ok ? res.text() : null);
}
// TODO use window.location.hash instead of document.URL
function url2src(url) {
	let n = url.lastIndexOf("#");
	if(n == -1) {
		return "";
	}
	return url.substr(n + 1);
}
function makeTitle(name) {
	console.log(`Planck.js Playground - ${name}`);
	return `Planck.js Playground - ${name}`;
}

let nav = document.getElementsByTagName('NAV')[0];
let typingPaths = [
	'./node_modules/planck-js/lib/index.d.ts',
	'./node_modules/planck-js/lib/collision/index.d.ts',
	'./node_modules/planck-js/lib/common/index.d.ts',
	'./node_modules/planck-js/lib/joint/index.d.ts',
	'./node_modules/planck-js/lib/shape/index.d.ts',
	'./node_modules/planck-js/testbed/index.d.ts'
];

// This is used to check whether a src got requested before another fetch fulfilled.
let pendingSrc = "";

function initialLoad() {
	let value, link, url;
	let src = url2src(document.URL);
	if(!src) {
		link = nav.getElementsByTagName('A')[0];
		url = link.href;
		src = url2src(url);
	} else {
		url = document.URL;
		let links = nav.getElementsByTagName('A');
		for(let l of links) {
			if(l.href.toLowerCase() === url.toLowerCase()) {
				link = l;
				break;
			}
		}
	}
	if(link) {
		// history.state !== null can happen in Firefox when reloading
		history.replaceState(history.state, makeTitle(link.innerText), url);
		link.parentElement.parentElement.previousElementSibling.classList.add("open");
	}
	pendingSrc = src;
	if(history.state && history.state.code) {
		value = Promise.resolve(history.state.code);
	} else {
		value = fetchExample(src);
	}
	value.then(value => {
		handleCodeLoaded(src, value);
		if(history.state && history.state.view) {
			editor.restoreViewState(history.state.view);
		}
	});
}

initialLoad();

// validation settings
monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
	noSemanticValidation: true,
	noSyntaxValidation: false,
});
// compiler options
monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    noLib: true,
	target: monaco.languages.typescript.ScriptTarget.ES6,
	allowNonTsExtensions: true,
});

let editorContainer = document.getElementById('editor');
var editor = monaco.editor.create(editorContainer, {
	language: 'javascript',
	minimap: {enabled: false},
	readOnly: true,
	// Batman style
	theme: 'vs-dark',
});
editor.addAction({
	id: "runCode",
	label: "Run Code",
	keybindings: [
		monaco.KeyCode.F5,
		monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B,
	],
	run(editor) {
		view.reset();
		view.addCode(editor.getValue());
	},
});
editor.addAction({
	id: "toggleLayout",
	label: "Toggle Layout",
	run() {
		document.body.classList.toggle('horizontal');
		updateLayout();
	},
});

window.onresize = updateLayout;

function updateLayout() {
	editor.layout({
		width: editorContainer.clientWidth,
		height: editorContainer.clientHeight,
	});
}

// Load Typescript definitions
typingPaths.forEach(path => {
	fetch(path)
		.then(res => res.text())
		.then(lib => {
			monaco.languages.typescript.javascriptDefaults.addExtraLib(lib, path);
		});
});


let view = {
	iframe: document.getElementById("view"),
	errorContainer: document.getElementById("errorContainer"),

	iframeLoaded: false,
	userScriptPending: null,

	reset() {
		this.removeErrors();
		this.iframe.contentWindow.location.reload();
		this.iframeLoaded = false;
	},
	addCode(code) {
		let userScript = document.createElement("script");
		userScript.innerHTML = code;
		if(this.iframeLoaded) {
			this.iframe.contentWindow.document.body.append(userScript);
		} else {
			this.userScriptPending = userScript;
		}
	},

	errorsOnScreen: 0,
	showError(msg) {
		if(this.errorsOnScreen < 5) {
			let panel = document.createElement("DIV");
			panel.innerHTML = msg;
			this.errorContainer.append(panel);
			this.errorsOnScreen++;
		}
		console.error(msg);
	},
	removeErrors() {
		let child = this.errorContainer.firstChild;
		while(child) {
			this.errorContainer.removeChild(child);
			child = this.errorContainer.firstChild;
		}
		this.errorsOnScreen = 0;
	},
}
view.iframeLoaded = view.iframe.contentDocument.readyState === "complete";
view.iframe.onload = () => {
	view.iframeLoaded = true;
	view.iframe.contentWindow.onerror = view.showError.bind(view);
	if(view.userScriptPending) {
		view.iframe.contentWindow.document.body.append(view.userScriptPending);
		view.userScriptPending = null;
	}
}

function handleCodeLoaded(src, code) {
	if(src !== pendingSrc) {
		return;
	}
	pendingSrc = "";
	if(code === null) {
		view.showError(`Unable to load ${src}`);
		return;
	}
	view.addCode(code);
	editor.setValue(code);
	editor.updateOptions({readOnly: false});
}

nav.onclick = e => {
	if(e.target.parentElement == nav) {
		e.target.classList.toggle("open");
	} else if(e.target.tagName == "A") {
		let url = e.target.href;
		if(url == document.URL | !url) {
			return false;
		}
		let src = url2src(url);
		pendingSrc = src;

		fetchExample(src).then(code => {
			handleCodeLoaded(src, code);
			if(src === pendingSrc) {
				saveState(code);
			}
		});
		saveState(editor.getValue());
		history.pushState(null, makeTitle(e.target.innerText), url);
		view.reset();
		editor.setValue("");
		editor.updateOptions({readOnly: true});

		return false;
	}
}
window.onbeforeunload = e => {
	saveState(editor.getValue());
}

window.onpopstate = e => {
	view.reset();
	editor.setValue("");
	editor.updateOptions({readOnly: true});
	initialLoad();
	editor.focus();
}

function saveState(code) {
	history.replaceState({
		code,
		view: editor.saveViewState(),
	}, "", document.URL);
}

// BUG: does not save state when going back/forwards in history