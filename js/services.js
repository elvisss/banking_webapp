const BASE_URL = "http://localhost:8080/api";

async function getAccounts() {
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
    throw error
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
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
    throw error
  }
}
