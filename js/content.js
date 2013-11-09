$(function() {

	var $sendButton = $("<a id=\"send-to-omnifocus\">Send to OmniFocus &raquo;</a>");
	$sendButton.prependTo( "#viewissuesidebar" );

	function encodeTaskProperties(omnifocusTask) {
		return {
			name: encodeURIComponent(omnifocusTask.name),
			note: encodeURIComponent(omnifocusTask.note)
		}
	}

	function triggerActionUrl( url ) {
		document.body.insertAdjacentHTML('afterEnd', '<iframe src="'+url+'" style="display:none">');
	}

	var senders = {
		app: function(config, encodedTask) {
			triggerActionUrl('omnifocus:///add?name='+encodedTask.name+'&note='+encodedTask.note);
		},
		maildrop: function(config, encodedTask) {
			triggerActionUrl("mailto:"+config.address+"@sync.omnigroup.com?subject="+encodedTask.name+"&body="+encodedTask.note);
		}
	}

	$sendButton.on('click', function( evt ) {

		evt.preventDefault();

		var ticket = {
			key        : $("#key-val").text(),
			summary    : $("#summary-val").text().replace( /\s+/, ' ' ).replace( /^\s*(\S.+\S)\s*$/, '$1' ),
			description: $("#description-val").text()
		};

		var omnifocusTask = {
			name: "["+ticket.key+'] '+ticket.summary,
			note: window.location.href +"\n\n"+ ticket.description
		};

		chrome.extension.sendMessage({method: "loadConfig"}, function(config) {
			senders[ config.sender ]( config, encodeTaskProperties(omnifocusTask) );
		});

	});

});
