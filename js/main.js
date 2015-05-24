// Parse related keys
var PARSE_APP = "r3Ar552B9EZ21NX93elLQUbNtnX443cmFB4D1AqC";
var PARSE_JS = "OtlU7zcmb659UCXtmbKTCC7dKPGM0zmpfYzvWsz4";

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
          s += "</p>";
        }
        $("#notes").html(s);
      },
      error:function(error) {
        alert("Error when getting notes!");
      }
    });
  }



  //call getNotes immediately
  getNotes();

});
