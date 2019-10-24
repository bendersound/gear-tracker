var app = {
  // Application Constructor
  initialize: function() {
    //initialize listeners
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    document.getElementById('submitCaseButton').addEventListener('click', openCaseFormManual);
    document.getElementById('submitFormButton').addEventListener('click', submitForm);
    document.getElementById('clearStorageButton').addEventListener('click', clearLocalStorage);
    document.getElementById('cameraButton').addEventListener('click', scanQR);

    //Initializes disk storage object
    var localStorage = window.localStorage;
    var numberOfCases = 0;
    var caseIDText;
  },

  onDeviceReady: function() {
      //this.receivedEvent('deviceready');
      openCamera();
      tmpNumCases = localStorage.getItem('numberOfCases');
      if (tmpNumCases)
      {
        numberOfCases = tmpNumCases
      }
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
  const caseID = document.getElementById('caseFormName').value;
  const caseInfoText = document.getElementById('caseInfoInput').value;
  //Temporarily use the caseID as a key for the case info

  if (caseInfoText != '')
  {
    localStorage.setItem(caseIDText, caseInfoText);
    popupDialog('', 'Successfully updated info');
  }
}

//open form for viewing
//param caseIDText used for passing in case ID
function openCaseForm(caseID)
{
  //if (caseID != '')
  //{
    document.getElementById('caseFormPopup').style.display = 'block';
    document.getElementById('caseFormName').innerHTML = caseID;
    const storedCaseInfo = localStorage.getItem(caseID);
    if (storedCaseInfo)
    {
      document.getElementById('caseInfoInput').value = storedCaseInfo;
    }
    caseIDText = caseID;
  //}
}

//get case id from field on homescreen and open for editting
function openCaseFormManual()
{
  const caseIDText = document.getElementById('caseIDForm').value;
  openCaseForm(caseIDText);
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
