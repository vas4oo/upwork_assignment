document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    // Simple email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("response").innerHTML = "Invalid email address";
        return;
    }

    // Data to be sent to backend API
    var data = {
        name: name,
        email: email,
    };

    // Sending data to backend API (You need to replace the URL with your backend API endpoint)
    fetch("/submit-form", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            document.getElementById("response").innerHTML =
                data.message;
        })
        .catch((error) => {
            console.error("Error:", error);
            document.getElementById("response").innerHTML =
                "An error occurred while submitting the form";
        });
});
