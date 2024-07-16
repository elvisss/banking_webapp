const BASE_URL = "http://localhost:8080/api";

async function getAccounts() {
  //   const url = "http://localhost:8080/api/accounts";
  const url = `${BASE_URL}/accounts`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function depositAmount(accountId, amount) {
  const url = `${BASE_URL}/accounts/${accountId}/deposit`;
  const body = {
    amount: amount,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(body),
    //   body: body,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function renderAccounts() {
  const accounts = await getAccounts();
  const accountList = document.querySelector("#accounts-table tbody");

  let rowHTML = "";

  accounts.forEach((account) => {
    rowHTML += `
        <tr>
            <td>${account.id}</td>
            <td>${account.accountHolderName}</td>
            <td>${account.balance}</td>
            <td><button data-account-id=${account.id} class="js-actions btn btn-primary">Deposit</button></td>
        </tr>
      `;
  });

  accountList.innerHTML = rowHTML;
}

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

        // const url = `${BASE_URL}/accounts/${accountId}/deposit`;
        // const response = await fetch(url, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ amount: depositAmount }),
        // });
        // if (response.ok) {
        //   alert("Deposit successful");
        //   location.reload();
        // } else {
        //   alert("Deposit failed");
        // }
      }
    });
  });
};
