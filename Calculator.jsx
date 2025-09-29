import React, { useState } from "react";
import { evaluate } from "mathjs"; // safer than eval

function Calculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");

  // Append value to expression
  const handleClick = (val) => {
    setExpr((prev) => prev + val);
  };

  // Clear expression
  const clear = () => {
    setExpr("");
    setResult("");
  };

  // Delete last character
  const backspace = () => {
    setExpr((prev) => prev.slice(0, -1));
  };

  // Compute result
  const compute = () => {
    if (!expr) return;
    try {
      const sanitized = expr.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
      const value = evaluate(sanitized);
      setResult(String(value));
      setExpr(String(value));
    } catch (err) {
      setResult("Error");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#2d2d2d",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
          width: "320px",
        }}
      >
        {/* Display */}
        <div
          style={{
            background: "#1c1c1c",
            color: "#fff",
            textAlign: "right",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            fontSize: "28px",
            minHeight: "60px",
            overflowX: "auto",
          }}
        >
          {expr || "0"}
          <div style={{ fontSize: "16px", color: "#bbb", marginTop: "8px" }}>
            {result}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
          }}
        >
          <button style={btnStyle("#f44336", "#fff")} onClick={clear}>
            C
          </button>
          <button style={btnStyle("#ff9800", "#fff")} onClick={backspace}>
            ⌫
          </button>
          <button style={btnStyle("#ff9800", "#fff")} onClick={() => handleClick("%")}>
            %
          </button>
          <button style={btnStyle("#ff9800", "#fff")} onClick={() => handleClick("/")}>
            ÷
          </button>

          <button style={btnStyle()} onClick={() => handleClick("7")}>
            7
          </button>
          <button style={btnStyle()} onClick={() => handleClick("8")}>
            8
          </button>
          <button style={btnStyle()} onClick={() => handleClick("9")}>
            9
          </button>
          <button style={btnStyle("#ff9800", "#fff")} onClick={() => handleClick("*")}>
            ×
          </button>

          <button style={btnStyle()} onClick={() => handleClick("4")}>
            4
          </button>
          <button style={btnStyle()} onClick={() => handleClick("5")}>
            5
          </button>
          <button style={btnStyle()} onClick={() => handleClick("6")}>
            6
          </button>
          <button style={btnStyle("#ff9800", "#fff")} onClick={() => handleClick("-")}>
            −
          </button>

          <button style={btnStyle()} onClick={() => handleClick("1")}>
            1
          </button>
          <button style={btnStyle()} onClick={() => handleClick("2")}>
            2
          </button>
          <button style={btnStyle()} onClick={() => handleClick("3")}>
            3
          </button>
          <button style={btnStyle("#ff9800", "#fff")} onClick={() => handleClick("+")}>
            +
          </button>

          <button style={btnStyle()} onClick={() => handleClick("0")}>
            0
          </button>
          <button style={btnStyle()} onClick={() => handleClick(".")}>
            .
          </button>
          <button
            style={{
              ...btnStyle("#4caf50", "#fff"),
              gridColumn: "span 2",
            }}
            onClick={compute}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable button style function
const btnStyle = (bg = "#3a3a3a", color = "#fff") => ({
  background: bg,
  color: color,
  padding: "20px",
  fontSize: "20px",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  transition: "all 0.2s",
  fontWeight: "bold",
});

export default Calculator;
