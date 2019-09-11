var app = {
  // Application Constructor
  initialize: function() {
    //initialize listeners
    document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
    document.getElementById("submitButton").addEventListener("click", submitForm);
    document.getElementById("clearButton").addEventListener("click", clearLocalStorage);

    //Initializes disk storage object
    var localStorage = window.localStorage;
  },

  onDeviceReady: function() {
      this.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};

function submitForm()
{
  //Store form text
  var caseIDText = document.getElementById("caseIDForm").value;
  var caseInfoText = document.getElementById("caseInfoForm").value;

  //Temporarily use the caseID as a key for the case info

  if (caseInfoText != "")
  {
    localStorage.setItem(caseIDText, caseInfoText);
    popupDialog(caseIDText, 'Successfully updated info');
  }
  else
  {
    var storedCaseInfo = localStorage.getItem(caseIDText);
    if (storedCaseInfo != null)
    {
      popupDialog(caseIDText, storedCaseInfo);
    }
    else
    {
      popupDialog('Case ID Not Found', 'This case does not exist!');
    }
  }
}

function popupDialog(title, message)
{
  alert(message);
}

function clearLocalStorage()
{
  localStorage.clear();
  popupDialog('', 'Local storage cleared');
}

app.initialize();
