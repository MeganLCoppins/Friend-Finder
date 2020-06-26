$(document).ready(function() {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const usernameInput = $("input#username-input");
  const surveyInput = $("select.chosen-select");

  const answers = [];
  let sum = 0;

  surveyInput.change( function(e) {
    e.preventDefault();

  if($(":selected").map(function(){
    $(this).val() !== "" 
  })){
    answers.push(parseInt($(this).val()));
  } 
  console.log(answers);
  sum = answers.reduce(function(a, b){
    return a + b;
  }, 0);

  return sum;
  })

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();

    const userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      score: sum
    };

    if (!userData.email || !userData.password || !userData.username ) {
      return console.log("nope");
    }
    // If we have a username, email, password, and survey score run the signUpUser function
    signUpUser(userData.username, userData.email, userData.password, userData.score);
    emailInput.val("");
    usernameInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, email, password, score) {
    $.post("/api/survey", {
      username: username,
      email: email,
      password: password,
      score: score
    })
      .then(function(data) {
        // window.location.replace("/members");
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
