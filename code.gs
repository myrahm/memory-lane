const sheets = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1t9Zegf4yB5TPiiblpiqIjTYUPZEPqfXWLRh8D4YsNuo/edit#gid=0");

const sheet = sheets.getSheetByName("Sheet1");
function doPost(e){
  let data = e.parameter;
  sheet.appendRow([data.firstname,data.lastname, data.email, data.date, data.message, data.image]);
  return ContentService.createTextOutput("Success")
}

/**
 * @OnlyCurrentDoc
 */

var current_date = new Date();

function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {

    var row = data[i];
    var firstname = row[0];
    var lastname = row[1];
    var email = row[2];
    var date = row[3];
    var msg = row[4]

    if (current_date != date) return;
    //var imageUrl = row[4];
    //var imageBlob = UrlFetchApp.fetch(imageUrl).getBlob().setName("image");

    var subject = '\Hey ' + firstname + ' ' + lastname + ', let\'s dig into your capsule!';

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: msg,
      //attachments: [imageBlob]
    });
  }
}