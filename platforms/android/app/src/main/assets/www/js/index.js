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
    document.getElementById('openCaseList').addEventListener('click', openCaseList);

    //Initializes disk storage object
    var localStorage = window.localStorage;
    var numberOfCases;
    var caseList;
    var caseIDText;
  },

  onDeviceReady: function()
  {
      //this.receivedEvent('deviceready');
      openCamera();
      caseList = openCases();
      var listParent = document.getElementById('caseList');
      renderCaseList(caseList, listParent);
      //popupDialog('Test', 'Success');
  },

  onPause: function()
  {
    localStorage.setItem('numberOfCases', numberOfCases.toString());
  }

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
  caseInfoText = document.getElementById('caseInfoInput').value;

  //popupDialog('Test', this.numberOfCases.toString());
  if (caseInfoText != '')
  {
    //localStorage.setItem(caseIDText, caseInfoText);
    caseList[caseIDText].info = caseInfoText;
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
    document.getElementById('caseFormName').innerHTML = caseList[caseID].name;
    document.getElementById('caseInfoInput').value = caseList[caseID].info;
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
  var listParent = document.getElementById('caseList');
  var cases = [{name:'No cases here!', equipment_count:''}]
  renderCaseList(cases, listParent);
  numberOfCases = 0;
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

function renderCaseList(cases, caseListParent)
{
  var newCaseList = document.createElement('tbody');
  var newCaseListing;
  var tableRow;
  var idCell;
  var equipCell;

  for (i = 0; i < cases.length; i++)
  {
    //cases.push(localStorage.getItem(i.toString()));
    tableRow = document.createElement("tr");
    tableRow.setAttribute('data-href', 'javascript:openCaseForm(' + cases[i].name + ');');

    idCell = document.createElement("td");
    equipCell = document.createElement("td");

    idCell.innerHTML = cases[i].name;
    equipCell.innerHTML = i;

    tableRow.appendChild(idCell);
    tableRow.appendChild(equipCell);
    newCaseList.appendChild(tableRow);
  }
  caseListParent.replaceChild(newCaseList, caseListParent.childNodes[0])
}

function openCases()
{
  /*
  tmpNumCases = localStorage.getItem('numberOfCases');
  if (tmpNumCases != null)
  {
    numberOfCases = parseInt(tmpNumCases);
  }
  else
  {
    numberOfCases = 0;
  }
  */

  var testCase1 = {name:'QSC 1', info:'1x QSC K10.2', equipment_count:1}
  var testCase2 = {name:'QSC 2', info:'1x QSC K10.2', equipment_count:1}
  var testCase3 = {name:'Cables', info:'14x GLS XLR Cable', equipment_count:14}
  var testCase4 = {name:'Megapars 1', info:'8x ADJ Megapar RGBUV', equipment_count:8}
  var testCase5 = {name:'Megapars 2', info:'8x ADJ Megapar RGBUV', equipment_count:8}

  var cases = [testCase1, testCase2, testCase3, testCase4, testCase5];
  return cases;

}

function openCaseList()
{
  document.getElementById('leftPanel').style.display = 'block';
}

app.initialize();
