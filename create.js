document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step-container');
    const nextButtons = document.querySelectorAll('.nextbutton');
    const prevButton = document.querySelector('.prev-step');
    const form = document.getElementById('create-account-form');
    const submitButton = document.querySelector('.step-container[data-step="5"] .nextbutton'); // Submit button in Step 5

    let currentStep = 1;
    const formData = {};

    function showStep(step) {
        // Hide all step containers
        steps.forEach(s => s.style.display = 'none');
        
        // Show the current step container
        document.querySelector(`.step-container[data-step="${step}"]`).style.display = 'block';
    
        // Update steps status
        document.querySelectorAll('.step').forEach(el => {
            const stepNumber = parseInt(el.getAttribute('data-step'));
    
            // Remove 'current-step' class from all steps
            el.classList.remove('current-step');
            
            // Mark completed steps and add 'current-step' to the active step
            if (stepNumber < step) {
                el.classList.add('completed');
            } else if (stepNumber === step) {
                el.classList.add('current-step');
            }
        });
    }
    

    function gatherFormData() {
        document.querySelectorAll(`.step-container[data-step="${currentStep}"] .input-wrapper input`).forEach(input => {
            formData[input.placeholder] = input.value;
        });
    }

    function calculateAge(birthMonth, birthDay, birthYear) {
        const currentYear = 2024;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const birthMonthIndex = monthNames.indexOf(birthMonth);
        
        let age = currentYear - birthYear;
        
        const today = new Date();
        const birthDate = new Date(birthYear, birthMonthIndex, birthDay);
        const todayDate = new Date(currentYear, today.getMonth(), today.getDate());
        
        // Check if the birthday has occurred this year yet
        if (todayDate < birthDate) {
            age--;
        }
        return age;
    }

    function populateConfirmation() {
        const birthMonth = formData['Enter Birth Month'] || 'N/A';
        const birthDay = formData['Enter Birth Day'] || 'N/A';
        const birthYear = formData['Enter Birth Year'] || 'N/A';
        
        document.getElementById('confirm-id').textContent = formData['Enter ID'] || 'N/A';
        document.getElementById('confirm-email').textContent = formData['Enter Contact No.'] || 'N/A';
        document.getElementById('confirm-name').textContent = `${formData['Enter First Name'] || ''} ${formData['Enter Middle Name'] || ''} ${formData['Enter Last Name'] || ''}`.trim() || 'N/A';
        document.getElementById('confirm-birthday').textContent = `${birthMonth} ${birthDay}, ${birthYear}`;
        
        const age = calculateAge(birthMonth, birthDay, birthYear);
        document.getElementById('confirm-age').textContent = age !== undefined ? age : 'N/A';
        document.getElementById('confirm-username').textContent = formData['Enter Username'] || 'N/A';
    }

    nextButtons.forEach(nextbutton => {
        nextbutton.addEventListener('click', () => {
            gatherFormData();

            if (currentStep < 5) {
                currentStep++;
                if (currentStep === 5) {
                    populateConfirmation();
                }
                showStep(currentStep);
            }
        });
    });

    prevButton.addEventListener('click', () => {
        currentStep = 1;
        showStep(currentStep);
    });

    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default submission
        console.log('Submit button clicked'); // Debugging line
        window.location.href = 'allset.html'; // Redirect
    });

    showStep(currentStep);
});
