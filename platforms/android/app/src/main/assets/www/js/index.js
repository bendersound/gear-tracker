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
    alert('Stored info for ' + caseIDText);
  }
  else
  {
    alert(localStorage.getItem(caseIDText));
  }
}

function clearLocalStorage()
{
  localStorage.clear();
  alert('Local storage cleared');
}

app.initialize();
