function copy_clipboard(input_selector) {
    // copy endpoint to clipboard
    var elem = document.querySelector(input_selector);
    elem.select();
    document.execCommand("copy");
}