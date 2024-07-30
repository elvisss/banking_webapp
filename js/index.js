const BASE_URL = "http://localhost:8080/api";

const refreshButton = document.querySelector("#js-refresh")
const loader = document.querySelector("#loader");

async function renderAccounts() {
  loader.style.display = "block";
  try {
    const accounts = await getAccounts();
    const accountList = document.querySelector("#accounts-table tbody");
  
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
  
    accountList.innerHTML = rowHTML;
  } catch (e) {
    console.log(e)
  } finally {
    loader.style.display = "none";
  }
}

refreshButton.addEventListener("click", () => {
  renderAccounts();
})

window.onload = async function exampleFunction() {
  await renderAccounts();

  const depositButtons = document.querySelectorAll(".js-actions");
  depositButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const accountId = event.target.dataset.accountId;
      const amount = prompt("Enter deposit amount");
      if (amount) {
        try {
          const response = await depositAmount(accountId, amount);
          if (response) {
            alert("Deposit successful");
            location.reload();
          }
        } catch (error) {
          console.log(error);
          alert("Deposit failed");
        }
      }
    });
  });
};
