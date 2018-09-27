$(document).ready(function() {

  var questionArray = [
    {question: "Woodrow Wilson was the president during World War I.", answer: "true",
      picture: "assets/images/wilson.jpg", caption: "Wilson was president from 1913 to 1921."},
    {question: "Susan B. Anthony was the first US congresswoman.", answer: "false",
      picture: "assets/images/rankin.jpg", caption: "Jeannette Rankin was the first US congresswoman."},
    {question: "Benjamin Franklin was the first Secretary of the Treasury.", answer: "false",
      picture: "assets/images/hamilton.jpg", caption: "Alexander Hamilton was the first Secretary of the Treasury."},
    {question: "James Monroe was responsible for drafting the Constitution.", answer: "false",
      picture: "assets/images/madison.jpg", caption: "James Madison was responsible for drafting the Constitution."},
    {question: "Harriet Beecher Stowe wrote the book Uncle Tom's Cabin.", answer: "true",
      picture: "assets/images/stowe.jpg", caption: "It was first published in book form in 1852."}
  ]

  var questionCounter = 0;
  var correctCounter = 0;
  var wrongCounter = 0;
  var number = 10;
  var intervalId;
  var lastQuestionIndex = questionArray.length - 1;

  $(".questionBox").hide();
  $(".resultsBox").hide();
  $(".messageBox").hide();

  // Handles the start of the first game or the restart after the end of a game.
  $(document).on("click", "#startH", function() {

    if (questionCounter == 0) {
      $(".rulesBox").hide();
    }
    else if (questionCounter == lastQuestionIndex) {

      $(".resultsBox").hide();
      $("#trueH").attr("disabled", false);
      $("#falseH").attr("disabled", false);
      $("#submitH").attr("disabled", false);
      
      questionCounter = 0;
      correctCounter = 0;
      wrongCounter = 0;
    }

      $(".radio").prop("checked", false);

      var currentQuestion = questionArray[questionCounter].question;
      $("#questionH").text(currentQuestion);

      $(".resetBox").hide();
      $(".questionBox").show();

      runTimer()
  })

  // Handle the submitting of an answer before the timer ends
  $(document).on("click", "#submitH", function() {
    stopTimer();
  }) 

  // Creates a new question after the last question's answer has been shown
  function newQuestion() {

    questionCounter++;

    var currentQuestion = questionArray[questionCounter].question;
    $("#questionH").text(currentQuestion);

    
    $("#trueH").attr("disabled", false);
    $("#falseH").attr("disabled", false);
    $("#submitH").attr("disabled", false);

    $(".radio").prop("checked", false);

    runTimer();
  }


  // Starts the timer for the amount of time that a player has to answer a question.
  function runTimer() {
    $("#showNumberH").text(number);
    intervalId = setInterval(decrement, 1000);
  }

  // Decrements the timer every second and stops it when it gets to zero
  function decrement() {

    number--;
    $("#showNumberH").html(number);

    if (number === 0) {
      stopTimer();
    }
  }

  // Stops the timer and calls the function to grade the question.
  function stopTimer() {

    clearInterval(intervalId);
    number = 10;

    $("#trueH").attr("disabled", true);
    $("#falseH").attr("disabled", true);
    $("#submitH").attr("disabled", true);

    gradeQuestion();
  }

  // Grades the question, displays the answer, and either creates a new question or grades the test.
  function gradeQuestion() {
    
    var currentAnswer = $(".radio:checked").val();

    if (currentAnswer == questionArray[questionCounter].answer) {
      correctCounter++;
    }
    else {
      wrongCounter++;
    }

    $("#answerMessageH").text(questionArray[questionCounter].answer);
    $("#answerPictureH").attr("src", questionArray[questionCounter].picture);
    $("#pictureCaptionH").text(questionArray[questionCounter].caption);
    $(".messageBox").show();

    
    setTimeout(function() {

      $(".messageBox").hide();

      if (questionCounter == lastQuestionIndex) {
        gradeTest();
      }
      else {
      newQuestion();
      }
    }, 5000);
  }

  // Displays the results of the test.
  function gradeTest() {

    $("#numberCorrectH").text("Number Correct: " + correctCounter);
    $("#numberWrongH").text("Number Wrong: " + wrongCounter);

    $(".questionBox").hide();
    $(".resultsBox").show();
    $(".resetBox").show();
  }

})