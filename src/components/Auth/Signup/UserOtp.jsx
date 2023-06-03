
import OtpInput from "react-otp-input";
import { useState } from "react";

export default function App() {
  const [code, setCode] = useState("");

  const handleChange = (code) => setCode(code);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <OtpInput
        value={code}
        onChange={handleChange}
        numInputs={6}
        separator={<span style={{ width: "8px" }}></span>}
        isInputNum={true}
        shouldAutoFocus={true}
        inputStyle={{
          border: "1px solid transparent",
          borderRadius: "8px",
          width: "54px",
          height: "54px",
          fontSize: "12px",
          color: "#000",
          fontWeight: "400",
          caretColor: "blue"
        }}
        focusStyle={{
          border: "1px solid #CFD3DB",
          outline: "none"
        }}
      />
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
