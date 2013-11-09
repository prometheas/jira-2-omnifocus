// Saves options to localStorage.
function save_options() {

  var $useMaildrop = $("#use-maildrop");
  var $address     = $("#maildrop-address");

  $address.val($address.val().replace(/^\s*/, '').replace(/\s*$/, ''));
  var address           = $address.val();
  var isAddressValid    = address.match(/^[a-z\.-_]+$/i);

  if (isAddressValid) {
    $address.removeClass("invalid");
    localStorage.address = address;
  } else {
    $useMaildrop.prop("checked", false);
    $address.addClass("invalid");
    localStorage.sender = "app";
  }

  console.log("%s is %s", address, isAddressValid ? "valid" : "invalid");

  var isMailDropEnabled = $useMaildrop.prop("checked");
  localStorage.sender   = (isMailDropEnabled && isAddressValid) ? "maildrop" : "app";

  // Update status to let user know options were saved.
  show_status("Options saved.");
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  document.getElementById("use-maildrop").checked   = (localStorage.sender === "maildrop");
  document.getElementById("maildrop-address").value = localStorage.address || "";
}

function reset_options() {
  document.getElementById("maildrop-address").value = "";
  document.getElementById("use-maildrop").checked = false;
  save_options();
}

function show_status(message) {
  var $status = document.getElementById("status");
  $status.innerHTML = message;
  setTimeout(function() {
    $status.innerHTML = "";
  }, 1750);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#reset').addEventListener('click', reset_options);

