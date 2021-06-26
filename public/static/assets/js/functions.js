function copy_clipboard(input_selector) {
    // copy endpoint to clipboard
    var elem = document.querySelector(input_selector);
    elem.select();
    document.execCommand("copy");
}
  
function reset() {
    // Trigger server to delete all captured requests
    if (confirm('Are you sure you want to delete all requests?'))
    fetch('/reset', { method: 'POST' }).then(() => {
        location.reload()
    });
}

(function () {
    // Refresh page exery x milliseconds
    var x = 5000;
    //setTimeout(() => { location.reload(); }, x);
})()