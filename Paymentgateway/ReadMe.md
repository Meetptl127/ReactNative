. Importing Dependencies
javascript
Copy
import React from "react";
import { Button, View, Alert } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
React:
Used to create components and manage the UI.

Button, View, Alert (from react-native):

View: Container that holds and positions the elements in your UI.
Button: A simple clickable button that triggers the payment process.
Alert: Used to show pop-up messages (e.g., to notify the user about payment success or failure).
RazorpayCheckout:
A module that enables Razorpay's payment gateway in React Native apps. It handles the opening of the Razorpay checkout screen and processing of payments.

2. Creating the PaymentScreen Component
   javascript
   Copy
   const PaymentScreen = () => {
   // ...
   };
   This functional component represents the screen where users can initiate a payment. In React Native, components like this are the building blocks of your app's UI.
3. The handlePayment Function
   javascript
   Copy
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
Breakdown of handlePayment:
Logging Payment Initiation:

javascript
Copy
console.log("Payment initiated");
This logs a message in the console to indicate that the payment process has started.

Defining the options Object:
The options object holds all the parameters needed for the Razorpay checkout:

description:
A short description for the payment (e.g., "Test Payment").

image:
A URL to your company's logo. This image is displayed on the payment screen.

currency:
The currency code. Here it is set to "INR" for Indian Rupees.

key:
Your Razorpay API key. This key is necessary for authentication and ensuring that the payment request is coming from an authorized source.

amount:
The amount to be paid, specified in the smallest unit of the currency. For INR, ₹100.00 is represented as "10000" (because 1 INR = 100 paise).

name:
The name of your company or application.

prefill:
An object that contains default user information to prepopulate the payment form:

email: User's email address.
contact: User's phone number.
name: User's full name.
theme:
Customization options for the appearance of the checkout screen. Here, the color is set to #53a20e.

Initiating Razorpay Checkout:

javascript
Copy
RazorpayCheckout.open(options)
.then((data) => { ... })
.catch((error) => { ... });
RazorpayCheckout.open(options):
Opens the Razorpay payment modal with the specified options.

Success Callback (then):
If the payment is successful:

Logs the payment success data.
Displays an alert showing the payment ID (data.razorpay_payment_id).
Error Callback (catch):
If the payment fails:

Logs the error details.
Displays an alert with the error description. 4. Rendering the UI
javascript
Copy
return (
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
<Button title="Pay ₹100" onPress={handlePayment} />
</View>
);
View Container:
The <View> is used as a container to center the button on the screen:

flex: 1: Occupies the full screen.
justifyContent: "center": Vertically centers the content.
alignItems: "center": Horizontally centers the content.
Button:

title: Displays the text "Pay ₹100".
onPress: When the button is pressed, it calls the handlePayment function, initiating the payment process. 5. Exporting the Component
javascript
Copy
export default PaymentScreen;
This line exports the PaymentScreen component so that it can be imported and used in other parts of your application.
Summary
Component Structure:
The PaymentScreen component is self-contained, handling both UI rendering and the payment process.

Payment Process:
When the button is pressed, the handlePayment function is triggered. This function configures the payment parameters (amount, currency, prefill data, etc.) and opens the Razorpay checkout modal using the RazorpayCheckout.open method.

Legacy Integration:
By omitting the order_id, the code uses Razorpay's legacy payment integration. While this might work for simple payment flows, keep in mind that using an order ID (generated on the server) is recommended for enhanced security and tracking.
