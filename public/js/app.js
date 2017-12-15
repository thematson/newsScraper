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
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

  $("#articlenotes").on("click", function(){
    console.log("article notes clicked");
    $("#savednotes").html('<li class="collection-item"><div>Notes here<a href="#!" class="secondary-content"><i class="material-icons">delete</i></a></div></li>');

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
         // Log the response
         console.log(data);
         // Empty the notes section
         $("#notes").empty();
       });

     // Also, remove the values entered in the input and textarea for note entry
     $("#noteinput").val("");
  });

  // Whenever someone clicks a p tag
  // $(document).on("click", "p", function() {
  //   // Empty the notes from the note section
  //   $("#notes").empty();
  //   // Save the id from the p tag
  //   var thisId = $(this).attr("data-id");

  //   // Now make an ajax call for the Article
  //   $.ajax({
  //     method: "GET",
  //     url: "/articles/" + thisId
  //   })
  //     // With that done, add the note information to the page
  //     .done(function(data) {
  //       console.log(data);
  //       // The title of the article
  //       $("#notes").append("<h2>" + data.title + "</h2>");
  //       // An input to enter a new title
  //       $("#notes").append("<input id='titleinput' name='title' >");
  //       // A textarea to add a new note body
  //       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
  //       // A button to submit a new note, with the id of the article saved to it
  //       $("#notes").append(
  //         "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
  //       );

  //       // If there's a note in the article
  //       if (data.note) {
  //         // Place the title of the note in the title input
  //         $("#titleinput").val(data.note.title);
  //         // Place the body of the note in the body textarea
  //         $("#bodyinput").val(data.note.body);
  //       }
  //     });
  // });

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
    

    // // Run a POST request to change the note, using what's entered in the inputs
    // $.ajax({
    //   method: "POST",
    //   url: "/articles/" + thisId,
    //   data: {
    //     // Value taken from title input
    //     title: $("#titleinput").val(),
    //     // Value taken from note textarea
    //     body: $("#bodyinput").val()
    //   }
    // })
    //   // With that done
    //   .done(function(data) {
    //     // Log the response
    //     console.log(data);
    //     // Empty the notes section
    //     $("#notes").empty();
    //   });

    // // Also, remove the values entered in the input and textarea for note entry
    // $("#titleinput").val("");
    // $("#bodyinput").val("");
});
