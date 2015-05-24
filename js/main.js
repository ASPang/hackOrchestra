// Parse related keys
var PARSE_APP = "r3Ar552B9EZ21NX93elLQUbNtnX443cmFB4D1AqC";
var PARSE_JS = "OtlU7zcmb659UCXtmbKTCC7dKPGM0zmpfYzvWsz4";

var headerImg = [];
var eventID = [];
var eventName = [];
var selectedEvent = "";
var selectedEventNum = "";

$(document).ready(function() {
  Parse.initialize(PARSE_APP, PARSE_JS);

  NoteObject = Parse.Object.extend("Events");

  function getNotes() {
    var query = new Parse.Query(NoteObject);

    query.find({
      success:function(results) {
        console.dir(results);
        var s = "";
        
        for(var i=0, len=results.length; i<len; i++) {
          var note = results[i];
          s += "<p>";
          s += "<b>"+note.get("Value")+"</b><br/>";
          s += "<b>Written "+note.createdAt + "<br/>";
          s += note.get("Attributes");
          s += note.get("image");
          s += "</p>";
          
          //Get list of events
          eventName.push(note.get("eventName"));
          
          console.log(len);
          console.log(eventName[i]);
          
          
          //Get icon images
          var image = note.get("image");
          headerImg.push(note.get("image").url); 
          console.log(headerImg[0]);
          
        }
        
        loadMain(function() {
            console.log('huzzah, I\'m done!');
        });
    
        console.dir(s);
        $("#notes").html(s);
        
      },
      error:function(error) {
        alert("Error when getting notes!");
      }
    });
  }
  
  getNotes();
});


//Load the Event title to the top of the page
function loadEventTitle(selectedEvent, tagName) {
    var htmlStr = "<strong>" + eventName[selectedEvent];
    document.getElementById(tagName).innerHTML = htmlStr;
}

//Load image on share page
function loadEventShareImg(imgNum, imgTagName) {
    var htmlStr = "";
    
    console.log(imgNum  + " " + imgTagName + " " + "\"" + imgTagName + "\"");
    if (headerImg[imgNum] != "") {
        htmlStr = "<img src=\"" + headerImg[imgNum] + "\" onclick=\"eventIconClick(" + imgNum + ")\" />";
        htmlStr += "<p>" + eventName[imgNum] + "</p>";
        
        document.getElementById(imgTagName).innerHTML = htmlStr;
    }
}