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


  $(document).on("click", "#startH", function() {

    if (questionCounter == 0) {
      $(".rulesBox").hide();
    }
    else if (questionCounter == lastQuestionIndex) {
      $(".resultsBox").hide();
      $("#trueH").attr("disabled", false);
      $("#falseH").attr("disabled", false);
      $("#submitH").attr("disabled", false);
      $('input[name="answer"]').removeAttr('checked');
      questionCounter = 0;
      correctCounter = 0;
      wrongCounter = 0;
    }
    
      var currentQuestion = questionArray[questionCounter].question;
      $("#questionH").text(currentQuestion);

      $(".resetBox").hide();

      $(".questionBox").show();

      runTimer()

  })

  function newQuestion() {

    questionCounter++;

    var currentQuestion = questionArray[questionCounter].question;
    $("#questionH").text(currentQuestion);

    
    $("#trueH").attr("disabled", false);
    $("#falseH").attr("disabled", false);
    $("#submitH").attr("disabled", false);

    $('input[name="answer"]').removeAttr('checked');

    runTimer();

  }

  $(document).on("click", "#submitH", function() {
    stopTimer();
  }) 

      function runTimer() {
        $("#showNumberH").text(number);
        intervalId = setInterval(decrement, 1000);
      }

      function decrement() {

        number--;

        $("#showNumberH").html(number);

        if (number === 0) {

          stopTimer();

        }
      }

      function stopTimer() {

        clearInterval(intervalId);
        number = 10;

        $("#trueH").attr("disabled", true);
        $("#falseH").attr("disabled", true);
        $("#submitH").attr("disabled", true);

        gradeQuestion();

      }

      function gradeQuestion() {
        
        var currentAnswer = $("input[type=radio][name=answer]:checked").val();

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

      function gradeTest() {

        $(".questionBox").hide();

        $("#numberCorrectH").text("Number Correct: " + correctCounter);
        $("#numberWrongH").text("Number Wrong: " + wrongCounter);

        $(".resultsBox").show();

        $(".resetBox").show();
      
      }

})