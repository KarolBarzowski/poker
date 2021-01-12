export const getErrorDescription = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email is already taken!";
    case "auth/invalid-email":
      return "Invalid email!";
    case "auth/operation-not-allowed":
      return "Error!";
    case "auth/weak-password":
      return "Password min. 6 characters!";
    case "auth/user-disabled":
      return "Account is disabled!";
    case "auth/wrong-password":
      return "Wrong password!";
    case "auth/user-not-found":
      return "Wrong password!";
    default:
      break;
  }
};

export const getLabel = (value) => {
  return Math.abs(value) > 999
    ? `${Math.sign(value) * (Math.abs(value) / 1000).toFixed(1)}k`
    : Math.sign(value) * Math.abs(value);
};
