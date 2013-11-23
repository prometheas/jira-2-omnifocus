
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

var actions = {
	createTask: function(taskInfo) {
		var sender = localStorage.sender || "app";
		senders[ sender ](localStorage, encodeTaskProperties(taskInfo));
		return true;
	}
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

	var responseData = false;

	if (actions[ request.method ]) {
		responseData = actions[ request.method ](request.params);
	}

	sendResponse( responseData );
});
