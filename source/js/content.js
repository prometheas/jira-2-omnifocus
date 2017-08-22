/* eslint-env browser, jquery, webextensions */

var $sendButton = $("<a id=\"send-to-omnifocus\">Send to OmniFocus &raquo;</a>");

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

  $sendButton.prependTo("#viewissuesidebar");

  $sendButton.on('click', function (evt) {
    evt.preventDefault();

    createTaskForTicket({
      key: $("#key-val").text(),
      summary: $("#summary-val").text().replace(/\s+/, ' ').replace(/^\s*(\S.+\S)\s*$/, '$1'),
      description: $("#description-val").text().replace(/[ ]{2,}/g, '').trim()
    });
  });
});
