$(function() {
  // Grab the articles as a json
  $.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append(
        "<p data-id='" +
          data[i]._id +
          "'>" +
          data[i].title +
          "<br />" +
          data[i].link +
          "<br />" +
          data[i].summary +
          "</p>"
      );
    }
  });

  $("#deletethis").on("click", function(){
    console.log(this);
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "DELETE",
      url: "/deletearticle/" + thisId
    })
      .done(function(data){
        console.log(data);
        location.reload();
      });
  });

  $(document).ready(function(){
     $("#delnote").on("click", function() {
       console.log("clicke");
     });
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

 

  $("#savenote").on("click", function(){
    console.log(this);
     var thisId = $(this).attr("data-id");

     // Run a POST request to change the note, using what's entered in the inputs
     $.ajax({
       method: "POST",
       url: "/articles/" + thisId,
       data: {
         // Value taken from title input
         title: "Note for " + thisId,
         // Value taken from note textarea
         body: $("#noteinput").val()
       }
     })
       // With that done
       .done(function(data) {
         var listnote = JSON.stringify(data.note);
         console.log(listnote);
        //  $("#articlenotes").on("click", function() {
           console.log("article notes clicked");
           $("#notelist").append('<li class="collection-item"><div>' + listnote + '<a href="#!" class="secondary-content" id="delnote"><i class="material-icons" >delete</i></a></div></li>');
        //  });
               
       });

     // Also, remove the values entered in the input and textarea for note entry
     $("#noteinput").val("");
  });

  

  // When you click the savenote button
  $(".savethis").on("click", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .done(function(data){
        console.log(data);
        location.reload();
      });
      
    });
    
  
});
