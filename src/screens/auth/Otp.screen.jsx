// import { View, Text, StyleSheet, Image } from "react-native";
// import React, { useState, useEffect } from "react";
// import OTPInputView from "@twotalltotems/react-native-otp-input";
// import {
//   getHash,
//   startOtpListener,
//   useOtpVerify,
// } from "react-native-otp-verify";

// const OtpScreen = () => {
// //   const [otp, setOtp] = useState("");
//   const [code, setCode] = useState("");
//   const { hash, otp, message, timeoutError, stopListener, startListener } = useOtpVerify({numberOfDigits: 4});
//     useEffect(() => {
//       getHash().then(hash => {
//         // use this hash in the message.
//       }).catch(console.log);

//       startOtpListener(message => {
//         // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
//         const otp = /(\d{4})/g.exec(message)[1];
//         setOtp(otp);
//       });
//       return () => removeListener();
//     }, []);
//   return (
//     <View className="flex-1 bg-black justify-start items-center pt-16">
//       <View className="flex justify-end mb-4">
//         <Image
//           className="w-80 h-16"
//           source={require("../../assets/logo.png")}
//         />
//       </View>
//       <View className="text-white text-base">
//         <Text>Please enter the 6-digit code to SignUp</Text>
//         <OTPInputView
//           style={{ width: "60%", height: 100}}
//           pinCount={6}
//           code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
//           onCodeChanged={(code) => {
//             setCode(code);
//           }}
//           autoFocusOnLoad
//           codeInputFieldStyle={styles.underlineStyleBase}
//           codeInputHighlightStyle={styles.underlineStyleHighLighted}
//           onCodeFilled={(code) => {
//             console.log(`Code is ${code}, you are good to go!`);
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// export default OtpScreen;
// const styles = StyleSheet.create({
//   borderStyleBase: {
//     width: 30,
//     height: 45,
//   },

//   borderStyleHighLighted: {
//     borderColor: "#03DAC6",
//   },

//   underlineStyleBase: {
//     width: 30,
//     height: 45,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//   },

//   underlineStyleHighLighted: {
//     borderColor: "#03DAC6",
//   },
// });
