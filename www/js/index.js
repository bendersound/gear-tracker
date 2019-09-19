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
    document.getElementById("clearImagebutton").addEventListener("click", hideImage);

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
  var caseInfoText = document.getElementById("caseInfoInput").value;

  //Temporarily use the caseID as a key for the case info

  if (caseInfoText != "")
  {
    localStorage.setItem(caseIDText, caseInfoText);
    popupDialog('', "Successfully updated info");
  }
}

function openForm()
{
  caseIDText = document.getElementById("caseIDForm").value;

  if (caseIDText != "")
  {
    document.getElementById("caseFormName").innerHTML = caseIDText;
    var storedCaseInfo = localStorage.getItem(caseIDText);

    if (storedCaseInfo != null)
    {
      document.getElementById("caseInfoInput").value = storedCaseInfo;
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

//todo: does not keep img border
function hideImage()
{
  qr_image = document.getElementById("qr_image_frame");
  qr_image.style.visibility = 'hidden';
}

app.initialize();
