window.onload = function() {
    // Display students when the page loads
    displayApplications();

    // Function to handle deletion when delete button is clicked
    window.deleteRow = function(button) {
        var idNumber = button.getAttribute("data-id");
        var row = button.closest("tr");
        deleteApplication(idNumber, row);
    };

    // Save student data when the save button is clicked
    document.getElementById("save").onclick = saveApplication;

    // Function to handle updating when update button is clicked
    window.updateRow = function(button) {
        var row = button.closest("tr");
        updateApplication(row);
    };

    //Function to handle edit before update button is clicked
    window.editRow = function(button) {
        var idNumber = button.getAttribute("data-id");
        var row = button.closest("tr");
        var cells = row.getElementsByTagName('td');
        document.getElementById("surname").value = cells[0].textContent;
        document.getElementById("firstname").value = cells[1].textContent;
        document.getElementById("middlename").value = cells[2].textContent;
        document.getElementById("dob").value = cells[3].textContent;
        document.getElementById("sex").value = cells[4].textContent;
        document.getElementById("civilstatus").value = cells[5].textContent;
        document.getElementById("weight").value = cells[6].textContent;
        document.getElementById("height").value = cells[7].textContent;
        document.getElementById("blood").value = cells[8].textContent;
    };
    
}

function updateApplication(row) {
    // Get updated data from the form
    var cells = row.getElementsByTagName('td');
    var btn = cells[9].getElementsByTagName('button')[2];
    var idnumber = btn.getAttribute("data-id");
    var surname = document.getElementById("surname").value;
    var firstname = document.getElementById("firstname").value;
    var middlename = document.getElementById("middlename").value;
    var dob = document.getElementById("dob").value;
    var sex = document.getElementById("sex").value;
    var civilstatus = document.getElementById("civilstatus").value;
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;
    var blood = document.getElementById("blood").value;

    // AJAX request to save updated data
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var response = JSON.parse(this.responseText);
            if (response.status === "success") {
                alert("Application updated successfully");
                // Update the table with the new data
                // const cells = row.getElementsByTagName('td');
                cells[0].textContent = surname;
                cells[1].textContent = firstname;
                cells[2].textContent = middlename;
                cells[3].textContent = dob;
                cells[4].textContent = sex;
                cells[5].textContent = civilstatus;
                cells[6].textContent = weight;
                cells[7].textContent = height;
                cells[8].textContent = blood;
            } else {
                alert("Failed to update Application");
            }
        }
    };
    xhttp.open("PUT", "http://127.0.0.1/personaldatasheet/3A/baladad/sis_baladad/updateApplication/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        idnumber: idnumber,
        surname: surname,
        firstname: firstname,
        middlename: middlename,
        dob: dob,
        sex: sex,
        civilstatus: civilstatus,
        weight: weight,
        height: height,
        blood: blood
    }));
}

function saveApplication() {
    // Get form data
    var surname = document.getElementById("surname").value;
    var firstname = document.getElementById("firstname").value;
    var middlename = document.getElementById("middlename").value;
    var dob = document.getElementById("dob").value;
    var sex = document.getElementById("sex").value;
    var civilstatus = document.getElementById("civilstatus").value;
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;
    var blood = document.getElementById("blood").value;

    // AJAX request to save data
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var response = JSON.parse(this.responseText);
            if (response.data && response.data.title) {
                alert(response.data.title);
            } else {
                alert("New application have been added!");
                // Clear form fields
                document.getElementById("applicationForm").reset();
                // Add new row to the table
                fetchApplicationList({
                    surname: surname,
                    firstname: firstname,
                    middlename: middlename,
                    dob: dob,
                    sex: sex,
                    civilstatus: civilstatus,
                    weight: weight,
                    height: height,
                    blood: blood
                });
            }
        }
    }
    xhttp.open("POST", "http://127.0.0.1/personaldatasheet/3A/baladad/sis_baladad/saveApplication/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        surname: surname,
        firstname: firstname,
        middlename: middlename,
        dob: dob,
        sex: sex,
        civilstatus: civilstatus,
        weight: weight,
        height: height,
        blood: blood
    }));
}

function deleteApplication(idNumber, row) {
    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.readyState == 4 && xhttp.status === 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == "success") {
                alert("Application deleted successfully");
                row.remove(); // Remove the row from the table
            } else {
                alert(response.data.title);
            }
        } else {
            alert('Error deleting application');
        }
    }
    xhttp.open("POST", "http://127.0.0.1/personaldatasheet/3A/baladad/sis_baladad/deleteApplication/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({ "idNumber": idNumber }));
}


function displayApplications() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var response = JSON.parse(this.responseText);
            if (response.status === "success") {
                // Clear existing student data
                document.getElementById("applicationTableBody").innerHTML = "";

                // Add data to the table
                response.data.forEach(application => {
                    fetchApplicationList(application);
                });
            } else {
                console.error("Failed to fetch student data.");
            }
        }
    };

    xhttp.open("POST", "http://127.0.0.1/personaldatasheet/3A/baladad/sis_baladad/displayApplications/", true);
    xhttp.send();
}

function fetchApplicationList(application) {
    const newRow = `<tr>
        <td>${application.surname}</td>
        <td>${application.firstname}</td>
        <td>${application.middlename}</td>
        <td>${application.dob}</td>
        <td>${application.sex}</td>
        <td>${application.civilstatus}</td>
        <td>${application.weight}</td>
        <td>${application.height}</td>
        <td>${application.blood}</td>
        <td>
            <button class="btn btn-primary btn-sm edit" data-id="${application.id}" onclick="editRow(this)">Edit</button>
            <button class="btn btn-success btn-sm update" data-id="${application.id}" onclick="updateRow(this)">Update</button>
            <button class="btn btn-danger btn-sm delete" data-id="${application.id}" onclick="deleteRow(this)">Delete</button>
        </td>
    </tr>`;
    document.getElementById("applicationTableBody").innerHTML += newRow;
}