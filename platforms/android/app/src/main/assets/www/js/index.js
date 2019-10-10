var app = {
  // Application Constructor
  initialize: function() {
    //initialize listeners
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    document.getElementById('submitCaseButton').addEventListener('click', openFormManual);
    document.getElementById('submitFormButton').addEventListener('click', submitForm);
    document.getElementById('clearStorageButton').addEventListener('click', clearLocalStorage);
    document.getElementById('cameraButton').addEventListener('click', scanQR);

    //Initializes disk storage object
    var localStorage = window.localStorage;

    //Declares object to store qr code in
    var qr_image;

    //Stores current case id being operated on
    var caseIDText;
  },

  onDeviceReady: function() {
      //this.receivedEvent('deviceready');
      openCamera();
  },

  // Update DOM on a Received Event
  /*
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
  */
};

// Popup dialog for testing
function popupDialog(title, message)
{
  var buttonName = 'Ok';
  navigator.notification.alert(message, alertCallback, title, buttonName);

  function alertCallback()
  {
   console.log('Alert Dismissed');
  }
}

//Store data on disk
function submitForm()
{
  //Store form text
  var caseEntry = {
    make: document.getElementById("popupMake").value,
    model: document.getElementById("popupModel").value,
    amount: document.getElementById("popupAmount").value,
    date: document.getElementById("popupDate").value,
    other: document.getElementById("caseInfoInput").value,

    toString : function()
    {
      return this.amount.toString() + "x " + this.make + " " + this.model;
    }
  };

  var newCase = {id: caseIDText, entries: [caseEntry]};
  var jsonData = JSON.stringify(newCase);
  //Temporarily use the caseID as a key for the case info
  //popupDialog('', caseEntry.toString());
  if (jsonData != "")
  {
    localStorage.setItem(caseIDText, jsonData);
    popupDialog('', "Successfully updated info");
  }
}


function openForm()
{
  if (caseIDText != '')
  {
    document.getElementById("caseFormName").innerHTML = caseIDText;
    var jsonData = localStorage.getItem(caseIDText);

    if (jsonData != "")
    {
      //var case = $.parseJSON('{ "name":"John", "age":30, "city":"New York"}');
      //popupDialog("", case.name);
      //var case = JSON.parse(jsonData);
      //var entry = case.entries[0];
      //document.getElementById("popupMake").value = entry.make;
      document.getElementById("caseInfoInput").value = jsonData;
    }
  }
}

function openFormManual()
{
  caseIDText = document.getElementById('caseIDForm').value;
  openForm(caseIDText);
}

//clear data on disk
function clearLocalStorage()
{
  localStorage.clear();
  popupDialog('', 'Local storage cleared');
}

//pause the preview so users know a code is being scanned
function scanQR()
{
  var scanCallback = function(error, content)
  {
    if(error)
    {
      popupDialog('Error', 'Scan unsuccesful')
    }
    else
    {
      {
        openForm(content);
      }
    }
  }

  QRScanner.pausePreview(function(status)
  {
    console.log(status);
  })
  QRScanner.resumePreview(function(status)
  {
    console.log(status);
  })
  QRScanner.scan(scanCallback);
}

//Initialize and show qr code scanner
function openCamera()
{
  var prepareCallback = function(err, status)
  {
    if(error)
    {
      console.error(error._message);
    }
    else
    {
      console.log(status);
    }
  };

  QRScanner.prepare(prepareCallback);
  QRScanner.show(function(status)
  {
    console.log(status);
  });
}

app.initialize();
