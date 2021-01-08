function copy_clipboard(input_selector) {
    var elem = document.querySelector(input_selector);
    elem.select();
    document.execCommand("copy");
  }
  

function hide(element) {
    var req_ui = element.parentNode.parentNode;
    req_ui.style.display = "none";
}

