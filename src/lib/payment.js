export function getPaymentDetailsNote(paymentMethod, paymentDetails = {}) {
  if (paymentMethod === "Cash") return "";

  const provider = paymentDetails.provider?.trim();
  const reference = paymentDetails.reference?.trim();

  if (!provider || !reference) {
    const label = paymentMethod === "Card" ? "cardholder name and last four digits" : "bank/wallet and transaction reference";
    throw new Error(`Enter the ${label} before placing a ${paymentMethod.toLowerCase()} payment order.`);
  }

  if (paymentMethod === "Card") {
    if (!/^\d{4}$/.test(reference)) {
      throw new Error("Enter exactly the last four digits of the card. Do not enter the full card number.");
    }
    return `Card payment — Cardholder: ${provider}; Card ending: ${reference}`;
  }

  return `Online payment — Provider: ${provider}; Transaction reference: ${reference}`;
}
