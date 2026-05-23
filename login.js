
// sign in page ta dhorbo

document.getElementById("sign-btn").addEventListener("click", function () {
  // get the num
  const userInput = document.getElementById("input-user");
  const username = userInput.value.trim();
  console.log(username);

  // get pin
  const passInput = document.getElementById("password");
  const userPass = passInput.value.trim();
  console.log(userPass);

  // set username & pass
  if (username === "admin" && userPass === "admin123") {
    alert("Successfully Sign-In");
    window.location.assign("home.html");
  }
  else {
    alert("Username & Password Does Not Match");
  
  }
});