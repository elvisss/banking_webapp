const REFRESH_BUTTON = document.querySelector("#js-refresh")
const LOADER = document.querySelector("#loader");
const ACCOUNT_LIST_TABLE_BODY = document.querySelector("#accounts-table tbody");
const DEPOSIT_CONFIRM_BUTTON = document.querySelector("#confirm-deposit");
const DEPOSIT_AMOUNT_INPUT = document.querySelector("#deposit-amount");
const WITHDRAW_CONFIRM_BUTTON = document.querySelector("#confirm-withdraw");
const WITHDRAW_AMOUNT_INPUT = document.querySelector("#withdraw-amount");
let globalAccountId = null;

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
                <button data-account-id=${account.id} class="js-action-withdraw btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal2">Withdraw</button>
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
      globalAccountId = event.target.dataset.accountId;
    });
  });
}

function setWithdrawActions () {
  const withdrawButtons = document.querySelectorAll(".js-action-withdraw");
  withdrawButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      globalAccountId = event.target.dataset.accountId;
    });
  });
}

REFRESH_BUTTON.addEventListener("click", () => {
  fetchAccounts();
})

DEPOSIT_CONFIRM_BUTTON.addEventListener("click", async () => {
  try {
    await depositAmount(globalAccountId, DEPOSIT_AMOUNT_INPUT.value);
    Swal.fire({
      title: "Depsit success!",
      text: "Your balance has been updated!",
      icon: "success"
    });
    DEPOSIT_AMOUNT_INPUT.value = "";
    fetchAccounts();
  } catch (error) {
    console.error(error)
    Swal.fire({
      icon: "error",
      title: "An error happened",
      text: error.errorMessage || "Please try again later!",
    });
  }
});

WITHDRAW_CONFIRM_BUTTON.addEventListener("click", async () => {
  try {
    await withdrawAmount(globalAccountId, WITHDRAW_AMOUNT_INPUT.value);
    Swal.fire({
      title: "Withdraw success!",
      text: "Your balance has been updated!",
      icon: "success"
    });
    WITHDRAW_AMOUNT_INPUT.value = "";
    fetchAccounts();
  } catch (error) {
    console.error(error)
    Swal.fire({
      icon: "error",
      title: "An error happened",
      text: error.errorMessage || "Please try again later!",
    });
  }
})

window.onload = function () {
  fetchAccounts();
};
