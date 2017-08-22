/* eslint-env browser, jquery */

// Displays message to user
function showStatus(message) {
  const $status = document.getElementById('status');
  $status.innerHTML = message;
  setTimeout(() => {
    $status.innerHTML = '';
  }, 1750);
}

// Saves options to localStorage.
function saveOptions() {
  const $useMaildrop = $('#use-maildrop');
  const $address = $('#maildrop-address');

  $address.val($address.val().replace(/^\s*/, '').replace(/\s*$/, ''));
  const address = $address.val();
  const isAddressValid = address.match(/^[a-z.-_]+$/i);

  if (isAddressValid) {
    $address.removeClass('invalid');
    localStorage.address = address;
  } else {
    $useMaildrop.prop('checked', false);
    $address.addClass('invalid');
    localStorage.sender = 'app';
  }

  const isMailDropEnabled = $useMaildrop.prop('checked');
  localStorage.sender = (isMailDropEnabled && isAddressValid) ? 'maildrop' : 'app';

  // Update status to let user know options were saved.
  showStatus('Options saved.');
}

// Restores select box state to saved value from localStorage.
function restoreOptions() {
  document.getElementById('use-maildrop').checked = (localStorage.sender === 'maildrop');
  document.getElementById('maildrop-address').value = localStorage.address || '';
}

function resetOptions() {
  document.getElementById('maildrop-address').value = '';
  document.getElementById('use-maildrop').checked = false;
  saveOptions();
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);
document.querySelector('#reset').addEventListener('click', resetOptions);
