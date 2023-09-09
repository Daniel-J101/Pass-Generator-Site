const form = document.getElementById("apiRequestForm");
const submitButton = document.getElementById("submitButton");
const serverMessageElement = document.getElementById("response");

form.addEventListener("submit", async function (event) {
  //versioning debug
  console.log("V0.0.4");
  // Prevent the form from being submitted the traditional way
  event.preventDefault();

  submitButton.value = "Loading...";

  //convert image to base64
  const fileInput = document.getElementById("imageUpload");
  const file = fileInput.files[0];
  const base64String = await convertToBase64(file);

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
    // imageURL: document.getElementById("imageURL").value, //can be an image link or a base64 encoded image
    imageURL: base64String,
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

// convert file to base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      resolve(reader.result.replace("data:", "").replace(/^.+,/, ""));
    };

    reader.onerror = function () {
      reject(new Error("Error converting to base64"));
    };

    reader.readAsDataURL(file);
  });
}
