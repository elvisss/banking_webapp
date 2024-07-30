const REFRESH_BUTTON = document.querySelector("#js-refresh")
const LOADER = document.querySelector("#loader");
const ACCOUNT_LIST_TABLE_BODY = document.querySelector("#accounts-table tbody");

async function fetchAccounts() {
  LOADER.style.display = "block";
  try {
    const accounts = await getAccounts();
  
    let rowHTML = "";
  
    accounts.forEach((account) => {
      rowHTML += `
          <tr>
              <td>${account.id}</td>
              <td>${account.accountHolderName}</td>
              <td>${account.balance}</td>
              <td>
                <button data-account-id=${account.id} class="js-action-deposit btn btn-primary">Deposit</button>
                <button data-account-id=${account.id} class="js-action-withdraw btn btn-secondary">Withdraw</button>
              </td>
          </tr>
        `;
    });
  
    ACCOUNT_LIST_TABLE_BODY.innerHTML = rowHTML;

    setDepositActions();
  } catch (e) {
    console.log(e)
  } finally {
    LOADER.style.display = "none";
  }
}

function setDepositActions () {
  const depositButtons = document.querySelectorAll(".js-action-deposit");
  depositButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const accountId = event.target.dataset.accountId;
      const amount = prompt("Enter deposit amount");
      if (amount) {
        try {
          const response = await depositAmount(accountId, amount);
          if (response) {
            alert("Deposit successful");
            fetchAccounts();
          }
        } catch (error) {
          console.log(error);
          alert("Deposit failed");
        }
      }
    });
  });
}

REFRESH_BUTTON.addEventListener("click", () => {
  fetchAccounts();
})

window.onload = function exampleFunction() {
  fetchAccounts();
};
