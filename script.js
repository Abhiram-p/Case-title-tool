// Function to fetch and populate dropdowns from text files
async function loadOptions() {
    const serviceStatusDropdown = document.getElementById('serviceStatus');
    const caseStatusDropdown = document.getElementById('caseStatus');

    // Helper function to add options to a dropdown
    const addOptions = (dropdown, data) => {
        data.split('\n').forEach(item => {
            const trimmedItem = item.trim();
            if (trimmedItem) {
                const option = document.createElement('option');
                option.value = trimmedItem;
                option.textContent = trimmedItem;
                dropdown.appendChild(option);
            }
        });
    };

    // Fetch and populate Service Status options
    const serviceData = await fetch('Service_Status.txt').then(res => res.text());
    addOptions(serviceStatusDropdown, serviceData);

    // Fetch and populate Case Status options
    const caseData = await fetch('case_status.txt').then(res => res.text());
    addOptions(caseStatusDropdown, caseData);
}

// Function to validate and submit form data
function submitForm() {
    const issue = document.getElementById('issue').value.trim();
    const serviceStatus = document.getElementById('serviceStatus').value;
    const caseStatus = document.getElementById('caseStatus').value;

    // Validate required fields
    if (!issue || !serviceStatus || !caseStatus) {
        alert('Please fill out all required fields.');
        return;
    }

    // Format and display result
    const resultText = `${issue} | ${serviceStatus} | ${caseStatus}`;
    const resultElement = document.getElementById('result');
    resultElement.textContent = resultText;
    resultElement.style.display = 'block';

    // Copy result to clipboard
    navigator.clipboard.writeText(resultText).then(() => {
        alert('Result copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy to clipboard.');
    });
}

// Load dropdown options when the page loads
window.onload = loadOptions;
