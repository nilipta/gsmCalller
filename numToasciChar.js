fs = require('fs')
fs.readFile('serialData.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var res = data.replace(/\r\n/g, ",");
  console.log(res);
	var printing = String.fromCharCode(res.toString());
	console.log(printing);
});
