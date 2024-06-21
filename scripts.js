document.addEventListener('DOMContentLoaded', () => {
    // Registration Form Submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const studentId = document.getElementById('studentId').value;
            const messageDiv = document.getElementById('message');

            if (password !== confirmPassword) {
                messageDiv.textContent = 'Passwords do not match.';
                return;
            }

            // Simulate storing user data in local storage
            localStorage.setItem('user', JSON.stringify({ name, email, password, studentId }));

            messageDiv.textContent = 'Registration successful! Redirecting to login...';
            messageDiv.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const loginMessageDiv = document.getElementById('loginMessage');

            // Simulate retrieving user data from local storage
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                localStorage.setItem('loggedIn', 'true');
                loginMessageDiv.textContent = 'Login successful! Redirecting to profile...';
                loginMessageDiv.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 2000);
            } else {
                loginMessageDiv.textContent = 'Invalid email or password.';
                loginMessageDiv.style.color = 'red';
            }
        });
    }

    // Profile Page
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileStudentId = document.getElementById('profileStudentId');
    const logoutButton = document.getElementById('logoutButton');
    if (profileName && profileEmail && profileStudentId && logoutButton) {
        // Check if user is logged in
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            window.location.href = 'login.html';
        }

        // Retrieve user data from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        profileName.textContent = storedUser.name;
        profileEmail.textContent = storedUser.email;
        profileStudentId.textContent = storedUser.studentId;

        // Handle logout
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedIn');
            window.location.href = 'login.html';
        });
    }
});
