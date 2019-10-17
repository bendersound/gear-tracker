var app = {
  // Application Constructor
  initialize: function() {
    //initialize listeners
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    document.addEventListener('pause', this.onPause.bind(this), false);
    document.addEventListener('resume', this.onResume.bind(this), false);
    document.getElementById('submitCaseButton').addEventListener('click', openCaseFormManual);
    document.getElementById('submitFormButton').addEventListener('click', submitForm);
    document.getElementById('clearStorageButton').addEventListener('click', clearLocalStorage);
    document.getElementById('cameraButton').addEventListener('click', scanQR);

    //Initializes disk storage object
    var localStorage;
    var caseIDText;

    var caseEntries;
  },

    // Handle device ready
  onDeviceReady: function() {
      //this.receivedEvent('deviceready');
      openCamera();
      localStorage = window.localStorage;
      caseEntries = localStorage.getItem('caseEntries').valueOf();
      if(!caseEntries)
      {
        caseEntries = 0;
      }
  },

  // Handle pause
  onPause: function()
  {
    //keep track of number of cases we are working with
    localStorage.setItem('caseEntries', caseEntries.toString());
  },

  // Handle resume
  onResume: function()
  {
  }

  // Update DOM on a Received Event
  /*
  , receivedEvent: function(id) {
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
    popupDialog('Number of Case Entries', caseEntries);
  }
}

function openGearEntry()
{
  var gearEntry = {
    make: '',
    model: '',
    amount: '',
    datePurchased: '',
    otherInfo: ''
  };
}

//open form for viewing
//param caseIDText used for passing in case ID
function openCaseForm(caseID)
{
  var caseEntry = {
    name: '',
    gearEntries: [],
    storageLocation: '',
    dateLastUsed: '',
    otherInfo: ''
  };
  //if (caseID)
  //{
    const storedCaseInfo = localStorage.getItem(caseID);
    if (storedCaseInfo)
    {
      document.getElementById('caseInfoInput').value = storedCaseInfo;
    }
    document.getElementById('caseFormName').innerHTML = caseID;
    document.getElementById('caseFormPopup').style.display = 'block';
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
