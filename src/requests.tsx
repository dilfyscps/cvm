import { useEffect, useState } from "react";
import PageBackground from "./components/PageBackground";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const COOLDOWN_KEY = "cvm_request_cooldown_until";
const MIN_LENGTH = 10;
const MAX_LENGTH = 500;

function getCooldownRemaining() {
  const until = Number(localStorage.getItem(COOLDOWN_KEY) ?? 0);
  return Math.max(0, until - Date.now());
}

function formatWait(ms: number) {
  const minutes = Math.ceil(ms / 60_000);
  return minutes <= 1 ? "1 minute" : `${minutes} minutes`;
}

export default function Requests() {
  const [request, setRequest] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [cooldownMs, setCooldownMs] = useState(() => getCooldownRemaining());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCooldownMs(getCooldownRemaining());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  async function sendRequest() {
    setStatus(null);

    const trimmed = request.trim();
    if (!trimmed) {
      setStatus({ type: "error", message: "Please enter a request." });
      return;
    }
    if (trimmed.length < MIN_LENGTH) {
      setStatus({ type: "error", message: `Please enter at least ${MIN_LENGTH} characters.` });
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setStatus({ type: "error", message: `Keep your request under ${MAX_LENGTH} characters.` });
      return;
    }
    if (cooldownMs > 0) {
      setStatus({
        type: "error",
        message: `Please wait ${formatWait(cooldownMs)} before submitting again.`,
      });
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, honeypot }),
      });

      const data = (await res.json()) as {
        error?: string;
        success?: boolean;
        retryAfter?: number;
      };

      if (res.status === 429) {
        const waitMs = (data.retryAfter ?? 600) * 1000;
        localStorage.setItem(COOLDOWN_KEY, String(Date.now() + waitMs));
        setCooldownMs(waitMs);
        setStatus({
          type: "error",
          message: data.error ?? `Please wait ${formatWait(waitMs)} before submitting again.`,
        });
        return;
      }

      if (!res.ok) {
        throw new Error(data.error ?? "Request failed");
      }

      const waitMs = (data.retryAfter ?? 600) * 1000;
      localStorage.setItem(COOLDOWN_KEY, String(Date.now() + waitMs));
      setCooldownMs(waitMs);
      setRequest("");
      setStatus({ type: "success", message: "Request submitted! We'll review it on Discord." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send request.",
      });
    } finally {
      setSending(false);
    }
  }

  const disabled = sending || cooldownMs > 0;
  const charsLeft = MAX_LENGTH - request.length;

  return (
    <div className="page-shell page-enter text-white">
      <PageBackground />
      <SiteHeader active="/requests" />

      <section className="container-app flex min-h-[75vh] items-center justify-center py-16">
        <div className="glass-card w-full max-w-xl p-8 sm:p-10">
          <div className="glass-content">
            <span className="liquid-badge">
              <span className="liquid-badge__dot" />
              Requests
            </span>
            <h1 className="text-display mt-4 text-3xl text-white sm:text-4xl">Request a scenepack</h1>
            <p className="text-body mt-3">
              One request every 10 minutes. Be specific so we know what you want.
            </p>

            <label className="sr-only" htmlFor="request-honeypot">
              Leave blank
            </label>
            <input
              id="request-honeypot"
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="request-honeypot"
              aria-hidden="true"
            />

            <textarea
              value={request}
              onChange={(e) => setRequest(e.target.value.slice(0, MAX_LENGTH))}
              placeholder="Example: arianfzn gym scenepack..."
              className="admin-form-textarea mt-8 min-h-[10rem]"
              maxLength={MAX_LENGTH}
              disabled={disabled}
            />

            <p className={`text-caption mt-2 ${charsLeft < 40 ? "text-pink-300" : ""}`}>
              {request.trim().length}/{MIN_LENGTH} min · {charsLeft} left
            </p>

            {status && (
              <p
                className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                    : "border border-red-400/25 bg-red-400/10 text-red-100"
                }`}
                role="status"
              >
                {status.message}
              </p>
            )}

            {cooldownMs > 0 && !status && (
              <p className="text-caption mt-4">
                You can submit again in {formatWait(cooldownMs)}.
              </p>
            )}

            <button
              type="button"
              onClick={sendRequest}
              disabled={disabled}
              className="btn-primary mt-6 w-full"
            >
              {sending
                ? "Sending..."
                : cooldownMs > 0
                  ? `Wait ${formatWait(cooldownMs)}`
                  : "Submit request"}
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
