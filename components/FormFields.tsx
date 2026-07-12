import { useState } from "react";
import { ChevronDown } from "lucide-react";


export function FieldLabel({ children }: { children: React.ReactNode }) {
  const C = {
    bg: "#FFFBE6",
    surface: "#FFFFFF",
    input: "#FFFBE6",
    text: "#0A0A0A",
    gray: "#666666",
    purple: "#6C63FF",
    yellow: "#FFD600",
    mint: "#00C897",
    coral: "#FF6B6B",
    black: "#000000",
    ink: "#000000",
    bd: "3px solid #000",
    bd2: "2px solid #000",
    sh: "4px 4px 0px #000",
    shSm: "2px 2px 0px #000",
    shLg: "6px 6px 0px #000",
    cream: "#FFFBE6",
    white: "#FFFFFF",
  };
  return (
    <label style={{
      display: "block", fontWeight: 700,
      fontSize: "0.72rem", textTransform: "uppercase" as const,
      letterSpacing: "0.09em", marginBottom: "6px",
      color: C.text,
    }}>
      {children}
    </label>
  );
}

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  style?: React.CSSProperties;
  textCenter?: boolean;
  required?: boolean;
}

export function BrutalInput({ label, name, type = "text", placeholder, defaultValue, style: sx, textCenter, required }: InputProps) {
  const C = {
    bg: "#FFFBE6",
    surface: "#FFFFFF",
    input: "#FFFBE6",
    text: "#0A0A0A",
    gray: "#666666",
    purple: "#6C63FF",
    yellow: "#FFD600",
    mint: "#00C897",
    coral: "#FF6B6B",
    black: "#000000",
    ink: "#000000",
    bd: "3px solid #000",
    bd2: "2px solid #000",
    sh: "4px 4px 0px #000",
    shSm: "2px 2px 0px #000",
    shLg: "6px 6px 0px #000",
    cream: "#FFFBE6",
    white: "#FFFFFF",
  };
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "14px" }}>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type} placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "10px 12px",
          border: C.bd, background: C.input, color: C.text,
          fontSize: "0.95rem",
          outline: "none", boxSizing: "border-box" as const,
          boxShadow: focused ? `3px 3px 0px ${C.purple}` : "none",
          transition: "box-shadow 0.15s",
          textAlign: textCenter ? "center" : "left",
          letterSpacing: textCenter ? "0.35em" : "normal",
          fontWeight: textCenter ? 800 : 400,
          ...sx,
        }}
      />
    </div>
  );
}

interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
}

export function BrutalTextarea({ label, name, placeholder, defaultValue }: TextareaProps) {
  const C = {
    bg: "#FFFBE6",
    surface: "#FFFFFF",
    input: "#FFFBE6",
    text: "#0A0A0A",
    gray: "#666666",
    purple: "#6C63FF",
    yellow: "#FFD600",
    mint: "#00C897",
    coral: "#FF6B6B",
    black: "#000000",
    ink: "#000000",
    bd: "3px solid #000",
    bd2: "2px solid #000",
    sh: "4px 4px 0px #000",
    shSm: "2px 2px 0px #000",
    shLg: "6px 6px 0px #000",
    cream: "#FFFBE6",
    white: "#FFFFFF",
  };
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "14px" }}>
      <FieldLabel>{label}</FieldLabel>
      <textarea name={name} placeholder={placeholder} rows={3}
        defaultValue={defaultValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "10px 12px",
          border: C.bd, background: C.input, color: C.text,
          fontSize: "0.95rem",
          outline: "none", resize: "vertical",
          boxSizing: "border-box" as const,
          boxShadow: focused ? `3px 3px 0px ${C.purple}` : "none",
          transition: "box-shadow 0.15s",
        }}
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}

export function BrutalSelect({ label, name, options, defaultValue }: SelectProps) {
  const C = {
    bg: "#FFFBE6",
    surface: "#FFFFFF",
    input: "#FFFBE6",
    text: "#0A0A0A",
    gray: "#666666",
    purple: "#6C63FF",
    yellow: "#FFD600",
    mint: "#00C897",
    coral: "#FF6B6B",
    black: "#000000",
    ink: "#000000",
    bd: "3px solid #000",
    bd2: "2px solid #000",
    sh: "4px 4px 0px #000",
    shSm: "2px 2px 0px #000",
    shLg: "6px 6px 0px #000",
    cream: "#FFFBE6",
    white: "#FFFFFF",
  };
  return (
    <div style={{ marginBottom: "14px" }}>
      <FieldLabel>{label}</FieldLabel>
      <div style={{ position: "relative" as const }}>
        <select
          name={name}
          defaultValue={defaultValue}
          style={{
            width: "100%", padding: "10px 12px",
            border: C.bd, background: C.input, color: C.text,
            fontSize: "0.95rem",
            outline: "none", appearance: "none" as const,
            cursor: "pointer",
          }}
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown
          size={16}
          style={{ position: "absolute" as const, right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" as const, color: C.text }}
        />
      </div>
    </div>
  );
}
