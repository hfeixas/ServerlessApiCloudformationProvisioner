var API_ENDPOINT = 'https://ge5db2f853.execute-api.us-east-1.amazonaws.com/prod/serverless';

// // Setup divs that will be used to display interactive messages
var errorDiv = document.getElementById('error-message')
var successDiv = document.getElementById('success-message')
var resultsDiv = document.getElementById('results-message')

// Setup easy way to reference values of the input boxes
function hostname() { return document.getElementById('div_id_hostname').value }
function role() { return document.getElementById('div_id_role').value }
function management_subnet() { return document.getElementById('div_id_management_subnet').value }
function data_subnet() { return document.getElementById('div_id_data_subnet').value }

function clearNotifications() {
    // Clear any exisiting notifications in the browser notifications divs
    errorDiv.textContent = '';
    resultsDiv.textContent = '';
    successDiv.textContent = '';
}

// Add listeners for each button that make the API request
document.getElementById('submit').addEventListener('click', function(e) {
    sendData(e, 'submit');
});

function sendData (e, pref) {
    // Prevent the page reloading and clear exisiting notifications
    e.preventDefault()
    clearNotifications()
    // Prepare the appropriate HTTP request to the API with fetch
    // create uses the root /prometheon endpoint and requires a JSON payload
    fetch(API_ENDPOINT, {
        headers:{
            "Content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
            hostname: hostname(),
            role: role(),
            management_subnet: management_subnet(),
            data_subnet: data_subnet()
        }),
        // mode: 'cors'
    })
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data)
        successDiv.textContent = 'Successful';
        resultsDiv.textContent = JSON.stringify(data);
    })
    .catch(function(err) {
        errorDiv.textContent = 'Yikes! There was an error:\n' + err.toString();
        console.log(err)
    });
};