/* eslint-env webextensions */

function encodeTaskProperties(omnifocusTask) {
  return {
    name: encodeURIComponent(omnifocusTask.name),
    note: encodeURIComponent(omnifocusTask.note),
  };
}

const senders = {
  app(config, encodedTask) {
    return `omnifocus:///add?name=${encodedTask.name}&note=${encodedTask.note}`;
  },
  maildrop(config, encodedTask) {
    return `mailto:${config.address}@sync.omnigroup.com?subject=${encodedTask.name}&body=${encodedTask.note}`;
  },
};

const actions = {
  createTask(taskInfo) {
    const sender = localStorage.sender || 'app';
    const encodedTask = encodeTaskProperties(taskInfo);

    return {
      url: senders[sender](localStorage, encodedTask),
    };
  },
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let responseData = false;

  if (actions[request.method]) {
    responseData = actions[request.method](request.params);
  }

  sendResponse(responseData);
});
