function copy_clipboard(input_selector) {
    var elem = document.querySelector(input_selector);
    elem.select();
    document.execCommand("copy");
  }
  

function hide(element) {
    var req_ui = element.parentNode.parentNode;
    req_ui.style.display = "none";
}

function reset() {
    if (confirm('Are you want to delete all requests?'))
    fetch('/reset', { method: 'POST' }).then(() => {
        location.reload()
    });
}

(function () {
    // Refresh page exery x milliseconds
    var x = 5000;
    //setTimeout(() => { location.reload(); }, x);
})()