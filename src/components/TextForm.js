import React, { useState } from "react";

const LOREM_PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.",
];

function Section({ title, color, isDark, children }) {
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center gap-2 mb-2">
        <span
          className={`badge bg-${color}`}
          style={{ fontSize: "0.65rem", letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          {title}
        </span>
        <hr
          className="flex-grow-1 m-0"
          style={{ borderColor: isDark ? "#30363d" : "#d0d7de" }}
        />
      </div>
      {children}
    </div>
  );
}

function BtnRow({ buttons, variant, disabled }) {
  return (
    <div className="d-flex flex-wrap gap-1">
      {buttons.map(([label, fn]) => (
        <button
          key={label}
          className={`btn btn-sm btn-${variant}`}
          onClick={fn}
          disabled={disabled}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function TextForm({ heading, mode, showAlert }) {
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  const [findVal, setFindVal] = useState("");
  const [replaceVal, setReplaceVal] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [prefixVal, setPrefixVal] = useState("");
  const [suffixVal, setSuffixVal] = useState("");
  const [loremCount, setLoremCount] = useState(1);
  const [repeatCount, setRepeatCount] = useState(3);
  const [result, setResult] = useState(null);

  const isDark = mode === "dark";

  const inputStyle = {
    backgroundColor: isDark ? "#161b22" : "#fff",
    color: isDark ? "#e6edf3" : "#1a1a2e",
    border: `1px solid ${isDark ? "#30363d" : "#d0d7de"}`,
  };

  const statPillStyle = {
    backgroundColor: isDark ? "#21262d" : "#f6f8fa",
    border: `1px solid ${isDark ? "#30363d" : "#d0d7de"}`,
    fontSize: "0.78rem",
  };

  const push = (newText, msg) => {
    setHistory((h) => [...h.slice(-19), text]);
    setText(newText);
    if (msg) showAlert("success", msg);
  };

  const undo = () => {
    if (!history.length) return;
    setText(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
    showAlert("success", "Undo");
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    showAlert("success", "Copied to clipboard");
  };

  const handlePaste = async () => {
    try {
      const t = await navigator.clipboard.readText();
      push(t, "Pasted from clipboard");
    } catch {
      showAlert("danger", "Clipboard access denied — paste manually");
    }
  };

  const handleClear = () => {
    if (!text) return;
    setHistory((h) => [...h.slice(-19), text]);
    setText("");
    showAlert("success", "Cleared");
  };

  // ── CASE CONVERSION ──────────────────────────────────────────
  const toUpper = () => push(text.toUpperCase(), "UPPERCASE");
  const toLower = () => push(text.toLowerCase(), "lowercase");
  const toTitle = () =>
    push(
      text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
      "Title Case"
    );
  const toSentence = () =>
    push(
      text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase()),
      "Sentence case"
    );
  const toCamel = () =>
    push(
      text
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
      "camelCase"
    );
  const toPascal = () => {
    const camel = text
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
    push(camel.charAt(0).toUpperCase() + camel.slice(1), "PascalCase");
  };
  const toSnake = () =>
    push(
      text
        .trim()
        .toLowerCase()
        .replace(/[\s\W]+/g, "_")
        .replace(/^_|_$/g, ""),
      "snake_case"
    );
  const toKebab = () =>
    push(
      text
        .trim()
        .toLowerCase()
        .replace(/[\s\W]+/g, "-")
        .replace(/^-|-$/g, ""),
      "kebab-case"
    );
  const toConstant = () =>
    push(
      text
        .trim()
        .toUpperCase()
        .replace(/[\s\W]+/g, "_")
        .replace(/^_|_$/g, ""),
      "CONSTANT_CASE"
    );
  const toDot = () =>
    push(
      text
        .trim()
        .toLowerCase()
        .replace(/[\s\W]+/g, ".")
        .replace(/^\.|\.$/g, ""),
      "dot.case"
    );
  const toAlternate = () =>
    push(
      text
        .split("")
        .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
        .join(""),
      "aLtErNaTe CaSe"
    );
  const toInverse = () =>
    push(
      text
        .split("")
        .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join(""),
      "iNVERSE cASE"
    );

  // ── WHITESPACE & FORMATTING ──────────────────────────────────
  const removeExtraSpaces = () =>
    push(text.replace(/[ \t]+/g, " ").trim(), "Extra spaces removed");
  const removeAllSpaces = () => push(text.replace(/[ \t]/g, ""), "All spaces removed");
  const trimLines = () =>
    push(
      text
        .split("\n")
        .map((l) => l.trim())
        .join("\n"),
      "Lines trimmed"
    );
  const removeBlankLines = () =>
    push(
      text
        .split("\n")
        .filter((l) => l.trim())
        .join("\n"),
      "Blank lines removed"
    );
  const removeLineBreaks = () =>
    push(text.replace(/\n+/g, " ").trim(), "Line breaks removed");
  const addDoubleSpacing = () =>
    push(
      text
        .split("\n")
        .join("\n\n")
        .replace(/\n{3,}/g, "\n\n"),
      "Double spaced"
    );
  const wrapAt80 = () => {
    const wrapped = text
      .split("\n")
      .map((line) => {
        if (line.length <= 80) return line;
        const words = line.split(" ");
        let out = "";
        let cur = "";
        words.forEach((w) => {
          const candidate = cur ? cur + " " + w : w;
          if (candidate.length <= 80) {
            cur = candidate;
          } else {
            out += (out ? "\n" : "") + cur;
            cur = w;
          }
        });
        if (cur) out += (out ? "\n" : "") + cur;
        return out;
      })
      .join("\n");
    push(wrapped, "Wrapped at 80 chars");
  };

  // ── LINES ────────────────────────────────────────────────────
  const sortAZ = () =>
    push(
      text
        .split("\n")
        .sort((a, b) => a.localeCompare(b))
        .join("\n"),
      "Sorted A → Z"
    );
  const sortZA = () =>
    push(
      text
        .split("\n")
        .sort((a, b) => b.localeCompare(a))
        .join("\n"),
      "Sorted Z → A"
    );
  const sortByLength = () =>
    push(
      text
        .split("\n")
        .sort((a, b) => a.length - b.length)
        .join("\n"),
      "Sorted by length"
    );
  const reverseLines = () =>
    push(text.split("\n").reverse().join("\n"), "Lines reversed");
  const removeDupLines = () =>
    push([...new Set(text.split("\n"))].join("\n"), "Duplicate lines removed");
  const addLineNums = () =>
    push(
      text
        .split("\n")
        .map((l, i) => `${i + 1}. ${l}`)
        .join("\n"),
      "Line numbers added"
    );
  const removeLineNums = () =>
    push(
      text
        .split("\n")
        .map((l) => l.replace(/^\s*\d+[.)]\s*/, ""))
        .join("\n"),
      "Line numbers removed"
    );
  const shuffleLines = () => {
    const lines = text.split("\n");
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    push(lines.join("\n"), "Lines shuffled");
  };

  // ── PREFIX & SUFFIX ──────────────────────────────────────────
  const applyPrefixSuffix = () => {
    if (!prefixVal && !suffixVal)
      return showAlert("danger", "Enter a prefix or suffix first");
    push(
      text
        .split("\n")
        .map((l) => prefixVal + l + suffixVal)
        .join("\n"),
      "Prefix/suffix applied"
    );
  };

  // ── FIND & REPLACE ───────────────────────────────────────────
  const findReplace = () => {
    if (!findVal) return showAlert("danger", "Enter text to find");
    try {
      const pattern = useRegex ? new RegExp(findVal, "g") : null;
      const count = useRegex
        ? (text.match(new RegExp(findVal, "g")) || []).length
        : text.split(findVal).length - 1;
      const newText = useRegex
        ? text.replace(pattern, replaceVal)
        : text.split(findVal).join(replaceVal);
      push(newText, `Replaced ${count} occurrence${count !== 1 ? "s" : ""}`);
    } catch {
      showAlert("danger", "Invalid regex pattern");
    }
  };

  // ── TRANSFORMATIONS ──────────────────────────────────────────
  const reverseText = () => push(text.split("").reverse().join(""), "Text reversed");
  const removeNums = () => push(text.replace(/[0-9]/g, ""), "Numbers removed");
  const removeSpecial = () =>
    push(text.replace(/[^a-zA-Z0-9\s\n]/g, ""), "Special characters removed");
  const stripPunct = () =>
    push(text.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, ""), "Punctuation stripped");
  const removeHtml = () => push(text.replace(/<[^>]*>/g, ""), "HTML tags removed");
  const toSlug = () =>
    push(
      text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-"),
      "Slug generated"
    );
  const rot13 = () =>
    push(
      text.replace(/[a-zA-Z]/g, (c) => {
        const base = c <= "Z" ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
      }),
      "ROT13 applied"
    );
  const removeDupWords = () =>
    push(
      text
        .split("\n")
        .map((line) => [...new Set(line.split(/\s+/).filter(Boolean))].join(" "))
        .join("\n"),
      "Duplicate words removed per line"
    );
  const wrapInQuotes = () => push(`"${text}"`, 'Wrapped in "quotes"');
  const addBullets = () =>
    push(
      text
        .split("\n")
        .map((l) => (l.trim() ? `• ${l}` : l))
        .join("\n"),
      "Bullets added"
    );

  // ── EXTRACT & ANALYZE ────────────────────────────────────────
  const doExtract = (title, regex, join = "\n") => {
    if (!text) return showAlert("danger", "No text to extract from");
    const matches = [...new Set(text.match(regex) || [])];
    setResult({
      title,
      content: matches.length ? matches.join(join) : `No ${title.toLowerCase()} found`,
    });
  };

  const extractEmails = () =>
    doExtract("Emails", /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
  const extractUrls = () => doExtract("URLs", /https?:\/\/[^\s<>"']+/g);
  const extractNumbers = () => doExtract("Numbers", /-?\d+(\.\d+)?/g, ", ");
  const extractPhones = () =>
    doExtract(
      "Phone Numbers",
      /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g
    );
  const extractHashtags = () => doExtract("Hashtags", /#\w+/g, " ");
  const extractMentions = () => doExtract("Mentions", /@\w+/g, " ");

  const wordFreq = () => {
    if (!text) return showAlert("danger", "No text");
    const freq = {};
    text
      .toLowerCase()
      .split(/\W+/)
      .filter(Boolean)
      .forEach((w) => {
        freq[w] = (freq[w] || 0) + 1;
      });
    const top = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([w, c]) => `${w}: ${c}`)
      .join("\n");
    setResult({ title: "Word Frequency (Top 30)", content: top || "No words" });
  };

  const charFreq = () => {
    if (!text) return showAlert("danger", "No text");
    const freq = {};
    text
      .split("")
      .filter((c) => c !== "\n")
      .forEach((c) => {
        const key = c === " " ? "SPACE" : c;
        freq[key] = (freq[key] || 0) + 1;
      });
    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([c, n]) => `'${c}': ${n}`)
      .join("\n");
    setResult({ title: "Character Frequency", content: sorted || "No characters" });
  };

  // ── ENCODE / DECODE ──────────────────────────────────────────
  const b64Encode = () => {
    try {
      push(btoa(unescape(encodeURIComponent(text))), "Base64 encoded");
    } catch {
      showAlert("danger", "Cannot encode — text may contain invalid characters");
    }
  };
  const b64Decode = () => {
    try {
      push(decodeURIComponent(escape(atob(text.trim()))), "Base64 decoded");
    } catch {
      showAlert("danger", "Invalid Base64 string");
    }
  };
  const urlEncode = () => push(encodeURIComponent(text), "URL encoded");
  const urlDecode = () => {
    try {
      push(decodeURIComponent(text), "URL decoded");
    } catch {
      showAlert("danger", "Invalid URL-encoded string");
    }
  };
  const htmlEncode = () =>
    push(
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;"),
      "HTML encoded"
    );
  const htmlDecode = () =>
    push(
      text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'"),
      "HTML decoded"
    );

  // ── GENERATE ─────────────────────────────────────────────────
  const insertLorem = () => {
    const paras = LOREM_PARAGRAPHS.slice(0, loremCount).join("\n\n");
    push(text ? text + "\n\n" + paras : paras, `Lorem ipsum added (${loremCount} paragraph${loremCount > 1 ? "s" : ""})`);
  };
  const doRepeat = () => {
    if (!text) return showAlert("danger", "No text to repeat");
    const n = Math.max(2, Math.min(100, Number(repeatCount)));
    push(Array(n).fill(text).join("\n"), `Repeated ×${n}`);
  };

  // ── STATS ────────────────────────────────────────────────────
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const lines = text ? text.split("\n").length : 0;
  const sentences = text ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
  const paragraphs = text ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  const uniqueWords = new Set(text.toLowerCase().split(/\W+/).filter(Boolean)).size;
  const avgWordLen =
    words > 0
      ? (
          text
            .split(/\s+/)
            .filter(Boolean)
            .reduce((s, w) => s + w.replace(/\W/g, "").length, 0) / words
        ).toFixed(1)
      : 0;
  const readTime = (words / 200).toFixed(1);
  const speakTime = (words / 130).toFixed(1);

  const noText = !text;

  return (
    <div
      className="py-2"
      style={{ color: isDark ? "#e6edf3" : "#1a1a2e" }}
    >
      <h4 className="mb-3 fw-bold">{heading}</h4>

      {/* ── Textarea ── */}
      <div className="mb-2">
        <textarea
          className="form-control font-monospace"
          rows="12"
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ ...inputStyle, fontSize: "0.9rem", resize: "vertical", lineHeight: 1.6 }}
        />
      </div>

      {/* ── Stats bar ── */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {[
          ["Words", words],
          ["Chars", chars],
          ["Chars (no spaces)", charsNoSpaces],
          ["Lines", lines],
          ["Sentences", sentences],
          ["Paragraphs", paragraphs],
          ["Unique words", uniqueWords],
          ["Avg word length", avgWordLen],
          ["Read time", `${readTime} min`],
          ["Speak time", `${speakTime} min`],
        ].map(([label, val]) => (
          <span key={label} className="px-2 py-1 rounded" style={statPillStyle}>
            <strong>{val}</strong>{" "}
            <span className="text-secondary">{label}</span>
          </span>
        ))}
      </div>

      {/* ── Quick actions ── */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        <button className="btn btn-sm btn-success" onClick={handleCopy} disabled={noText}>
          Copy
        </button>
        <button className="btn btn-sm btn-info" onClick={handlePaste}>
          Paste
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleClear} disabled={noText}>
          Clear
        </button>
        <button
          className="btn btn-sm btn-secondary"
          onClick={undo}
          disabled={!history.length}
        >
          Undo {history.length > 0 && `(${history.length})`}
        </button>
      </div>

      {/* ── Case Conversion ── */}
      <Section title="Case Conversion" color="primary" isDark={isDark}>
        <BtnRow
          variant="outline-primary"
          disabled={noText}
          buttons={[
            ["UPPERCASE", toUpper],
            ["lowercase", toLower],
            ["Title Case", toTitle],
            ["Sentence case", toSentence],
            ["camelCase", toCamel],
            ["PascalCase", toPascal],
            ["snake_case", toSnake],
            ["kebab-case", toKebab],
            ["CONSTANT_CASE", toConstant],
            ["dot.case", toDot],
            ["aLtErNaTe", toAlternate],
            ["Inverse Case", toInverse],
          ]}
        />
      </Section>

      {/* ── Whitespace ── */}
      <Section title="Whitespace & Formatting" color="secondary" isDark={isDark}>
        <BtnRow
          variant="outline-secondary"
          disabled={noText}
          buttons={[
            ["Remove Extra Spaces", removeExtraSpaces],
            ["Remove All Spaces", removeAllSpaces],
            ["Trim Each Line", trimLines],
            ["Remove Blank Lines", removeBlankLines],
            ["Remove Line Breaks", removeLineBreaks],
            ["Double Space", addDoubleSpacing],
            ["Wrap at 80 Chars", wrapAt80],
          ]}
        />
      </Section>

      {/* ── Lines ── */}
      <Section title="Lines" color="success" isDark={isDark}>
        <BtnRow
          variant="outline-success"
          disabled={noText}
          buttons={[
            ["Sort A → Z", sortAZ],
            ["Sort Z → A", sortZA],
            ["Sort by Length", sortByLength],
            ["Reverse Lines", reverseLines],
            ["Remove Duplicates", removeDupLines],
            ["Add Line Numbers", addLineNums],
            ["Remove Line Numbers", removeLineNums],
            ["Shuffle Lines", shuffleLines],
          ]}
        />
      </Section>

      {/* ── Prefix & Suffix ── */}
      <Section title="Prefix & Suffix" color="warning" isDark={isDark}>
        <div className="d-flex gap-2 flex-wrap align-items-center">
          <input
            className="form-control form-control-sm"
            style={{ maxWidth: 170, ...inputStyle }}
            placeholder="Prefix each line..."
            value={prefixVal}
            onChange={(e) => setPrefixVal(e.target.value)}
          />
          <input
            className="form-control form-control-sm"
            style={{ maxWidth: 170, ...inputStyle }}
            placeholder="Suffix each line..."
            value={suffixVal}
            onChange={(e) => setSuffixVal(e.target.value)}
          />
          <button
            className="btn btn-sm btn-warning"
            onClick={applyPrefixSuffix}
            disabled={noText}
          >
            Apply to Each Line
          </button>
        </div>
      </Section>

      {/* ── Find & Replace ── */}
      <Section title="Find & Replace" color="danger" isDark={isDark}>
        <div className="d-flex gap-2 flex-wrap align-items-center">
          <input
            className="form-control form-control-sm"
            style={{ maxWidth: 190, ...inputStyle }}
            placeholder="Find..."
            value={findVal}
            onChange={(e) => setFindVal(e.target.value)}
          />
          <input
            className="form-control form-control-sm"
            style={{ maxWidth: 190, ...inputStyle }}
            placeholder="Replace with..."
            value={replaceVal}
            onChange={(e) => setReplaceVal(e.target.value)}
          />
          <div className="form-check form-switch mb-0 d-flex align-items-center gap-1">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              id="regexSwitch"
              checked={useRegex}
              onChange={(e) => setUseRegex(e.target.checked)}
            />
            <label
              className="form-check-label small"
              htmlFor="regexSwitch"
              style={{ color: isDark ? "#8b949e" : "#57606a" }}
            >
              Regex
            </label>
          </div>
          <button
            className="btn btn-sm btn-danger"
            onClick={findReplace}
            disabled={noText}
          >
            Replace All
          </button>
        </div>
      </Section>

      {/* ── Transformations ── */}
      <Section title="Transformations" color="primary" isDark={isDark}>
        <BtnRow
          variant="outline-primary"
          disabled={noText}
          buttons={[
            ["Reverse Text", reverseText],
            ["Remove Numbers", removeNums],
            ["Remove Special Chars", removeSpecial],
            ["Strip Punctuation", stripPunct],
            ["Remove HTML Tags", removeHtml],
            ["Convert to Slug", toSlug],
            ["ROT13", rot13],
            ["Remove Duplicate Words", removeDupWords],
            ["Wrap in Quotes", wrapInQuotes],
            ["Add Bullets", addBullets],
          ]}
        />
      </Section>

      {/* ── Extract & Analyze ── */}
      <Section title="Extract & Analyze" color="info" isDark={isDark}>
        <BtnRow
          variant="outline-info"
          disabled={noText}
          buttons={[
            ["Extract Emails", extractEmails],
            ["Extract URLs", extractUrls],
            ["Extract Numbers", extractNumbers],
            ["Extract Phone Numbers", extractPhones],
            ["Extract Hashtags", extractHashtags],
            ["Extract Mentions", extractMentions],
            ["Word Frequency", wordFreq],
            ["Char Frequency", charFreq],
          ]}
        />
      </Section>

      {/* ── Encode / Decode ── */}
      <Section title="Encode / Decode" color="dark" isDark={isDark}>
        <BtnRow
          variant={isDark ? "outline-light" : "outline-dark"}
          disabled={noText}
          buttons={[
            ["Base64 Encode", b64Encode],
            ["Base64 Decode", b64Decode],
            ["URL Encode", urlEncode],
            ["URL Decode", urlDecode],
            ["HTML Encode", htmlEncode],
            ["HTML Decode", htmlDecode],
          ]}
        />
      </Section>

      {/* ── Generate ── */}
      <Section title="Generate" color="secondary" isDark={isDark}>
        <div className="d-flex gap-3 flex-wrap align-items-center">
          <div className="d-flex align-items-center gap-2">
            <select
              className="form-select form-select-sm"
              style={{ width: 80, ...inputStyle }}
              value={loremCount}
              onChange={(e) => setLoremCount(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <button className="btn btn-sm btn-outline-secondary" onClick={insertLorem}>
              Lorem Ipsum
            </button>
            <span className="small text-secondary">paragraph{loremCount > 1 ? "s" : ""}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <input
              type="number"
              className="form-control form-control-sm"
              style={{ width: 75, ...inputStyle }}
              min={2}
              max={100}
              value={repeatCount}
              onChange={(e) => setRepeatCount(e.target.value)}
            />
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={doRepeat}
              disabled={noText}
            >
              Repeat Text
            </button>
            <span className="small text-secondary">times</span>
          </div>
        </div>
      </Section>

      {/* ── Extract result panel ── */}
      {result && (
        <div
          className="card mb-4"
          style={
            isDark
              ? { backgroundColor: "#161b22", borderColor: "#30363d", color: "#e6edf3" }
              : {}
          }
        >
          <div className="card-header d-flex justify-content-between align-items-center py-2">
            <strong className="small">{result.title}</strong>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-primary py-0 px-2"
                style={{ fontSize: "0.75rem" }}
                onClick={() => {
                  push(result.content, "Extracted result moved to input");
                  setResult(null);
                }}
              >
                Use as Input
              </button>
              <button
                className="btn btn-sm btn-outline-secondary py-0 px-2"
                style={{ fontSize: "0.75rem" }}
                onClick={() => {
                  navigator.clipboard.writeText(result.content);
                  showAlert("success", "Result copied");
                }}
              >
                Copy
              </button>
              <button
                className="btn btn-sm btn-outline-secondary py-0 px-2"
                style={{ fontSize: "0.75rem" }}
                onClick={() => setResult(null)}
              >
                ✕
              </button>
            </div>
          </div>
          <div className="card-body p-2">
            <textarea
              className="form-control form-control-sm font-monospace"
              rows="6"
              readOnly
              value={result.content}
              style={inputStyle}
            />
          </div>
        </div>
      )}

      {/* ── Preview ── */}
      <Section title="Preview" color="secondary" isDark={isDark}>
        <div
          className="p-3 rounded"
          style={{
            backgroundColor: isDark ? "#161b22" : "#f6f8fa",
            border: `1px solid ${isDark ? "#30363d" : "#d0d7de"}`,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            minHeight: 64,
            fontSize: "0.9rem",
            lineHeight: 1.6,
          }}
        >
          {text.trim() ? (
            text
          ) : (
            <span className="text-secondary">Nothing to preview yet...</span>
          )}
        </div>
      </Section>
    </div>
  );
}

export default TextForm;
