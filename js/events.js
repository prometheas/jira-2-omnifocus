
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

	if (request.method == "loadConfig") {
		sendResponse({
			address: localStorage.address,
			sender : localStorage.sender || "app"
		});
	}
	else
	{
		sendResponse({});
	}
});
