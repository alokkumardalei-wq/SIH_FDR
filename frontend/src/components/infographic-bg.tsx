import React, { useState, useEffect } from 'react';

interface SlideData {
  id: number;
  trigger: {
    avatarType: 'woman' | 'man1' | 'man2';
    source: string;
    user: string;
    time: string;
    message: string;
    label: string;
    toastStyle: { top: string; left: string };
    triggerStyle: { top: string; left: string };
  };
  functionTag: {
    label: string;
    style: { top: string; left: string };
  };
  beamPath: string; // SVG path connecting Trigger -> Action/Function -> Output in 1200x650 coordinate space
  code: Array<{ text: string; type?: 'kw' | 'str' | 'comment' | 'fn' | 'plain' }>;
  tags: Array<{ text: string; top: string; left?: string; right?: string }>;
  output: {
    x: number;
    y: number;
  };
  outputNodes: Array<{ x: number; y: number; label: string }>;
  outputLines: Array<[number, number]>;
}

const SLIDES: SlideData[] = [
  // Slide 1: Multimodal VLM Extraction Cascade (Gemma 3 27B)
  {
    id: 0,
    trigger: {
      avatarType: 'woman',
      source: 'Colab VLM Worker',
      user: '@Gemma3-27B',
      time: 'Just now',
      message: 'Gemma 3 27B extracting FDR receipt fields via LoRA adapter',
      label: 'VLM INTAKE',
      toastStyle: { top: '10%', left: '8%' },
      triggerStyle: { top: '28%', left: '52%' },
    },
    functionTag: {
      label: 'EXTRACTION CASCADE',
      style: { top: '61%', left: '46%' },
    },
    beamPath: 'M 255 195 L 515 410 L 730 205',
    code: [
      { text: "import {extractDocumentCascade} from 'app.extraction_engine'", type: 'kw' },
      { text: "import {GemmaVLMClient} from 'app.vlm_client'", type: 'kw' },
      { text: '', type: 'plain' },
      { text: 'const CASCADE_CONFIDENCE_THRESHOLD = 0.85', type: 'plain' },
      { text: "// Provider priority: pdf_text → tesseract → colab_vlm", type: 'comment' },
      { text: '', type: 'plain' },
      { text: 'export const processFdrReceipt = async ({documentId, bytes}) => {', type: 'fn' },
      { text: '  const extraction = await extractDocumentCascade({', type: 'plain' },
      { text: '    documentId, bytes, minConfidence: CASCADE_CONFIDENCE_THRESHOLD,', type: 'plain' },
      { text: '  })', type: 'plain' },
      { text: '  // Preserves original raw OCR extraction before human review', type: 'comment' },
      { text: '  const targetId = `extract-${documentId}-${Date.now()}`', type: 'str' },
      { text: '  return await persistStructuredEvidence({', type: 'fn' },
      { text: '    fdrNumber: extraction.reference, amount: extraction.amount,', type: 'plain' },
      { text: "    maturityDate: extraction.maturity, issuingBank: extraction.bank,", type: 'plain' },
      { text: "    status: extraction.confidence >= 0.85 ? 'verified' : 'flagged',", type: 'str' },
      { text: '  })', type: 'plain' },
      { text: '}', type: 'fn' },
    ],
    tags: [
      { text: '▪ FIXED DEPOSIT RECEIPT', top: '24%', left: '48%' },
      { text: '▪ 27B LORA WEIGHTS', top: '38%', left: '14%' },
    ],
    output: { x: 730, y: 205 },
    outputNodes: [
      { x: 130, y: 75, label: 'FDR INSTRUMENT' },
      { x: 260, y: 92, label: 'MATURITY DATE' },
      { x: 335, y: 135, label: 'DEPOSIT AMOUNT' },
      { x: 105, y: 130, label: 'ISSUING BANK' },
      { x: 285, y: 180, label: 'LIEN ENCUMBRANCE' },
      { x: 70, y: 280, label: 'JOINT DEPOSITOR' },
      { x: 190, y: 275, label: 'FORENSIC OCR LAYER' },
      { x: 40, y: 360, label: 'AUDIT CHECKSUM' },
    ],
    outputLines: [
      [0, 1], [1, 2], [0, 3], [1, 4], [3, 5], [5, 6], [5, 7]
    ],
  },
  // Slide 2: Explainable Suspicion Score (Engine 2.0.0) & Vigilance Escalation
  {
    id: 1,
    trigger: {
      avatarType: 'man1',
      source: 'Risk Sentinel 2.0',
      user: '@Vigilance',
      time: 'Just now',
      message: 'Suspicion score reached 68 (Threshold: 50). Case escalated to Vigilance cell.',
      label: 'SUSPICION ESCALATION',
      toastStyle: { top: '18%', left: '10%' },
      triggerStyle: { top: '35%', left: '55%' },
    },
    functionTag: {
      label: 'VIGILANCE GATE',
      style: { top: '69%', left: '50%' },
    },
    beamPath: 'M 270 235 L 540 455 L 780 240',
    code: [
      { text: "import {evaluateSuspicionScore} from 'app.risk'", type: 'kw' },
      { text: "import {escalateToVigilance} from 'app.workflows'", type: 'kw' },
      { text: "import {detectForensicAnomalies} from 'app.forensics'", type: 'kw' },
      { text: '', type: 'plain' },
      { text: 'const VIGILANCE_ESCALATION_THRESHOLD = 50', type: 'plain' },
      { text: 'export const evaluateCaseRisk = async (depositCase) => {', type: 'fn' },
      { text: '  const anomalies = await detectForensicAnomalies(depositCase.evidence)', type: 'plain' },
      { text: '  const risk = await evaluateSuspicionScore(depositCase.id, anomalies)', type: 'plain' },
      { text: '  // Cases with suspicion >= 50 automatically gate officer resolution', type: 'comment' },
      { text: '  if (risk.score >= VIGILANCE_ESCALATION_THRESHOLD) {', type: 'kw' },
      { text: '    await escalateToVigilance(depositCase.id, {', type: 'fn' },
      { text: "      findings: risk.findings, reviewer: 'vigilance@demo.local',", type: 'str' },
      { text: '    })', type: 'plain' },
      { text: '  }', type: 'kw' },
      { text: '}', type: 'fn' },
    ],
    tags: [
      { text: '▪ 10 DETECTOR FLAGS', top: '21%', left: '14%' },
      { text: '▪ VIGILANCE THRESHOLD', top: '32%', left: '42%' },
    ],
    output: { x: 780, y: 240 },
    outputNodes: [
      { x: 50, y: 120, label: 'TAMPER DETECTION' },
      { x: 175, y: 195, label: 'DOCUMENT REUSE' },
      { x: 265, y: 195, label: 'ARITHMETIC CHECK' },
      { x: 330, y: 175, label: 'SUSPICION SCORE' },
      { x: 375, y: 165, label: 'VIGILANCE CELL' },
      { x: 280, y: 245, label: 'MAKER-CHECKER' },
      { x: 310, y: 350, label: 'DUAL OFFICER' },
      { x: 230, y: 385, label: 'DISCREPANCY TASK' },
      { x: 130, y: 300, label: 'IMMUTABLE AUDIT' },
      { x: 135, y: 440, label: 'GATE CLEARANCE' },
    ],
    outputLines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [1, 8], [8, 7], [7, 6], [7, 9]
    ],
  },
  // Slide 3: Independent Bank Attestation & Release Clearance Gate
  {
    id: 2,
    trigger: {
      avatarType: 'man2',
      source: 'Bank Gateway',
      user: '@BankAdapter',
      time: 'Just now',
      message: 'State Bank of India confirmed FDR SBI-2026-D7D720 (₹35,00,000)',
      label: 'BANK ATTESTATION',
      toastStyle: { top: '56%', left: '10%' },
      triggerStyle: { top: '74%', left: '40%' },
    },
    functionTag: {
      label: 'AUTHORISATION GATE',
      style: { top: '37%', left: '46%' },
    },
    beamPath: 'M 220 480 L 510 245 L 720 465',
    code: [
      { text: "import {verifyBankAttestation} from 'app.bank'", type: 'kw' },
      { text: "import {recordVerificationGate} from 'app.workflows'", type: 'kw' },
      { text: '', type: 'plain' },
      { text: 'export const verifyInstrument = async (caseId, instrumentRef) => {', type: 'fn' },
      { text: '  const bankProof = await verifyBankAttestation(instrumentRef)', type: 'plain' },
      { text: '  // Officer checklist: Bank confirmed + Tasks resolved + No escalation', type: 'comment' },
      { text: '  if (!bankProof.confirmed) {', type: 'kw' },
      { text: "    throw new Error('Verification blocked: Bank has not confirmed yet')", type: 'comment' },
      { text: '  }', type: 'plain' },
      { text: '  await recordVerificationGate({', type: 'fn' },
      { text: "    caseId, bankStatus: 'confirmed', officerSigned: true,", type: 'plain' },
      { text: '  })', type: 'plain' },
      { text: '}', type: 'fn' },
    ],
    tags: [
      { text: '▪ BANK ATTESTATION', top: '22%', left: '25%' },
      { text: '▪ NO UNCLEARED TASKS', top: '29%', left: '16%' },
      { text: '▪ 90-DAY MATURITY MONITOR', top: '51%', left: '26%' },
    ],
    output: { x: 720, y: 465 },
    outputNodes: [
      { x: 310, y: 75, label: 'BANK CONFIRMATION' },
      { x: 190, y: 185, label: 'PGRC CLEARANCE' },
      { x: 335, y: 195, label: 'VIGILANCE SIGN-OFF' },
      { x: 380, y: 220, label: 'AUTHORITY APPROVAL' },
      { x: 295, y: 235, label: 'NOC RECORD' },
      { x: 260, y: 215, label: '90-DAY REMINDER' },
      { x: 190, y: 310, label: 'HASH-CHAIN HEAD' },
      { x: 265, y: 345, label: 'AUDIT EVENT' },
      { x: 145, y: 395, label: 'MATURITY LEDGER' },
      { x: 165, y: 165, label: 'ZERO FUNDS TRANSFER' },
      { x: 75, y: 445, label: 'STATUTORY PROOF' },
    ],
    outputLines: [
      [0, 2], [1, 2], [2, 3], [2, 4], [1, 5], [1, 6], [6, 7], [6, 8], [1, 9], [8, 10]
    ],
  },
];

export function InfographicBackground() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[slideIndex];

  return (
    <div className="landing-infographic-container" aria-hidden="true">
      {/* Background Matrix Dot Coordinate Grid */}
      <div className="landing-infographic-grid" />

      {/* 3-Column Visual Layout (Trigger -> Code Function -> Output DAG Network) */}
      <div className="landing-infographic-stage">
        {/* ========================================================
            COLUMN 1 (LEFT): Event Trigger Card & Coordinate Markers
            ======================================================== */}
        <div className="infographic-col infographic-col-left">
          {/* Subtle cross grid markers */}
          <div className="infographic-cross-grid">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="infographic-cross">+</span>
            ))}
          </div>

          {/* Context tags */}
          {slide.tags.map((tag, i) => (
            <span
              key={i}
              className="infographic-context-tag"
              style={{ top: tag.top, left: tag.left, right: tag.right }}
            >
              {tag.text}
            </span>
          ))}

          {/* Floating Trigger Notification Card */}
          <div className="infographic-toast-card" style={slide.trigger.toastStyle}>
            <div className="infographic-toast-header">
              <div className="infographic-avatar">
                {slide.trigger.avatarType === 'woman' ? (
                  <svg viewBox="0 0 32 32" fill="none" className="avatar-svg">
                    <circle cx="16" cy="16" r="16" fill="#1e293b" />
                    <circle cx="16" cy="12" r="6" fill="#cbd5e1" />
                    <path d="M7 27c0-5 4-8 9-8s9 3 9 8" fill="#cbd5e1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 32 32" fill="none" className="avatar-svg">
                    <circle cx="16" cy="16" r="16" fill="#0f172a" />
                    <circle cx="16" cy="13" r="5.5" fill="#e2e8f0" />
                    <path d="M8 28c0-4.5 3.5-7.5 8-7.5s8 3 8 7.5" fill="#e2e8f0" />
                  </svg>
                )}
                <span className="avatar-arrow">↑</span>
              </div>
              <div className="infographic-toast-meta">
                <span className="toast-source">{slide.trigger.source}</span>
                <span className="toast-time">{slide.trigger.time}</span>
              </div>
            </div>
            <div className="infographic-toast-body">
              <span className="toast-user">{slide.trigger.user}</span>{' '}
              <span className="toast-msg">
                {slide.trigger.message.replace(slide.trigger.user, '').trim()}
              </span>
            </div>
          </div>

          {/* Trigger point and label */}
          <div className="infographic-trigger-anchor" style={slide.trigger.triggerStyle}>
            <span className="trigger-label">{slide.trigger.label}</span>
            <span className="trigger-box" />
          </div>
        </div>

        {/* ========================================================
            COLUMN 2 (MIDDLE): Code Matrix & Function Action Tag
            ======================================================== */}
        <div className="infographic-col infographic-col-center">
          <div className="infographic-code-window">
            {slide.code.map((line, idx) => (
              <div key={idx} className={`infographic-code-line type-${line.type || 'plain'}`}>
                {line.text}
              </div>
            ))}
          </div>

          {/* Central Function/Agent Action Tag */}
          <div className="infographic-action-tag" style={slide.functionTag.style}>
            <span className="action-tag-box" />
            <span className="action-tag-text">{slide.functionTag.label}</span>
          </div>
        </div>

        {/* ========================================================
            COLUMN 3 (RIGHT): Knowledge DAG Network & Output Root
            ======================================================== */}
        <div className="infographic-col infographic-col-right">
          {/* Background dot coordinates */}
          <div className="infographic-cross-grid right-grid">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="infographic-dot">•</span>
            ))}
          </div>

          {/* SVG Network Graph */}
          <svg className="infographic-graph-svg" viewBox="0 0 420 520" fill="none">
            {/* Output Node Position */}
            {(() => {
              const rootX = slide.id === 2 ? 30 : 25;
              const rootY = slide.id === 2 ? 395 : 210;

              return (
                <>
                  {/* Radiating lines from Output root */}
                  {slide.outputNodes.map((node, i) => (
                    <line
                      key={`line-out-${i}`}
                      x1={rootX}
                      y1={rootY}
                      x2={node.x}
                      y2={node.y}
                      stroke="rgba(255, 255, 255, 0.22)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Inter-node DAG connections */}
                  {slide.outputLines.map(([fromIdx, toIdx], i) => {
                    const from = slide.outputNodes[fromIdx];
                    const to = slide.outputNodes[toIdx];
                    if (!from || !to) return null;
                    return (
                      <line
                        key={`line-inter-${i}`}
                        x1={from.x}
                        y1={from.y}
                        x2={nodeSafe(to).x}
                        y2={nodeSafe(to).y}
                        stroke="rgba(255, 255, 255, 0.16)"
                        strokeWidth="1"
                        strokeDasharray="2 3"
                      />
                    );
                  })}

                  {/* Orange Output Root Node */}
                  <rect x={rootX - 6} y={rootY - 6} width="12" height="12" fill="#FF3E00" />
                  <text
                    x={rootX + 12}
                    y={rootY + 4}
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="700"
                    letterSpacing="0.08em"
                    fontFamily="monospace"
                  >
                    OUTPUT
                  </text>
                </>
              );
            })()}

            {/* Connected Leaf Nodes */}
            {slide.outputNodes.map((node, i) => (
              <g key={`node-${i}`} className="graph-node-group">
                <rect x={node.x - 2.5} y={node.y - 2.5} width="5" height="5" fill="rgba(255, 255, 255, 0.65)" />
                <text
                  x={node.x + 8}
                  y={node.y + 3.5}
                  fill="rgba(255, 255, 255, 0.6)"
                  fontSize="9.5"
                  fontWeight="600"
                  fontFamily="monospace"
                  letterSpacing="0.06em"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Micro Footer link in bottom right */}
          <div className="infographic-micro-learn">
            <span>LEARN MORE →</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          ANIMATED DATA BEAM CONNECTING: TRIGGER -> FUNCTION -> OUTPUT
          ======================================================== */}
      <svg className="infographic-beam-svg" viewBox="0 0 1000 650" preserveAspectRatio="none">
        {/* Dynamic laser connecting the three stages */}
        <path
          d={slide.beamPath}
          stroke="rgba(255, 255, 255, 0.7)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d={slide.beamPath}
          stroke="#FF3E00"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="14 18"
          className="infographic-beam-pulse"
        />
        {/* Moving data packet */}
        <circle key={slideIndex} r="4.5" fill="#FF3E00" className="infographic-beam-particle">
          <animateMotion
            path={slide.beamPath}
            dur="3.0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Subtle Slide Carousel Indicators */}
      <div className="infographic-slide-indicator">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`slide-indicator-dot ${i === slideIndex ? 'active' : ''}`}
            onClick={() => setSlideIndex(i)}
            title={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function nodeSafe(node: { x: number; y: number; label: string } | undefined) {
  return node || { x: 0, y: 0, label: '' };
}
