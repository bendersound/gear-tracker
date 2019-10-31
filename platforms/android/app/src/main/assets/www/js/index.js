var app = {
  // Application Constructor
  initialize: function() {
    //initialize listeners
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    document.addEventListener(' pause', this.onPause.bind(this), false);
    document.getElementById('submitCaseButton').addEventListener('click', openCaseFormManual);
    document.getElementById('submitFormButton').addEventListener('click', submitForm);
    document.getElementById('clearStorageButton').addEventListener('click', clearLocalStorage);
    document.getElementById('cameraButton').addEventListener('click', scanQR);

    //Initializes disk storage object
    var localStorage = window.localStorage;
    var numberOfCases;
    var caseList;
    var caseIDText;
  },

  onDeviceReady: function()
  {
      storeTestCases();

      openCamera();
      caseList = openCases();
      var listParent = document.getElementById('caseList');
      renderCaseList(listParent);
      popupDialog('Test', 'Success');
  },

  onPause: function()
  {
    storeCases();
  }
};

/*
// TODO: Testing
*/
function storeTestCases()
{
  var testCase1 = {id:'Test 1', equipment_count:1};
  var testCase2 = {id:'Test 2', equipment_count:2};
  var testCase3 = {id:'Test 3', equipment_count:3};

  caseList = [testCase1, testCase2, testCase3];
  numberOfCases = 3;

  clearLocalStorage();
  storeCases();
  clearGlobalParamters();
}

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

  popupDialog('Test', this.numberOfCases.toString());
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

//
clearGlobalParamters()
{
  numberOfCases = 0;
  cases = [];
  caseIDText = '';
}

//clear data on disk
function clearLocalStorage()
{
  localStorage.clear();
  clearGlobalParamters();
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

function renderCaseList(caseListParent)
{
  var newCaseListing;
  var tableRow;
  var idCell;
  var equipCell;

  for (i = 0; i < caseList.length; i++)
  {
    //cases.push(localStorage.getItem(i.toString()));
    tableRow = document.createElement("tr");

    idCell = document.createElement("td");
    equipCell = document.createElement("td");

    idCell.innerHTML = caseList[i].id;
    equipCell.innerHTML = caseList[i].equipment_count;

    tableRow.appendChild(idCell);
    tableRow.appendChild(equipCell);
    caseListParent.appendChild(tableRow);
  }
  //// TODO: for testing only
  document.getElementById('leftPanel').style.display = 'block';
}

function openCases()
{
  numberOfCases = localStorage.getItem('numberOfCases');
  if (!numberOfCases)
  {
    numberOfCases = 0;
  }

  var cases = [];
  var caseListingStr = '';
  var caseListingJSON = {};

  for (i = 0; i < numberOfCases; i++)
  {
    caseListingStr = localStorage.getItem('case' + i.toString());
    caseListingJSON = JSON.parse(caseListingStr);
    cases.push(caseListing);
  }

  return cases;
}

function storeCases()
{
  localStorage.setItem('number_of_cases', numCases.toString());

  for (i = 0; i < caseList.length; i++)
  {
    localStorage.setItem('case' + i.toString(), caseList[i].toString());
  }
}

app.initialize();
