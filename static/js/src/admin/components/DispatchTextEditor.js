var EditorImage = require('./embeds/EditorImage.jsx');

var DispatchTextEditor = function(quill, options) {

    var self = this;
    this.quill = quill;
    this.options = options;
    this.article = options.article;
    this.inlineEditorOpen = false;
    this.lastIndex;

    this.embeds = options.embeds;

    var inlineToolbar = this.quill.addContainer('inline-toolbar');
    var imageTools = this.quill.addContainer('image-tools');

    $(imageTools).html($('#image-tools').html());
    $(inlineToolbar).html($('#inline-toolbar').html());

    $.each(this.quill.getEmbeds(), function(key, item){
        $('.inline-toolbar .toolbar').append(
            $('<button class="tb-'+key+' dis-button">').text(key)
        );
        $('.tb-'+key).click(function(e){
            e.preventDefault();
            if (typeof item.trigger !== 'undefined'){
                item.trigger(function(data){
                    if (typeof data === 'undefined')
                        data = {}
                    this.addEmbed(key, data);
                }.bind(this));
            } else {
                this.addEmbed(key, {});
            }
        }.bind(this));
    }.bind(this));

    $('.inline-toolbar .tb-toolbar').click(function(e){
        e.preventDefault();
        this.inlineEditorOpen = true;
        $('.inline-toolbar .toolbar').show();
        self.quill.setSelection();
    });

    quill.on('text-change', function (delta, source) {
        self.inlineToolbar();
    });

    quill.on('selection-change', function(range) {
        self.inlineToolbar();
    });

}

DispatchTextEditor.prototype.addEmbed = function(type, data) {
    var lastLine = this.quill.getLength() - 1 == this.lastIndex;

    this.quill.insertEmbed(type, data, this.lastIndex);

    $("#editor").find()
    this.closeInlineToolbar();
    if(lastLine)
        this.quill.editor.doc.appendLine(document.createElement('P'));
}

DispatchTextEditor.prototype.inlineToolbar = function() {

    var range = this.quill.getSelection();

    if(range == null || range.start != range.end)
        return false

    var curLine = this.quill.editor.doc.findLineAt(range.start);

    if(curLine[0]['length'] == 1){
        var lineData = curLine[0];
        var id = lineData.id;
        var offset = $('#'+id).position().top;
        this.lastIndex = range.start;
        $('.inline-toolbar .toolbar').hide();
        $('.inline-toolbar').css('top', offset).show();
    } else {
        this.closeInlineToolbar();
    }
}

DispatchTextEditor.prototype.closeInlineToolbar = function() {
    $('.inline-toolbar .toolbar').hide();
    $('.inline-toolbar').hide();
}

// Register DispatchTextEditor with Quill
Quill.registerModule('dispatch', DispatchTextEditor);

module.exports = DispatchTextEditor;