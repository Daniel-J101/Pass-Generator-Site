const form = document.getElementById("apiRequestForm");
const submitButton = document.getElementById("submitButton");
const serverMessageElement = document.getElementById("response");

form.addEventListener("submit", async function (event) {
  // Prevent the form from being submitted the traditional way
  event.preventDefault();

  submitButton.value = "Loading...";

  // Getting form data
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    gradeLevel: document.getElementById("gradeLevel").value,
    graduationYear: document.getElementById("graduationYear").value,
    advisory: document.getElementById("advisory").value,
    studentID: document.getElementById("studentID").value,
    schoolYear: document.getElementById("schoolYear").value,
    barcodeData: document.getElementById("barcodeData").value,
    imageURL: document.getElementById("imageURL").value,
  };

  // Send API request
  try {
    const response = await fetch(
      "https://us-central1-pass-generator-8558c.cloudfunctions.net/pass",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();

    serverMessageElement.textContent = responseData.message;
    serverMessageElement.style.display = "block"; // Display the server message
    setTimeout(function () {
      serverMessageElement.textContent = "";
      serverMessageElement.style.display = "none";
    }, 5000);
  } catch (error) {
    console.error("Error:", error);
    serverMessageElement.textContent = "An unexpected error occurred";
    serverMessageElement.style.display = "block";
    setTimeout(function () {
      serverMessageElement.textContent = "";
      serverMessageElement.style.display = "none";
    }, 5000);
  } finally {
    submitButton.value = "Send Request"; // Change the button text back to "Send Request"
  }
});
