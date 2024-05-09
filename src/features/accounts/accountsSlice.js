const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdrawl":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return { ...state };
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    case "account/currencyConverting":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return { ...state };
  }
}

export const deposit = function (amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };

  return async function (dispatch, getState) {
    dispatch({ type: "account/currencyConverting" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    console.log(data.rates.USD);
    dispatch({ type: "account/deposit", payload: data.rates.USD });
  };
};

export const withdraw = function (amount) {
  return {
    type: "account/withdrawl",
    payload: amount,
  };
};

export const requestLoan = function (amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
};

export const payLoan = function () {
  return {
    type: "account/payLoan",
  };
};
