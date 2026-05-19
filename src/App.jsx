import React, { useEffect, useMemo, useState } from 'react';

const BRAND = {
  primary: '#00B0D3',
  navy: '#06357A',
  lightBlue: '#70CEEC',
  purple: '#732B8D',
  yellow: '#FEC33E',
  gray: '#B1B3B6',
  text: '#24364B',
  softBg: '#F6FAFC',
  softBorder: '#D9E5EC',
};

const METHANEX_LOGO =
  'https://companieslogo.com/img/orig/MEOH_BIG-cb80609b.png?t=1689054013';

const QUESTIONS = [
  {
    id: 1,
    question: '¿Cuál es el objetivo principal de la guía de prevención de objetos caídos?',
    options: {
      a: 'Establecer prácticas para prevenir la caída de objetos desde altura y evitar lesiones o daños a la propiedad.',
      b: 'Asegurar que las herramientas tengan una jubilación digna antes de tocar el suelo.',
      c: 'Determinar cuál llave inglesa rebota con mayor elegancia.',
    },
    correct: 'a',
  },

  {
    id: 2,
    question: '¿Qué es una zona de caída de objetos?',
    options: {
      a: 'Un área con potencial de ser impactada por objetos caídos que debe estar asegurada con barricadas.',
      b: 'Un espacio VIP reservado para herramientas cansadas.',
      c: 'El lugar oficial donde los pernos van a reflexionar sobre sus decisiones.',
    },
    correct: 'a',
  },

  {
    id: 3,
    question: '¿Qué debe contemplar la planificación de un trabajo con riesgo de caída de objetos?',
    options: {
      a: 'Una playlist motivacional y café suficiente para el turno.',
      b: 'Identificación de peligros, mitigaciones, capacitación, inspecciones y uso de elementos preventivos.',
      c: 'Un acuerdo verbal con la gravedad para que coopere.',
    },
    correct: 'b',
  },

  {
    id: 4,
    question: '¿Qué aspectos debe abordar el JHA en relación con los objetos caídos?',
    options: {
      a: 'Métodos de control de objetos, transporte, bloqueo del área, zona de exclusión y limpieza continua.',
      b: 'Qué herramienta tiene más probabilidades de querer volar.',
      c: 'El ranking semanal de tuercas más inquietas.',
    },
    correct: 'a',
  },

  {
    id: 5,
    question: '¿Qué es el sistema de prevención primaria de caídas?',
    options: {
      a: 'El primer nivel de protección para evitar que los objetos caigan o golpeen algo.',
      b: 'Un curso intensivo de persuasión para convencer al objeto de quedarse quieto.',
      c: 'Una charla motivacional para pernos rebeldes.',
    },
    correct: 'a',
  },

  {
    id: 6,
    question: '¿Qué indica la guía sobre las herramientas y componentes pequeños cuando se trabaja en altura?',
    options: {
      a: 'Deben estar atados o asegurados.',
      b: 'Deben desarrollar apego emocional a la superficie de trabajo.',
      c: 'Pueden quedar sueltos si se ven tranquilos.',
    },
    correct: 'a',
  },

  {
    id: 7,
    question: '¿Qué requisito existe para herramientas o equipos de más de 5 libras (2,2 kg)?',
    options: {
      a: 'Deben estar asegurados con una correa clasificada para su peso y anclados a un punto apropiado.',
      b: 'Deben prometer solemnemente no caer.',
      c: 'Se les debe hablar con firmeza antes de subir con ellas.',
    },
    correct: 'a',
  },

  {
    id: 8,
    question: '¿Qué requisito existe para herramientas o equipos de menos de 5 libras (2,2 kg)?',
    options: {
      a: 'Deben atarse al trabajador siempre que sea posible.',
      b: 'Pueden quedar libres porque son pequeñas pero valientes.',
      c: 'Solo necesitan supervisión visual y buenos deseos.',
    },
    correct: 'a',
  },

  {
    id: 9,
    question: '¿Cómo deben asegurarse los radios y monitores de gas?',
    options: {
      a: 'En bolsillo de malla con cierre de velcro o atados adecuadamente a cinturón/lazo.',
      b: 'Sujetos con optimismo industrial.',
      c: 'Dentro del overol, confiando en la fricción.',
    },
    correct: 'a',
  },

  {
    id: 10,
    question: '¿Qué es el sistema secundario de prevención de caídas?',
    options: {
      a: 'Un respaldo pasivo que actúa si falla el sistema primario.',
      b: 'El plan B que aparece después de mirar al cielo y suspirar.',
      c: 'Una red emocional para herramientas estresadas.',
    },
    correct: 'a',
  },

  {
    id: 11,
    question: '¿Cómo deben delimitarse las zonas de objetos caídos?',
    options: {
      a: 'Con cinta roja de peligro o barricadas sólidas con señalización adecuada.',
      b: 'Con una mirada severa del supervisor desde lejos.',
      c: 'Dibujando un círculo imaginario y confiando en que todos lo respeten.',
    },
    correct: 'a',
  },

  {
    id: 12,
    question: '¿Qué importancia tiene la limpieza en el área de trabajo?',
    options: {
      a: 'Reduce significativamente la probabilidad de caída de materiales.',
      b: 'Hace que las herramientas se comporten mejor por presión social.',
      c: 'Garantiza que el supervisor pueda ver su reflejo en la plataforma.',
    },
    correct: 'a',
  },

  {
    id: 13,
    question: '¿Cuál es tu obligación como trabajador al observar un peligro?',
    options: {
      a: 'Notificar al supervisor y detener el trabajo si no puede realizarse de forma segura.',
      b: 'Mirarlo fijamente hasta que se intimide y desaparezca.',
      c: 'Esperar que alguien más también lo vea para confirmar que no fue imaginación.',
    },
    correct: 'a',
  },

  {
    id: 14,
    question: '¿Para qué se utiliza la calculadora DROPS?',
    options: {
      a: 'Para determinar la gravedad potencial de incidentes con objetos caídos según masa y altura.',
      b: 'Para medir cuántos sustos por minuto puede generar una llave cayendo.',
      c: 'Para calcular la velocidad exacta del cuidado.',
    },
    correct: 'a',
  },

  {
    id: 15,
    question: '¿Qué responsabilidades tiene el líder del trabajo para la prevención de caída de objetos?',
    options: {
      a: 'Asegurar recursos, capacitación, planificación adecuada e identificación/mitigación de riesgos.',
      b: 'Tener reflejos felinos para atrapar cualquier objeto al vuelo.',
      c: 'Aplicar medidas disciplinarias a pernos problemáticos.',
    },
    correct: 'a',
  },

  {
    id: 16,
    question: '¿Qué establece la guía sobre el uso de barbiquejos y cordones retráctiles de seguridad?',
    options: {
      a: 'Deben usarse para asegurar cascos y herramientas según clasificación de carga y recomendaciones del fabricante.',
      b: 'Son opcionales si el casco se siente seguro de sí mismo.',
      c: 'Solo son necesarios cuando el viento anda particularmente creativo.',
    },
    correct: 'a',
  },
];

const WHEEL_COLORS = [
  BRAND.primary,
  BRAND.navy,
  BRAND.lightBlue,
  BRAND.purple,
  BRAND.yellow,
  BRAND.gray,
];

const WEBHOOK_URL = '/api/notify';
const DAILY_LIMIT_STORAGE_KEY = 'methanex_dropped_objects_daily_limit';

function normalizeParticipantName(name) {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readDailyLimitStore() {
  if (typeof window === 'undefined') return {};
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
  if (!normalizedName || typeof window === 'undefined') return;
  const store = readDailyLimitStore();
  store[normalizedName] = getTodayKey();
  window.localStorage.setItem(DAILY_LIMIT_STORAGE_KEY, JSON.stringify(store));
}

function pickRandomQuestion(questions) {
  return questions[Math.floor(Math.random() * questions.length)];
}

function buildPayload({ fullName, company, question, answer }) {
  return {
    type: 'single_draw_answer',
    participant: { fullName, company },
    questionId: question.id,
    question: question.question,
    answer,
    submittedAt: new Date().toISOString(),
  };
}

async function notifyParticipation(payload) {
  if (!WEBHOOK_URL) {
    return { ok: false, skipped: true };
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return { ok: response.ok, skipped: false };
  } catch (error) {
    console.error('API error:', error);
    return { ok: false, skipped: false };
  }
}

function SectionCard({ title, children, compact = false, mobile = false }) {
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${BRAND.softBorder}`,
        borderRadius: mobile ? 22 : 26,
        boxShadow: '0 10px 30px rgba(9, 30, 66, 0.08)',
        padding: mobile ? 20 : compact ? 22 : 28,
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: mobile ? 14 : 16,
          color: BRAND.navy,
          fontSize: mobile ? 24 : compact ? 24 : 32,
          lineHeight: 1.08,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          wordBreak: 'break-word',
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  style = {},
  mobile = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? '#8FDDF0' : BRAND.primary,
        color: '#fff',
        border: 'none',
        borderRadius: 16,
        padding: mobile ? '14px 18px' : '14px 24px',
        fontSize: 15,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : '0 8px 20px rgba(0, 176, 211, 0.22)',
        transition: 'all 0.2s ease',
        width: mobile ? '100%' : 'auto',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick, mobile = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: '#fff',
        color: BRAND.navy,
        border: `1px solid ${BRAND.navy}`,
        borderRadius: 16,
        padding: mobile ? '14px 18px' : '14px 24px',
        fontSize: 15,
        fontWeight: 700,
        cursor: 'pointer',
        width: mobile ? '100%' : 'auto',
      }}
    >
      {children}
    </button>
  );
}

function Badge({ children, bg = '#EEF7FB', color = BRAND.navy }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: bg,
        color,
        borderRadius: 999,
        padding: '8px 14px',
        fontSize: 13,
        fontWeight: 700,
        maxWidth: '100%',
        boxSizing: 'border-box',
        flexWrap: 'wrap',
      }}
    >
      {children}
    </span>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
  mobile = false,
}) {
  const sharedStyle = {
    width: '100%',
    boxSizing: 'border-box',
    border: `1px solid ${BRAND.softBorder}`,
    borderRadius: 16,
    background: BRAND.softBg,
    color: BRAND.text,
    fontSize: 16,
    padding: '14px 16px',
    outline: 'none',
  };

  return (
    <div style={{ display: 'grid', gap: 8, width: '100%' }}>
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
            minHeight: mobile ? 150 : 170,
            resize: 'vertical',
            fontFamily: 'inherit',
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
  const [step, setStep] = useState('register');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState(null);
  const [dailyLimitMessage, setDailyLimitMessage] = useState('');
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = windowWidth < 900;
  const isSmallMobile = windowWidth < 520;

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
      setDailyLimitMessage(
        '¡UPS! Alcanzaste tu límite de intentos por el día, intenta mañana.'
      );
      return;
    }

    setDailyLimitMessage('');
    setStep('wheel');
  };

  const spinWheel = () => {
    setIsSpinning(true);
    const picked = pickRandomQuestion(QUESTIONS);
    const extraRotation = 1800 + Math.floor(Math.random() * 360);
    setRotation((prev) => prev + extraRotation);

    window.setTimeout(() => {
      setSelectedQuestionId(picked.id);
      setStep('question');
      setIsSpinning(false);
    }, 1800);
  };

  const submitAnswer = async () => {
  if (!selectedQuestion || !selectedOption) return;

  const correct = selectedOption === selectedQuestion.correct;

  setIsCorrect(correct);

  markPlayedToday(fullName);

  const payload = buildPayload({
    fullName,
    company,
    question: selectedQuestion,
    answer: selectedOption,
  });

  setStep('result');

  setIsNotifying(true);
  const notify = await notifyParticipation(payload);
  setIsNotifying(false);
  setNotifyStatus(notify);
};

  const restartGame = () => {
    setStep('register');
    setFullName('');
    setCompany('');
    setSelectedOption('');
    setIsCorrect(null);
    setSelectedQuestionId(null);
    setRotation(0);
    setIsSpinning(false);
    setIsNotifying(false);
    setNotifyStatus(null);
    setDailyLimitMessage('');
  };

  const wheelSize = isSmallMobile ? 250 : isMobile ? 300 : 360;

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: isMobile ? '18px 14px 28px' : '24px 16px 40px',
        background:
          'linear-gradient(180deg, #F7FCFE 0%, #FFFFFF 55%, #F4F7FA 100%)',
        fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: 1220, margin: '0 auto', width: '100%' }}>
        <div
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? 20 : 28,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              background: '#fff',
              borderRadius: 28,
              padding: isMobile ? '10px 16px' : '14px 26px',
              border: `1px solid ${BRAND.softBorder}`,
              boxShadow: '0 10px 30px rgba(9, 30, 66, 0.08)',
              marginBottom: isMobile ? 14 : 20,
              maxWidth: '100%',
            }}
          >
            <img
              src={METHANEX_LOGO}
              alt="Methanex"
              style={{
                height: isMobile ? 54 : 78,
                width: 'auto',
                objectFit: 'contain',
                maxWidth: isMobile ? 250 : 360,
              }}
            />
          </div>

          <h1
            style={{
              margin: 0,
              color: BRAND.navy,
              fontSize: isSmallMobile ? 28 : isMobile ? 42 : 58,
              lineHeight: 1.02,
              fontWeight: 900,
              letterSpacing: '-0.04em',
              maxWidth: 980,
              marginInline: 'auto',
            }}
          >
            Ruleta de Conocimiento
            <br />
            Prevención Caída de Objetos
          </h1>

          <div
            style={{
              margin: isMobile ? '14px auto 0' : '18px auto 0',
              color: BRAND.text,
              maxWidth: 900,
              fontSize: isMobile ? 16 : 18,
              lineHeight: 1.5,
              paddingInline: isMobile ? 6 : 0,
            }}
          >
            <div>
              Ingresa tus datos, gira la ruleta y responde{' '}
              <strong>1 pregunta</strong> para participar en el sorteo.
            </div>
            <div style={{ marginTop: 10 }}>
              <strong style={{ color: BRAND.navy }}>
                ¡Conviértete en un Champion de Caída de Objetos!
              </strong>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : 'minmax(0, 1.45fr) minmax(290px, 0.75fr)',
            gap: isMobile ? 18 : 24,
            alignItems: 'start',
          }}
        >
          <SectionCard
            mobile={isMobile}
            title={
              step === 'register'
                ? 'Antes de jugar'
                : step === 'wheel'
                ? 'Gira la ruleta'
                : step === 'question'
                ? 'Pregunta sorteada'
                : 'Respuesta enviada'
            }
          >
            {step === 'register' && (
              <form
                onSubmit={handleRegister}
                style={{
                  display: 'grid',
                  gap: isMobile ? 18 : 24,
                  width: '100%',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: BRAND.text,
                    fontSize: isMobile ? 16 : 17,
                  }}
                >
                  Ingresa tus datos y gira la ruleta.
                </p>

                {dailyLimitMessage && (
                  <div
                    style={{
                      borderRadius: 18,
                      border: `1px solid ${BRAND.purple}33`,
                      background: `${BRAND.purple}10`,
                      color: BRAND.purple,
                      padding: '14px 16px',
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {dailyLimitMessage}
                  </div>
                )}

                <div style={{ display: 'grid', gap: 18 }}>
                  <LabeledInput
                    mobile={isMobile}
                    label="Nombre completo"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (dailyLimitMessage) setDailyLimitMessage('');
                    }}
                    placeholder="Ej.: Felipe Perez Oyarzún"
                  />
                  <LabeledInput
                    mobile={isMobile}
                    label="Empresa"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ej.: Empresa XYZ"
                  />
                </div>

                <div>
                  <PrimaryButton mobile={isMobile} type="submit">
                    Comenzar juego
                  </PrimaryButton>
                </div>
              </form>
            )}

            {step === 'wheel' && (
              <div
                style={{
                  display: 'grid',
                  gap: isMobile ? 18 : 24,
                  justifyItems: 'center',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: BRAND.text,
                    fontSize: isMobile ? 16 : 17,
                    textAlign: 'center',
                  }}
                >
                  La ruleta seleccionará 1 de las 16 preguntas del documento.
                </p>

                <div
                  style={{
                    position: 'relative',
                    width: wheelSize,
                    height: wheelSize,
                    maxWidth: '100%',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      top: -8,
                      zIndex: 10,
                      width: 0,
                      height: 0,
                      borderLeft: '18px solid transparent',
                      borderRight: '18px solid transparent',
                      borderBottom: `34px solid ${BRAND.navy}`,
                    }}
                  />

                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: '#fff',
                      border: '12px solid white',
                      boxShadow: '0 18px 35px rgba(9, 30, 66, 0.12)',
                      padding: isSmallMobile ? 12 : 16,
                      boxSizing: 'border-box',
                      transform: `rotate(${rotation}deg)`,
                      transition: isSpinning
                        ? 'transform 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
                        : 'none',
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: isSmallMobile ? 8 : 12,
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      {QUESTIONS.map((q, i) => {
                        const bg = WHEEL_COLORS[i % WHEEL_COLORS.length];
                        const textColor =
                          bg === BRAND.yellow ||
                          bg === BRAND.gray ||
                          bg === BRAND.lightBlue
                            ? BRAND.navy
                            : '#fff';

                        return (
                          <div
                            key={q.id}
                            style={{
                              borderRadius: 18,
                              border: `1px solid ${BRAND.softBorder}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: isSmallMobile ? 13 : 15,
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

                <PrimaryButton
                  mobile={isMobile}
                  onClick={spinWheel}
                  disabled={isSpinning}
                >
                  {isSpinning ? 'Girando...' : 'Girar ruleta'}
                </PrimaryButton>
              </div>
            )}

          {step === 'question' && selectedQuestion && (
  <div style={{ display: 'grid', gap: isMobile ? 18 : 22 }}>
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Badge>Pregunta sorteada: P{selectedQuestion.id}</Badge>
      <Badge bg={BRAND.purple} color="#fff">
        Participación única
      </Badge>
    </div>

    <div style={{ display: 'grid', gap: 10 }}>
      <h2
        style={{
          margin: 0,
          color: BRAND.navy,
          fontSize: isMobile ? 24 : 30,
          lineHeight: 1.18,
          fontWeight: 800,
        }}
      >
        {selectedQuestion.question}
      </h2>
    </div>

    <div style={{ display: 'grid', gap: 14 }}>
      {Object.entries(selectedQuestion.options).map(([key, value]) => (
        <button
          key={key}
          onClick={() => setSelectedOption(key)}
          style={{
            padding: '16px',
            borderRadius: 16,
            border:
              selectedOption === key
                ? `3px solid ${BRAND.primary}`
                : `1px solid ${BRAND.softBorder}`,
            background: selectedOption === key ? '#EAFBFF' : '#fff',
            cursor: 'pointer',
            textAlign: 'left',
            fontSize: 16,
            fontWeight: 600,
            color: BRAND.text,
          }}
        >
          <strong>{key.toUpperCase()})</strong> {value}
        </button>
      ))}
    </div>

    <div style={{ marginTop: 20 }}>
      <PrimaryButton mobile={isMobile} onClick={submitAnswer}>
        Confirmar respuesta
      </PrimaryButton>
    </div>
  </div>
)}
            
            {step === 'result' && selectedQuestion && (
              <div style={{ display: 'grid', gap: isMobile ? 18 : 24 }}>
                <div style={{ textAlign: 'center', display: 'grid', gap: 14 }}>
                  <div
                    style={{
                      margin: '0 auto',
                      width: isMobile ? 64 : 72,
                      height: isMobile ? 64 : 72,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#DDF8E8',
                      color: '#159947',
                      fontSize: isMobile ? 30 : 34,
                      fontWeight: 900,
                    }}
                  >
                    ✓
                  </div>
                  <h2
  style={{
    margin: 0,
    color: isCorrect ? '#159947' : '#D62828',
    fontSize: isMobile ? 28 : 34,
    fontWeight: 900,
  }}
>
  {isCorrect
    ? '¡Correcto! 😄'
    : '¡Incorrecto! 😢'}
</h2>
                  <p
                    style={{
                      margin: 0,
                      color: BRAND.text,
                      fontSize: isMobile ? 16 : 17,
                      lineHeight: 1.7,
                      maxWidth: 760,
                      marginInline: 'auto',
                    }}
                  >
                    {isCorrect
  ? 'Has ingresado al sorteo de esta semana.'
  : 'Inténtalo mañana nuevamente.'}
                  </p>
                </div>

                <div
                  style={{
                    borderRadius: 20,
                    border: `1px solid ${BRAND.softBorder}`,
                    background: BRAND.softBg,
                    padding: isMobile ? 16 : 18,
                    display: 'grid',
                    gap: 8,
                    overflowWrap: 'break-word',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: BRAND.navy,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    Pregunta sorteada
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: BRAND.text,
                      fontSize: isMobile ? 15 : 16,
                      fontWeight: 700,
                    }}
                  >
                    {selectedQuestion.question}
                  </p>
                  <p
                    style={{
                      margin: '10px 0 0',
                      color: BRAND.navy,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    Tu respuesta
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: BRAND.text,
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.7,
                      fontSize: isMobile ? 15 : 16,
                    }}
                  >
                    {selectedOption ? `${selectedOption.toUpperCase()}) ${selectedQuestion.options[selectedOption]}` : ''}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                  }}
                >
                  <OutlineButton mobile={isMobile} onClick={restartGame}>
                    Reiniciar
                  </OutlineButton>

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

          <div style={{ display: 'grid', gap: 20, width: '100%' }}>
            <SectionCard mobile={isMobile} title="Estado" compact>
              <div
                style={{
                  display: 'grid',
                  gap: 12,
                  color: BRAND.text,
                  fontSize: isMobile ? 15 : 14,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <span>Participante</span>
                  <strong>{fullName || '—'}</strong>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <span>Empresa</span>
                  <strong>{company || '—'}</strong>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <span>Modalidad</span>
                  <strong>1 pregunta</strong>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <span>Preguntas cargadas</span>
                  <strong>{QUESTIONS.length}</strong>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              mobile={isMobile}
              title="Revisión de respuestas"
              compact
            >
              <div
                style={{
                  color: BRAND.text,
                  fontSize: isMobile ? 15 : 14,
                  lineHeight: 1.7,
                }}
              >
                <p style={{ textAlign: 'justify', marginBottom: 0 }}>
                  Cada participante puede jugar{' '}
                  <strong>solo una vez por día</strong> según su nombre
                  registrado.
                </p>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
