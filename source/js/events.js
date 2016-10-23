/* eslint-env webextensions */

function encodeTaskProperties(omnifocusTask) {
  return {
    name: encodeURIComponent(omnifocusTask.name),
    note: encodeURIComponent(omnifocusTask.note)
  };
}

var senders = {
  app: function (config, encodedTask) {
    return 'omnifocus:///add?name=' + encodedTask.name + '&note=' + encodedTask.note;
  },
  maildrop: function (config, encodedTask) {
    return "mailto:" + config.address + "@sync.omnigroup.com?subject=" + encodedTask.name + "&body=" + encodedTask.note;
  }
};

var actions = {
  createTask: function (taskInfo) {
    var sender = localStorage.sender || "app";
    var encodedTask = encodeTaskProperties(taskInfo);

    return {
      url: senders[sender](localStorage, encodedTask)
    };
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var responseData = false;

  if (actions[request.method]) {
    responseData = actions[request.method](request.params);
  }

  sendResponse(responseData);
});
