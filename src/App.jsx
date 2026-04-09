import React, { useMemo, useState } from "react";

const BRAND = {
  primary: "#00B0D3",
  navy: "#06357A",
  lightBlue: "#70CEEC",
  purple: "#732B8D",
  yellow: "#FEC33E",
  gray: "#B1B3B6",
  text: "#24364B",
  softBg: "#F6FAFC",
  softBorder: "#D9E5EC",
};

const METHANEX_LOGO =
  "https://companieslogo.com/img/orig/MEOH_BIG-cb80609b.png?t=1689054013";

const QUESTIONS = [
  { id: 1, question: "¿Cuál es el objetivo principal de la guía de prevención de objetos caídos?" },
  { id: 2, question: "¿Qué es una zona de objetos caídos?" },
  { id: 3, question: "¿Qué debe contemplar la planificación de un trabajo con riesgo de caída de objetos?" },
  { id: 4, question: "¿Qué aspectos debe abordar el JHA en relación con los objetos caídos?" },
  { id: 5, question: "¿Qué es el sistema de prevención primaria de caídas?" },
  { id: 6, question: "¿Qué indica la guía de prevención de objetos caídos sobre las herramientas y componentes pequeños cuando se trabaja en altura?" },
  { id: 7, question: "¿Qué requisito existe para herramientas o equipos de más de 5 libras (2,2 kg)?" },
  { id: 8, question: "¿Qué requisito existe para herramientas o equipos de menos de 5 libras (2,2 kg)?" },
  { id: 9, question: "¿Cómo deben asegurarse los radios y monitores de gas?" },
  { id: 10, question: "¿Qué es el sistema secundario de prevención de caídas?" },
  { id: 11, question: "¿Cómo deben delimitarse las zonas de objetos caídos?" },
  { id: 12, question: "¿Qué importancia tiene la limpieza en el área de trabajo para la prevención de objetos caídos?" },
  { id: 13, question: "¿Cuál es tu obligación como trabajador al observar un peligro?" },
  { id: 14, question: "¿Para qué se utiliza la calculadora DROPS?" },
  { id: 15, question: "¿Qué responsabilidades tiene el líder del trabajo para la prevención de caída de objetos?" },
  { id: 16, question: "¿Qué establece la guía de prevención de caída de objetos sobre el uso de barbiquejos y cordones retractiles de seguridad?" },
];

const WHEEL_COLORS = [
  BRAND.primary,
  BRAND.navy,
  BRAND.lightBlue,
  BRAND.purple,
  BRAND.yellow,
  BRAND.gray,
];

const WEBHOOK_URL = "https://default424cd790528d436587669be8efb914.78.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/1f9df0f579a2473fb544d554328fd2a1/triggers/manual/paths/invoke?api-version=1";
const DAILY_LIMIT_STORAGE_KEY = "methanex_dropped_objects_daily_limit";

function normalizeParticipantName(name) {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readDailyLimitStore() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(DAILY_LIMIT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function hasPlayedToday(fullName) {
  const normalizedName = normalizeParticipantName(fullName);
  if (!normalizedName) return false;
  const store = readDailyLimitStore();
  return store[normalizedName] === getTodayKey();
}

function markPlayedToday(fullName) {
  const normalizedName = normalizeParticipantName(fullName);
  if (!normalizedName || typeof window === "undefined") return;
  const store = readDailyLimitStore();
  store[normalizedName] = getTodayKey();
  window.localStorage.setItem(DAILY_LIMIT_STORAGE_KEY, JSON.stringify(store));
}

function pickRandomQuestion(questions) {
  return questions[Math.floor(Math.random() * questions.length)];
}

function buildPayload({ fullName, company, question, answer }) {
  return {
    type: "single_draw_answer",
    participant: { fullName, company },
    questionId: question.id,
    question: question.question,
    answer,
    submittedAt: new Date().toISOString(),
  };
}

async function notifyParticipation(payload) {
  if (!WEBHOOK_URL) return { ok: false, skipped: true };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: response.ok, skipped: false };
  } catch {
    return { ok: false, skipped: false };
  }
}

function SectionCard({ title, children, compact = false }) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${BRAND.softBorder}`,
        borderRadius: 26,
        boxShadow: "0 10px 30px rgba(9, 30, 66, 0.08)",
        padding: compact ? 22 : 28,
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: 16,
          color: BRAND.navy,
          fontSize: compact ? 24 : 32,
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, type = "button", disabled = false, style = {} }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#8FDDF0" : BRAND.primary,
        color: "#fff",
        border: "none",
        borderRadius: 16,
        padding: "14px 24px",
        fontSize: 15,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 8px 20px rgba(0, 176, 211, 0.22)",
        transition: "all 0.2s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "#fff",
        color: BRAND.navy,
        border: `1px solid ${BRAND.navy}`,
        borderRadius: 16,
        padding: "14px 24px",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function Badge({ children, bg = "#EEF7FB", color = BRAND.navy }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: bg,
        color,
        borderRadius: 999,
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}

function LabeledInput({ label, value, onChange, placeholder, textarea = false }) {
  const sharedStyle = {
    width: "100%",
    boxSizing: "border-box",
    border: `1px solid ${BRAND.softBorder}`,
    borderRadius: 16,
    background: BRAND.softBg,
    color: BRAND.text,
    fontSize: 16,
    padding: "14px 16px",
    outline: "none",
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <label
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: BRAND.navy,
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            ...sharedStyle,
            minHeight: 170,
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={sharedStyle}
        />
      )}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("register");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState(null);
  const [dailyLimitMessage, setDailyLimitMessage] = useState("");

  const selectedQuestion = useMemo(
    () => QUESTIONS.find((q) => q.id === selectedQuestionId) || null,
    [selectedQuestionId]
  );

  const handleRegister = (e) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedCompany = company.trim();

    if (!trimmedName || !trimmedCompany) return;

    if (hasPlayedToday(trimmedName)) {
      setDailyLimitMessage("¡UPS! Alcanzaste tu límite de intentos por el día, intenta mañana.");
      return;
    }

    setDailyLimitMessage("");
    setStep("wheel");
  };

  const spinWheel = () => {
    setIsSpinning(true);
    const picked = pickRandomQuestion(QUESTIONS);
    const extraRotation = 1800 + Math.floor(Math.random() * 360);
    setRotation((prev) => prev + extraRotation);

    window.setTimeout(() => {
      setSelectedQuestionId(picked.id);
      setStep("question");
      setIsSpinning(false);
    }, 1800);
  };

  const submitAnswer = async () => {
    if (!selectedQuestion || !answer.trim()) return;

    markPlayedToday(fullName);

    const payload = buildPayload({
      fullName,
      company,
      question: selectedQuestion,
      answer,
    });

    setStep("result");
    setIsNotifying(true);
    const notify = await notifyParticipation(payload);
    setIsNotifying(false);
    setNotifyStatus(notify);
  };

  const restartGame = () => {
    setStep("register");
    setFullName("");
    setCompany("");
    setAnswer("");
    setSelectedQuestionId(null);
    setRotation(0);
    setIsSpinning(false);
    setIsNotifying(false);
    setNotifyStatus(null);
    setDailyLimitMessage("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px 16px 40px",
        background: `linear-gradient(180deg, #F7FCFE 0%, #FFFFFF 55%, #F4F7FA 100%)`,
        fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              background: "#fff",
              borderRadius: 28,
              padding: "14px 26px",
              border: `1px solid ${BRAND.softBorder}`,
              boxShadow: "0 10px 30px rgba(9, 30, 66, 0.08)",
              marginBottom: 20,
            }}
          >
            <img
              src={METHANEX_LOGO}
              alt="Methanex"
              style={{
                height: 78,
                width: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          <h1
            style={{
              margin: 0,
              color: BRAND.navy,
              fontSize: "clamp(34px, 5vw, 58px)",
              lineHeight: 1.02,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              maxWidth: 980,
              marginInline: "auto",
            }}
          >
            Ruleta de Conocimiento
            <br />
            Prevención Caída de Objetos
          </h1>

          <p
            style={{
              margin: "18px auto 0",
              color: BRAND.text,
              maxWidth: 900,
              fontSize: 18,
              lineHeight: 1.50,
            }}
          >
            Ingresa tus datos, gira la ruleta y responde <strong>1 pregunta</strong> para participar en el sorteo.{" "}
            </p>
    <p>
            <strong style={{ color: BRAND.navy }}>¡Conviértete en un Champion de Caída de Objetos!</strong>
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.45fr) minmax(290px, 0.75fr)",
            gap: 24,
            alignItems: "start",
          }}
        >
          <SectionCard
            title={
              step === "register"
                ? "Antes de jugar"
                : step === "wheel"
                ? "Gira la ruleta"
                : step === "question"
                ? "Pregunta sorteada"
                : "Respuesta enviada"
            }
          >
            {step === "register" && (
              <form onSubmit={handleRegister} style={{ display: "grid", gap: 24 }}>
                <p style={{ margin: 0, color: BRAND.text, fontSize: 17 }}>
                  Ingresa tus datos y gira la ruleta.
                </p>

                {dailyLimitMessage && (
                  <div
                    style={{
                      borderRadius: 18,
                      border: `1px solid ${BRAND.purple}33`,
                      background: `${BRAND.purple}10`,
                      color: BRAND.purple,
                      padding: "14px 16px",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {dailyLimitMessage}
                  </div>
                )}

                <div style={{ display: "grid", gap: 18 }}>
                  <LabeledInput
                    label="Nombre completo"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (dailyLimitMessage) setDailyLimitMessage("");
                    }}
                    placeholder="Ej.: Felipe Perez Oyarzún"
                  />
                  <LabeledInput
                    label="Empresa"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ej.: Empresa XYZ"
                  />
                </div>

                <div>
                  <PrimaryButton type="submit">Comenzar juego</PrimaryButton>
                </div>
              </form>
            )}

            {step === "wheel" && (
              <div style={{ display: "grid", gap: 24, justifyItems: "center" }}>
                <p style={{ margin: 0, color: BRAND.text, fontSize: 17 }}>
                  La ruleta seleccionará 1 de las 16 preguntas del documento.
                </p>

                <div
                  style={{
                    position: "relative",
                    width: 360,
                    height: 360,
                    maxWidth: "100%",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      top: -8,
                      zIndex: 10,
                      width: 0,
                      height: 0,
                      borderLeft: "18px solid transparent",
                      borderRight: "18px solid transparent",
                      borderBottom: `34px solid ${BRAND.navy}`,
                    }}
                  />

                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: "#fff",
                      border: "12px solid white",
                      boxShadow: "0 18px 35px rgba(9, 30, 66, 0.12)",
                      padding: 16,
                      boxSizing: "border-box",
                      transform: `rotate(${rotation}deg)`,
                      transition: isSpinning ? "transform 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 12,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {QUESTIONS.map((q, i) => {
                        const bg = WHEEL_COLORS[i % WHEEL_COLORS.length];
                        const textColor =
                          bg === BRAND.yellow || bg === BRAND.gray || bg === BRAND.lightBlue
                            ? BRAND.navy
                            : "#fff";

                        return (
                          <div
                            key={q.id}
                            style={{
                              borderRadius: 18,
                              border: `1px solid ${BRAND.softBorder}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 800,
                              fontSize: 15,
                              backgroundColor: bg,
                              color: textColor,
                            }}
                          >
                            P{q.id}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <PrimaryButton onClick={spinWheel} disabled={isSpinning}>
                  {isSpinning ? "Girando..." : "Girar ruleta"}
                </PrimaryButton>
              </div>
            )}

            {step === "question" && selectedQuestion && (
              <div style={{ display: "grid", gap: 22 }}>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Badge>Pregunta sorteada: P{selectedQuestion.id}</Badge>
                  <Badge bg={BRAND.purple} color="#fff">
                    Participación única
                  </Badge>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <h2
                    style={{
                      margin: 0,
                      color: BRAND.navy,
                      fontSize: 30,
                      lineHeight: 1.18,
                      fontWeight: 800,
                    }}
                  >
                    {selectedQuestion.question}
                  </h2>
                  <p style={{ margin: 0, color: BRAND.text, fontSize: 16 }}>
                    Responde con tus palabras. Tu respuesta será enviada para revisión.
                  </p>
                </div>

                <LabeledInput
                  label="Tu respuesta"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Escribe aquí tu respuesta..."
                  textarea
                />

                <div>
                  <PrimaryButton onClick={submitAnswer}>Enviar respuesta y participar</PrimaryButton>
                </div>
              </div>
            )}

            {step === "result" && selectedQuestion && (
              <div style={{ display: "grid", gap: 24 }}>
                <div style={{ textAlign: "center", display: "grid", gap: 14 }}>
                  <div
                    style={{
                      margin: "0 auto",
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#DDF8E8",
                      color: "#159947",
                      fontSize: 34,
                      fontWeight: 900,
                    }}
                  >
                    ✓
                  </div>
                  <h2
                    style={{
                      margin: 0,
                      color: BRAND.navy,
                      fontSize: 34,
                      fontWeight: 900,
                    }}
                  >
                    ¡Respuesta enviada!
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      color: BRAND.text,
                      fontSize: 17,
                      lineHeight: 1.7,
                      maxWidth: 760,
                      marginInline: "auto",
                    }}
                  >
                    Tu respuesta ha sido guardada y enviada a los Champions de Caída de Objetos para su revisión,
                    ¡éxito en el sorteo!
                  </p>
                </div>

                <div
                  style={{
                    borderRadius: 20,
                    border: `1px solid ${BRAND.softBorder}`,
                    background: BRAND.softBg,
                    padding: 18,
                    display: "grid",
                    gap: 8,
                  }}
                >
                  <p style={{ margin: 0, color: BRAND.navy, fontSize: 13, fontWeight: 700 }}>
                    Pregunta sorteada
                  </p>
                  <p style={{ margin: 0, color: BRAND.text, fontSize: 16, fontWeight: 700 }}>
                    {selectedQuestion.question}
                  </p>
                  <p style={{ margin: "10px 0 0", color: BRAND.navy, fontSize: 13, fontWeight: 700 }}>
                    Tu respuesta
                  </p>
                  <p style={{ margin: 0, color: BRAND.text, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                    {answer}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <OutlineButton onClick={restartGame}>Reiniciar</OutlineButton>

                  {isNotifying && <Badge>Enviando registro...</Badge>}

                  {notifyStatus?.skipped && (
                    <Badge bg="#fff" color={BRAND.text}>
                      Sin webhook configurado
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </SectionCard>

          <div style={{ display: "grid", gap: 20 }}>
            <SectionCard title="Estado" compact>
              <div style={{ display: "grid", gap: 12, color: BRAND.text, fontSize: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span>Participante</span>
                  <strong>{fullName || "—"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span>Empresa</span>
                  <strong>{company || "—"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span>Modalidad</span>
                  <strong>1 pregunta</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span>Preguntas cargadas</span>
                  <strong>{QUESTIONS.length}</strong>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Revisión de respuestas" compact>
              <div style={{ color: BRAND.text, fontSize: 14, lineHeight: 1.7 }}>
                <p style={{ textAlign:"justify"}}>
                  Este juego <strong>no valida automáticamente</strong> si la respuesta es correcta o incorrecta.
                </p>
                <p style={{ textAlign:"justify"}}>
                  Las respuestas quedan registradas para que los Champions de Caída de Objetos puedan revisarlas posteriormente.
                </p>
                <p style={{ textAlign:"justify"}}>
                  Además, cada participante puede jugar <strong>solo una vez por día</strong> según su nombre registrado.
                </p>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
