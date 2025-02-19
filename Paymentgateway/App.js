import React from "react";
import { Button, View, Alert } from "react-native";
import RazorpayCheckout from "react-native-razorpay";

const PaymentScreen = () => {
  const handlePayment = () => {
    console.log("Payment initiated");

    const options = {
      description: "Test Payment",
      image: "https://your-logo-url.com/logo.png",
      currency: "INR",
      key: "rzp_test_LidYBE3ykdRLqm", // Replace with your test key
      amount: "10000", // ₹100.00 (in paise)
      name: "Your Company Name",
      // Removed the order_id field for legacy integration
      prefill: {
        email: "user@example.com",
        contact: "9191919191",
        name: "John Doe",
      },
      theme: { color: "#53a20e" },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        console.log("Payment Success:", data);
        Alert.alert("Success", `Payment ID: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        console.log("Payment Error:", error);
        Alert.alert("Error", `Payment Failed: ${error.description}`);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Pay ₹100" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;
