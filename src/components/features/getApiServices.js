export const getApiService = () => {
    return fetch(
      "https://expense-tracker-19662-default-rtdb.firebaseio.com//expenses.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }