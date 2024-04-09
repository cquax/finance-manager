// Login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    axios.post('/login', { username, password })
        .then(response => {
            console.log('Logged in successfully:', response.data);
            // Hide login form and show transaction form
            document.getElementById('login-form').classList.add('hidden');
            document.getElementById('transaction-form').classList.remove('hidden');
            document.getElementById('transactions-list').classList.remove('hidden');
            fetchTransactions(); // Fetch transactions after login
        })
        .catch(error => {
            console.error('Login failed:', error.response.data.message);
            alert('Login failed: ' + error.response.data.message); // Show error message to the user
        });
});

// Registration form submission
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    axios.post('/register', { username, password })
        .then(response => {
            console.log('Registered successfully:', response.data);
            // Hide registration form and show login form
            document.getElementById('registration-form').classList.add('hidden');
            document.getElementById('login-form').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Registration failed:', error.response.data.message);
            alert('Registration failed: ' + error.response.data.message); // Show error message to the user
        });
});

// Transaction form submission
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    axios.post('/transactions', { amount, category, date })
        .then(response => {
            console.log('Transaction added successfully:', response.data);
            fetchTransactions(); // Fetch transactions again to update the list
        })
        .catch(error => {
            console.error('Failed to add transaction:', error.response.data.message);
            alert('Failed to add transaction: ' + error.response.data.message); // Show error message to the user
        });
});

// Function to fetch transactions and update the transactions list
function fetchTransactions() {
    axios.get('/transactions')
        .then(response => {
            const transactions = response.data;
            const transactionsBody = document.getElementById('transactions-body');
            transactionsBody.innerHTML = ''; // Clear existing transactions
            transactions.forEach((transaction, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${transaction.amount}</td>
                    <td>${transaction.category}</td>
                    <td>${transaction.date}</td>
                `;
                transactionsBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Failed to fetch transactions:', error.response.data.message);
            alert('Failed to fetch transactions: ' + error.response.data.message); // Show error message to the user
        });
}
