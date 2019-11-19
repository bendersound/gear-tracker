var app = {
  // Application Constructor
  initialize: function() {
    //Device listeners
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    document.addEventListener('pause', this.onPause.bind(this), false);
    document.addEventListener('backbutton', this.onBackKeyDown, false);

    //Home screen listeners
    document.getElementById('cameraButton').addEventListener('click', scanQR);
    document.getElementById('openCaseList').addEventListener('click', openCaseList);

    //Case list screen listeners
    document.getElementById('submitCaseButton').addEventListener('click', openCaseFormManual);
    document.getElementById('clearStorageButton').addEventListener('click', clearLocalStorage);

    //Case form screen listeners
    document.getElementById('submitFormButton').addEventListener('click', submitForm);

    //Initializes disk storage object
    var localStorage = window.localStorage;
    var caseList = [];
    var numberOfCases;
    var caseIDText;
    var curScreen = 0;
  },

  onDeviceReady: function()
  {
      //this.receivedEvent('deviceready');
      openCamera();
      caseList = openTestCases2();
      var listParent = document.getElementById('caseList');
      var header = 0;
      renderCaseList(caseList, header, listParent, 0);
      //popupDialog('Test', 'Success');
  },

  onPause: function()
  {
    localStorage.setItem('numberOfCases', numberOfCases.toString());
  },

  onBackKeyDown: function(e)
  {
    if (curScreen == 0)
    {
      navigator.app.exitApp();
    }
    else if (curScreen == 1)
    {
      closeCaseList();
    }
    else if (curScreen == 2)
    {
      closeCaseForm();
    }
  }
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
        openCaseForm(content);
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

//Store data on disk
function submitForm()
{
  //Store form text
  caseInfoText = document.getElementById('caseInfoInput').value;

  //popupDialog('Test', this.numberOfCases.toString());
  if (caseInfoText != '')
  {
    //localStorage.setItem(caseIDText, caseInfoText);
    caseList[caseIDText].info = 'poo'; //caseInfoText;
    popupDialog('', 'Successfully updated info');
  }
}

//open form for viewing
//param caseIDText used for passing in case ID
function openCaseForm(caseID)
{
  //if (caseID != '')
  //{
    document.getElementById('caseFormName').value = caseList[caseID].name;
    document.getElementById('caseInfoInput').value = caseList[caseID].info;
    caseIDText = caseID;
  //}
  document.getElementById('caseFormPopup').style.display = 'block';
  curScreen = 2;
}

//get case id from field on homescreen and open for editting
function openCaseFormManual()
{
  const caseIDText = document.getElementById('caseIDForm').value;
  openCaseForm(caseIDText);
}

function closeCaseForm()
{
  document.getElementById('caseFormPopup').style.display = 'none';
  curScreen = 1;
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

function renderList(items, header, parent, childIndex)
{
  var tBody = document.createElement("tbody");
  var tRow;
  var newCell;
  var i = 0;
  for (i = 0; i < items.length; i++)
  {
    tRow = document.createElement("tr");
    //tableRow.setAttribute('data-href', 'javascript:openCaseForm(' + items[i].name + ');');

    //for each (cellValue in items[i])
    //{
      newCell = document.createElement("td");
      //newCell.innerHTML = cellValue;
      newCell.innerHTML = i;
      tRow.appendChild(newCell);
    //}
    tBody.appendChild(tRow);
  }
  parent.replaceChild(tBody, parent.childNodes[childIndex])
}

function openTestCases1()
{
  var testCase1 = {name:'QSC 1', info:'1x QSC K10.2', equipment_count:1}
  var testCase2 = {name:'QSC 2', info:'1x QSC K10.2', equipment_count:1}
  var testCase3 = {name:'Cables', info:'14x GLS XLR Cable', equipment_count:14}
  var testCase4 = {name:'Megapars 1', info:'8x ADJ Megapar RGBUV', equipment_count:8}
  var testCase5 = {name:'Megapars 2', info:'8x ADJ Megapar RGBUV', equipment_count:8}

  var cases = [testCase1, testCase2, testCase3, testCase4, testCase5];
}

function openTestCases2()
{
  var testCase1 = {blah:'a', boo:1}
  var testCase1 = {blah:'b', boo:2}
  var testCase1 = {blah:'c', boo:3}
  var testCase1 = {blah:'d', boo:4}
  return [testCase1, testCase2, testCase3, testCase4, testCase5];
}

/*
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
  *

  return

}
*/

function openCaseList()
{
  document.getElementById('leftPanel').style.display = 'block';
  curScreen = 1;
}

function closeCaseList()
{
  document.getElementById('leftPanel').style.display = 'none';
  curScreen = 0;
}

app.initialize();
