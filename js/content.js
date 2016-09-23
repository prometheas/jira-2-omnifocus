$(function() {

	// creates an OF task using the supplied ticket info
	function createTaskForTicket(ticket) {
		var note = [window.location.href, ticket.details, ticket.description];

		var message = {
			method: "createTask",
			params: {
				name: "[" + ticket.key + '] ' + ticket.summary,
				note: note.join('\n')
			}
		};

		chrome.extension.sendMessage(message, function(data) {
			//TODO: might want to do something fancy in this callback
			//console.info("Response %s", data);
		});
	}

	var $sendButton = $("<a id=\"send-to-omnifocus\">Send to OmniFocus &raquo;</a>");
	$sendButton.prependTo("#viewissuesidebar");

	$sendButton.on('click', function(evt) {

		evt.preventDefault();

		var details = $('#issuedetails div.wrap').map(function(index, detail) {
			return $(detail).find('strong').text().trim() + ' ' +
				$(detail).find('span').text().trim();
		});

		createTaskForTicket({
			key: $("#key-val").text(),
			summary: $("#summary-val").text().replace(/\s+/, ' ').replace(/^\s*(\S.+\S)\s*$/, '$1'),
			description: $("#description-val").text(),
			details: details
		});

	});

});