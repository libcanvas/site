atom.dom(function() {
    atom.dom('#hello_canvas_button').bind({click: Doc.helloCanvas});

    Doc.init();

    hljs.tabReplace = '  ';
    hljs.initHighlightingOnLoad();
});