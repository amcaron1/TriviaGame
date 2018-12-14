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

  // Hides all boxes except rules at the start of game
  $(".questionBox").hide();
  $(".resultsBox").hide();
  $(".messageBox").hide();

  // Handles the start of the first game or the restart after the end of a game.
  $(document).on("click", "#startH", function() {
    // If this is the first game
    if (questionCounter == 0) {
      $(".rulesBox").hide();
    }
    // Else if this is the end of a game
    else if (questionCounter == lastQuestionIndex) {
      // Hides results and enables answer buttons
      $(".resultsBox").hide();
      $("#trueH").attr("disabled", false);
      $("#falseH").attr("disabled", false);
      $("#submitH").attr("disabled", false);
      
      questionCounter = 0;
      correctCounter = 0;
      wrongCounter = 0;
    }
      // Unchecks radio buttons
      $(".radio").prop("checked", false);
      // Gets next trivia question from array
      var currentQuestion = questionArray[questionCounter].question;
      $("#questionH").text(currentQuestion);

      $(".resetBox").hide();
      $(".questionBox").show();

      runTimer()
  })

  // Handles the submitting of an answer before the timer ends
  $(document).on("click", "#submitH", function() {
    console.log('about to stop timer')
    stopTimer();
  }) 

  // Creates a new question after the last question's answer has been shown
  function newQuestion() {

    questionCounter++;
    // Gets next trivia question from the array
    var currentQuestion = questionArray[questionCounter].question;
    $("#questionH").text(currentQuestion);

    // Enable answer buttons
    $("#trueH").attr("disabled", false);
    $("#falseH").attr("disabled", false);
    $("#submitH").attr("disabled", false);
    // Unchecks radio buttons
    $(".radio").prop("checked", false);

    runTimer();
  }

  // Starts the timer for the amount of time that a player has to answer a question.
  // setInterval calls decrement every 1 second
  // intervalID identifies the timers so that clearInterval knows what timer to stop
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
    // Stops the timer and resets time to 10
    clearInterval(intervalId);
    number = 10;
    // Disables answer buttons
    $("#trueH").attr("disabled", true);
    $("#falseH").attr("disabled", true);
    $("#submitH").attr("disabled", true);

    gradeQuestion();
  }

  // Grades the question, displays the answer, and either creates a new question or grades the test.
  function gradeQuestion() {
    // Gets answer from array
    var currentAnswer = $(".radio:checked").val();
    // Checks user answer
    if (currentAnswer == questionArray[questionCounter].answer) {
      correctCounter++;
    }
    else {
      wrongCounter++;
    }
  
    // Hack that allows for the resetting of the new answer so that the old answer is not briefly displayed
    setTimeout(() => {
      $(".messageBox").show();
    }, 0)

    // Displays the answer
    $("#answerMessageH").text(questionArray[questionCounter].answer);
    $("#answerPictureH").attr("src", questionArray[questionCounter].picture);
    $("#pictureCaptionH").text(questionArray[questionCounter].caption);

    // setTimeout executes the statements after 5 seconds
    // So after 5 seconds, the answer is hidden and either the test is graded or a new quesiton is displayed
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
