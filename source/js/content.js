/* eslint-env browser, jquery, webextensions */

var $sendButton = $("<ul class=\"toolbar-group pluggable-ops\"><li class=\"toolbar-item\"><a class=\"toolbar-trigger viewissue-share\" href=\"#\" original-title=\"Send this issue to Omnifocus\"><span class=\"trigger-label\">Send to Omnifocus</span></a></li></ul>");

$(function () {
  // creates an OF task using the supplied ticket info
  function createTaskForTicket(ticket) {
    var message = {
      method: "createTask",
      params: {
        name: "[" + ticket.key + '] ' + ticket.summary,
        note: window.location.href + "\n\n" + ticket.description
      }
    };

    chrome.runtime.sendMessage(message, function (data) {
      $('<iframe style="display:none">')
        .attr('src', data.url)
        .appendTo('body');
    });
  }

  $sendButton.prependTo($(".command-bar .ops-menus .toolbar-split-right"));

  $sendButton.on('click', function (evt) {
    evt.preventDefault();

    createTaskForTicket({
      key: $("#key-val").text(),
      summary: $("#summary-val").text().replace(/\s+/, ' ').replace(/^\s*(\S.+\S)\s*$/, '$1'),
      description: $("#description-val").text().replace(/[ ]{2,}/g, '').trim()
    });
  });
});
