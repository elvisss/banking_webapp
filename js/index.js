const REFRESH_BUTTON = document.querySelector("#js-refresh")
const LOADER = document.querySelector("#loader");
const ACCOUNT_LIST_TABLE_BODY = document.querySelector("#accounts-table tbody");
const CONFIRM_DEPOSIT_BUTTON = document.querySelector("#confirm-deposit");
const DEPOSIT_AMOUNT_INPUT = document.querySelector("#deposit-amout");
let accountId = null;

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
                <button data-account-id=${account.id} class="js-action-deposit btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Deposit</button>
                <button data-account-id=${account.id} class="js-action-withdraw btn btn-secondary">Withdraw</button>
              </td>
          </tr>
        `;
    });
  
    ACCOUNT_LIST_TABLE_BODY.innerHTML = rowHTML;

    setDepositActions();
    setWithdrawActions();
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
      accountId = event.target.dataset.accountId;
    });
  });
}

function setWithdrawActions () {
  const withdrawButtons = document.querySelectorAll(".js-action-withdraw");
  withdrawButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const accountId = event.target.dataset.accountId;
      const amount = prompt("Enter withdraw amount");
      if (amount) {
        try {
          const response = await withdrawAmount(accountId, amount);
          if (response) {
            alert("Withdraw successful");
            fetchAccounts();
          }
        } catch (error) {
          console.log(error);
          alert("Withdraw failed");
        }
      }
    });
  });
}

REFRESH_BUTTON.addEventListener("click", () => {
  fetchAccounts();
})

CONFIRM_DEPOSIT_BUTTON.addEventListener("click", async () => {
  try {
    await depositAmount(accountId, DEPOSIT_AMOUNT_INPUT.value);
    Swal.fire({
      title: "Depsit success!",
      text: "Your balance has been updated!",
      icon: "success"
    });
    DEPOSIT_AMOUNT_INPUT.value = "";
    fetchAccounts();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "An error happened",
      text: "Please try again later!",
    });
  }
});

window.onload = function () {
  fetchAccounts();
};
