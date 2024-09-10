let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

const categoryImages = {
    'Food & Beverage': 'https://homelander.blob.core.windows.net/exp/food-beverage.png',
    'Rent': 'https://homelander.blob.core.windows.net/exp/rent.png',
    'Transport': 'https://homelander.blob.core.windows.net/exp/transport.png',
    'Relaxing': 'https://homelander.blob.core.windows.net/exp/relaxing.jpg'
};

// Function to update the total amount and expenses table
function updateExpensesTable() {
    // Clear the table body
    expensesTableBody.innerHTML = '';

    // Calculate the total amount
    totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountCell.textContent = totalAmount;

    // Populate the table with expenses
    for (const expense of expenses) {
        const newRow = expensesTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const imageCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            // Remove the expense and update the table
            expenses = expenses.filter(e => e !== expense);
            updateExpensesTable();
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;

        const img = document.createElement('img');
        img.src = categoryImages[expense.category];
        img.alt = expense.category;
        img.style.width = '50px';
        img.style.height = '50px';
        imageCell.appendChild(img);

        deleteCell.appendChild(deleteBtn);
    }
}

// Add new expense
addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Validation
    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Add new expense
    const newExpense = { category, amount, date };
    expenses.push(newExpense);
    
    // Update the expenses table
    updateExpensesTable();

    // Clear input fields
    amountInput.value = '';
    dateInput.value = '';
});

// Initialize the table on page load if there are existing expenses
document.addEventListener('DOMContentLoaded', updateExpensesTable);
