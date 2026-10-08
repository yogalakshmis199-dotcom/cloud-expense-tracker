let transactions = [];

function loadTransactions() {

    const saved =
        localStorage.getItem("transactions");

    if (saved) {
        transactions = JSON.parse(saved);
    }

    renderTransactions();
    updateSummary();
}


function addTransaction() {

    const title =
        document.getElementById("title").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    if (title === "" || amount <= 0) {
        alert("Please enter valid transaction details.");
        return;
    }

    const transaction = {
        id: Date.now(),
        title: title,
        amount: amount,
        type: type,
        date: new Date().toLocaleDateString()
    };

    transactions.push(transaction);

    saveTransactions();
    renderTransactions();
    updateSummary();

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
}


function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}


function renderTransactions(list = transactions) {

    const container =
        document.getElementById("transactionList");

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML =
            "<p>No transactions found.</p>";
        return;
    }

    list.forEach(transaction => {

        const div = document.createElement("div");

        div.className = "transaction";

        const sign =
            transaction.type === "income" ? "+" : "-";

        div.innerHTML = `
            <div>
                <strong>${transaction.title}</strong>
                <p>${transaction.date}</p>
            </div>

            <strong class="${transaction.type}">
                ${sign} ₹${transaction.amount}
            </strong>

            <button
                class="delete"
                onclick="deleteTransaction(${transaction.id})">
                Delete
            </button>
        `;

        container.appendChild(div);
    });
}


function deleteTransaction(id) {

    transactions =
        transactions.filter(
            transaction => transaction.id !== id
        );

    saveTransactions();
    renderTransactions();
    updateSummary();
}


function updateSummary() {

    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });

    const balance = income - expenses;

    document.getElementById("income")
        .textContent = `₹${income}`;

    document.getElementById("expenses")
        .textContent = `₹${expenses}`;

    document.getElementById("balance")
        .textContent = `₹${balance}`;
}


function searchTransactions() {

    const search =
        document.getElementById("search")
        .value
        .toLowerCase();

    const filtered =
        transactions.filter(transaction =>
            transaction.title
                .toLowerCase()
                .includes(search)
        );

    renderTransactions(filtered);
}


loadTransactions();