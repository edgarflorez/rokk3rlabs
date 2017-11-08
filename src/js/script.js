var MainScriptClass = function () {
  //vars

  this.init = function () {
    console.log("Script main init")
  }

}
window['mainScript'] = new MainScriptClass();
window['mainScript'].init();
