import React from "react";

const FEATURES = [
  {
    title: "Case Conversion",
    color: "primary",
    items: [
      "UPPERCASE / lowercase",
      "Title Case / Sentence case",
      "camelCase / PascalCase",
      "snake_case / kebab-case",
      "CONSTANT_CASE / dot.case",
      "aLtErNaTe CaSe / Inverse Case",
    ],
  },
  {
    title: "Whitespace & Formatting",
    color: "secondary",
    items: [
      "Remove extra / all spaces",
      "Trim each line",
      "Remove blank lines",
      "Remove line breaks",
      "Double spacing",
      "Wrap text at 80 characters",
    ],
  },
  {
    title: "Lines",
    color: "success",
    items: [
      "Sort A → Z / Z → A",
      "Sort by line length",
      "Reverse lines",
      "Remove duplicate lines",
      "Add / remove line numbers",
      "Shuffle lines randomly",
    ],
  },
  {
    title: "Transformations",
    color: "primary",
    items: [
      "Reverse text",
      "Remove numbers / special chars",
      "Strip punctuation",
      "Remove HTML tags",
      "Convert to URL slug",
      "ROT13 cipher",
      "Remove duplicate words",
      "Add bullets / wrap in quotes",
    ],
  },
  {
    title: "Extract & Analyze",
    color: "info",
    items: [
      "Extract emails",
      "Extract URLs",
      "Extract numbers",
      "Extract phone numbers",
      "Extract hashtags & mentions",
      "Word frequency analysis",
      "Character frequency analysis",
    ],
  },
  {
    title: "Encode / Decode",
    color: "dark",
    items: [
      "Base64 encode / decode",
      "URL encode / decode",
      "HTML entity encode / decode",
    ],
  },
  {
    title: "Find & Replace",
    color: "danger",
    items: [
      "Plain-text find & replace",
      "Regex-powered find & replace",
    ],
  },
  {
    title: "Prefix & Suffix",
    color: "warning",
    items: ["Add custom prefix/suffix to every line"],
  },
  {
    title: "Generate",
    color: "secondary",
    items: [
      "Lorem ipsum (1–5 paragraphs)",
      "Repeat text N times",
    ],
  },
];

export default function About({ mode }) {
  const isDark = mode === "dark";
  const cardStyle = isDark
    ? { backgroundColor: "#161b22", borderColor: "#30363d", color: "#e6edf3" }
    : {};

  return (
    <div
      className="py-4"
      style={{ color: isDark ? "#e6edf3" : "#1a1a2e", maxWidth: 1000, margin: "0 auto" }}
    >
      <h4 className="fw-bold mb-1">About TextUtils</h4>
      <p className="text-secondary mb-4">
        A free, client-side text manipulation toolkit. All processing happens in your
        browser — nothing is ever sent to a server.
      </p>

      <div className="row g-3">
        {FEATURES.map(({ title, color, items }) => (
          <div key={title} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100" style={cardStyle}>
              <div className="card-body">
                <h6 className="card-title d-flex align-items-center gap-2 mb-3">
                  <span className={`badge bg-${color}`} style={{ fontSize: "0.65rem" }}>
                    {title}
                  </span>
                </h6>
                <ul className="list-unstyled mb-0 small">
                  {items.map((item) => (
                    <li key={item} className="mb-1">
                      <span className="text-secondary me-1">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="card mt-4"
        style={cardStyle}
      >
        <div className="card-body small text-secondary">
          <strong style={{ color: isDark ? "#e6edf3" : "#1a1a2e" }}>Stats tracked:</strong>{" "}
          Word count · Character count (with and without spaces) · Line count · Sentence count ·
          Paragraph count · Unique word count · Average word length · Estimated reading time ·
          Estimated speaking time
        </div>
      </div>
    </div>
  );
}
