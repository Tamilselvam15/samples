$(document).ready(function() {
    
    var email = localStorage.getItem("email");
    var username = localStorage.getItem("username");
    if(email) {
        $("#email").val(email);
    }
    if(username) {
        $("#name").val(username);
    }

    $("#submitButton").click(function(e) { 
        e.preventDefault();
        validateForm(email, username);
    });
});

function validateForm(email, username) {
    var phone = $("#phone").val();
    var course = $("#course").val(); 
    var branch = $("#branch").val(); 
    var isValid = true;
    
    $(".error").text("");

    if(phone === ""){
        $("#phoneError").text("Phone number is required"); 
        isValid = false;
    }
    if(course === ""){
        $("#courseError").text("Course is required"); 
    }
    if(branch === ""){
        $("#branchError").text("Branch is required"); 
        isValid = false;
    }

    if(!isValid){
        return;
    }

    sendDataToBackend(phone, course, branch, email, username); 
}

function sendDataToBackend(phone, course, branch, email, username) { 
    $.ajax({
        type: "POST",
        url: "http://localhost/guvi/php/profile.php",
        data: {
            phone: phone,
            course: course,
            branch: branch,
            email: email,
            name: username
        },
        success: function(response){
            var data = JSON.parse(response);
            $("#responseMessage").text(data.message);
            var responseMessage = $("#responseMessage");
            if(data.status == "success"){
                responseMessage.css("color" , "green");
                $("#email").val("");
                $("#phone").val("");
                $("#name").val("");
                $("#course").val("");
                $("#branch").val("");
            
            }
            else{
                responseMessage.css("color", "red")
            }
        },
        error: function(xhr, status, error){
            console.error("Failed to send data", error);
        }
    });
}
