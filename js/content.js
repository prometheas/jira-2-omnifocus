$(function() {

	var $sendButton = $("<a id=\"send-to-omnifocus\">Send to OmniFocus &raquo;</a>");
	$sendButton.prependTo( "#viewissuesidebar" );

	$sendButton.on('click', function( evt ) {

		evt.preventDefault();

		var ticket = {
			key: $("#key-val").text(),
			summary: $("#summary-val").text().replace( /\s+/, ' ' ).replace( /^\s*(\S.+\S)\s*$/, '$1' ),
			description: $("#description-val").text()
		};

		var omnifocusTask = {
			name: "["+ticket.key+'] '+ticket.summary,
			note: window.location.href +"\n\n"+ ticket.description
		};

		var omnifocusUrl = 'omnifocus:///add?name='+encodeURIComponent(omnifocusTask.name)+'&note='+encodeURIComponent(omnifocusTask.note);

		// window.location = url does not work repetitively because of http://code.google.com/p/chromium/issues/detail?id=104853
		document.body.insertAdjacentHTML('afterEnd', '<iframe src="'+omnifocusUrl+'" style="display:none">');
	})

});
