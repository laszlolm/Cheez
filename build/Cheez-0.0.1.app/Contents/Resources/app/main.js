// Cheez 🧀
// Created by Laszlo Levente Mári

/*
  The following file replaces your boring Cmd-Shift-4 key combo.
  You only need to click a menubar icon from now on.

  Later I'm planning to implement multiple cheeses,
  with options to screenshot full screen, area and maybe some other options.

  Also I'm planning to measure the screen area you already captured
  (Gonna be a future update)

*/

var menubar = require('menubar')
var exec = require('child_process').execFile;
var spawn = require('child_process').spawn

var mb = menubar({
  width: 1,
  height: 1
})
// Where should we save screenshots? (TODO: The user should be able to set this in preferences)
var savePath = '/Users/' + process.env.USER + '/Desktop/'


// Menubar events
mb.on('ready', function ready () {
  console.log('Ready for the screenshots! 📸')
})

mb.on('show', function show() {
  // Get the current date 📅
  var date = new Date;

  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hour = date.getHours();

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  // This is our filename, it looks almost the same as the default MacOS one
  // It'll look like "cheez 2017-2-1 at 14:7:41"
  var fileName = 'cheez ' + year + '-' + month + '-' + day + ' at ' + hour + ':' + minutes + ':' + seconds + '.jpg'

  // We need to run the screencapture command
  // In a terminal environment you would run
  // $ screencapture -w filename.jpg
  // This is what we are reproducing from the menubar
  var p = spawn('screencapture',['-w', savePath + fileName]);

  // Only used for debugging purposes
  p.stdout.on('data',function (data) {
      // console.log(data.toString())
  });
})

// We Since we use a workaround to make the window disappear we need to
// actually close it after the screenshot was taken so the user doesn't get
// confused.
mb.on('after-create-window', function close() {
  mb.hideWindow()
})
