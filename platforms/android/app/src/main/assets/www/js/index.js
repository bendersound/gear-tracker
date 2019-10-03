var app = {
  // Application Constructor
  initialize: function() {
    //initialize listeners
    document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
    document.getElementById("submitCaseButton").addEventListener("click", openForm);
    document.getElementById("submitFormButton").addEventListener("click", submitForm);
    document.getElementById("clearStorageButton").addEventListener("click", clearLocalStorage);
    document.getElementById("cameraButton").addEventListener("click", openCamera);
    document.getElementById("galleryButton").addEventListener("click", openGallery);

    //Initializes disk storage object
    var localStorage = window.localStorage;

    //Declares object to store qr code in
    var qr_image;

    //Stores current case id being operated on
    var caseIDText;
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

function popupDialog(title, message)
{
  var buttonName = "Ok";
  navigator.notification.alert(message, alertCallback, title, buttonName);

  function alertCallback()
  {
   console.log("Alert Dismissed");
  }
}

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
  caseIDText = document.getElementById("caseIDForm").value;

  if (caseIDText != "")
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

    document.getElementById("caseFormPopup").style.display = "block";
  }
}

function clearLocalStorage()
{
  localStorage.clear();
  popupDialog('', "Local storage cleared");
}

function openCamera()
{
  navigator.camera.getPicture(onSuccess, onFail,
  {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    cameraDirection: Camera.BACK
  });

  function onSuccess(imageData)
  {
    qr_image = document.getElementById("qr_image_frame");
    qr_image.src = "data:image/jpeg;base64," + imageData;
  }

  function onFail(message)
  {
    popupDialog('Error!', message);
  }
}

function openGallery()
{
  navigator.camera.getPicture(onSuccess, onFail,
  {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
  });

  function onSuccess(imageData)
  {
    qr_image = document.getElementById("qr_image_frame");
    qr_image.src = "data:image/jpeg;base64," + imageData;
  }

  function onFail(message)
  {
    popupDialog('Error!', message);
  }
}

app.initialize();
