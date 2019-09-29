// Based on an example:
//https://github.com/don/cordova-plugin-ble-central


// ASCII only
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

// ASCII only
function stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}



//the bluefruit UART Service
var blue ={
	serviceUUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    txCharacteristic: '6e400002-b5a3-f393-e0a9-e50e24dcca9e', // transmit is from the phone's perspective
    rxCharacteristic: '6e400003-b5a3-f393-e0a9-e50e24dcca9e'  // receive is from the phone's perspective
}

var ConnDeviceId;
var bleDeviceName;
var deviceList =[];
var list = document.getElementById("bleDeviceList");

setTimeout("window.location.reload();",5000); //reload siden hvert 20. sekund. Dermed genindlæses Bluetooth-liste
 
function onLoad(){
	document.addEventListener('deviceready', onDeviceReady, false);
    bleDeviceList.addEventListener('touchstart', conn, false); // assume not scrolling
	
	//String html = "<iframe width=\"450\" height=\"260\" style=\"border: 1px solid #cccccc;\" src=\"http://172.20.10.4/DBdisplay.php\" ></iframe>";
	//document.getElementById("tilbud").innerHTML = webview.loadData(html, "text/html", null);
	window.open = codova.InAppBrowser.open;
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
	var ref = cordova.InAppBrowser.open('http://localhost/DBdisplay.php' , '_blank', 'location=yes');
	ref.show();
}

function onDeviceReady(){
	refreshDeviceList();
	console.log("window.open works well");
}

	 
function refreshDeviceList(){
	//deviceList =[];
	document.getElementById("bleDeviceList").innerHTML = ''; // empties the list
	if (cordova.platformId === 'android') { // Android filtering is broken
		ble.scan([], 5, onDiscoverDevice, onError);
		//alert("onDiscoverDevice");
		//onDiscoverDevice;
	} else {
		//alert("Disconnected");
		ble.scan([blue.serviceUUID], 5, onDiscoverDevice, onError);
	}
}


function onDiscoverDevice(device){
	//Cheat device.name
	//device.name= "GruppeIoT";
	if(device.name == "radiotv" || device.name == "Elektronik"){
		test();
		
		var listItem = document.createElement('li');
        html = device.name;
		listItem.innerHTML = html;
        listItem.classList.add('active');
		document.getElementById("bleDeviceList").appendChild(listItem);
        
        /*var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
			x = document.getElementById("debugDiv");
			x.innerHTML += "onreadystatechange"; 
			x.innerHTML += String(this.readyState) + String(this.status)+ "<br>";
            if(this.readyState == 4 && this.status == 0) {
				x.innerHTML += String(this.response);
				
				if(this.response == "")
					this.response += "<P>vores data er ikke kommet</P>";
			
                document.getElementById("tilbud").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "172.20.10.3/DBDisplay.php", true); //method GET has a limitation - I have read 8K data
        xhttp.send(); */
	}
    
    
    //Make a list in html and show devises
    /*if(device.name == "GruppeIoT" || device.name == "Elektronik"){   
        document.getElementById("bleDeviceList").innerHTML = device.name;
	}
    if(document.getElementById("bleDeviceList").innerHTML == "GruppeIoT" && device.name == "Elektronik") {
        
    }
    if(document.getElementById("bleDeviceList").innerHTML == "Elektronik" && device.name == "GruppeIoT") {
        
    }*/
}


function conn(){
	var  deviceTouch= event.srcElement.innerHTML;
	document.getElementById("debugDiv").innerHTML =""; // empty debugDiv
	var deviceTouchArr = deviceTouch.split(",");
	bleDeviceName = deviceTouchArr[0];
	document.getElementById("debugDiv").innerHTML += "Du vil kun se: <br>"+deviceTouchArr[0]+" tilbud"; //for debug:
    if(event.srcElement.classList.contains('inactive')){
        event.srcElement.classList.remove('inactive');
        event.srcElement.classList.add('active');
    } else {
        event.srcElement.classList.remove('active');
        event.srcElement.classList.add('inactive');
    }
 }
 
function onError(reason)  {
	alert("ERROR: " + reason); // real apps should use notification.alert
}

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "242px";
  document.getElementById("enhed").style.marginLeft = "242px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "-8px";
  document.getElementById("enhed").style.marginLeft = "-8px";
}

function test(){
	str=selectgroup(['radiotv']);	
	//alert(str);
	var url='http://10.120.181.3/DBDisplay.php?selectedgroup=' + str;
	openBrowser(url);
}

function openBrowser(url) {
   var target = '_blank';
   var options = "location=no"
   var ref = cordova.InAppBrowser.open(url, target, options);
}

function selectgroup(grupper) //grupper i DB hedder PT frugtgrønt og radiotv
{
	var str="";
	if(grupper.length>0)
		for(var i=0;i<grupper.length;i++)
		{
			if(i<1)
				str = "WHERE VareGruppe = '" + grupper[i] + "'";
			else
				str = str + " OR VareGruppe = '" + grupper[i] + "'";
		}
	else 
		str="";
	return str;
	//document.getElementById("selectedgroup").value = str;
	//alert(document.getElementById("selectedgroup").value);
	//document.getElementById("selectform").submit();
}
