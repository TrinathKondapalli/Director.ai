import { GoogleGenAI, Type } from '@google/genai';
import { InitialBrief, DiscoveryQuestion, DiscoveryAnswer, StrategicAnalysis, PositioningOption, BrandPersonality, StrategyWorkspaceData } from '../types/brandStrategist';

function getAiClient() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'DUMMY_KEY';
  return new GoogleGenAI({ apiKey });
}

const STRATEGY_SYSTEM_PROMPT = `You are Director.ai's Elite Brand Strategist.
You act as a senior consultant guiding a client to develop a highly differentiated, defensible brand strategy.
You NEVER present assumptions as verified facts.
You challenge weak assumptions, identify market gaps, and synthesize clear strategic direction.
Always remain professional, insightful, and structured.`;

export async function generateNextDiscoveryQuestion(
  brief: InitialBrief,
  history: { question: DiscoveryQuestion, answer: DiscoveryAnswer }[]
): Promise<DiscoveryQuestion | null> {
  if (history.length >= 5) {
    return null;
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'DUMMY_KEY') {
    const categories: ('BUSINESS' | 'AUDIENCE' | 'MARKET' | 'COMPETITORS' | 'PERSONALITY')[] = ['BUSINESS', 'AUDIENCE', 'MARKET', 'COMPETITORS', 'PERSONALITY'];
    const category = categories[history.length % categories.length];
    const defaultQuestions = [
      "What is the single biggest bottleneck preventing your brand from scaling right now?",
      "Who is your ideal customer, and what specific frustration leads them to seek your solution?",
      "What is your unique defensible moat compared to your top 3 direct competitors?",
      "How would you describe your brand's core personality if it were a human mentor?",
      "What is the core brand promise or positioning statement you want customers to remember?"
    ];
    return {
      id: Math.random().toString(36).substring(2, 9),
      category: category,
      questionText: defaultQuestions[history.length % defaultQuestions.length]
    };
  }

  const promptText = `
Given this initial business brief:
Name: ${brief.brandName}
Desc: ${brief.description}
Industry: ${brief.industry}
Market: ${brief.market}
Goal: ${brief.goal}

Here is the conversation history so far:
${history.map((h, i) => `Q${i+1}: [${h.question.category}] ${h.question.questionText}\nA${i+1}: ${h.answer.answerText}`).join('\n\n')}

Your task: Generate the NEXT most critical strategic question to ask the client.
Categories available: BUSINESS, AUDIENCE, MARKET, COMPETITORS, PERSONALITY.
Ask only ONE highly targeted question that uncovers missing information or challenges assumptions.
Make it conversational but professional. Do not ask generic questions we already know the answer to.`;

  const schemaObj = {
    type: Type.OBJECT,
    properties: {
      category: {
        type: Type.STRING,
        enum: ['BUSINESS', 'AUDIENCE', 'MARKET', 'COMPETITORS', 'PERSONALITY'],
        description: "The strategic category of the question"
      },
      questionText: {
        type: Type.STRING,
        description: "The actual question to ask the client"
      }
    },
    required: ["category", "questionText"]
  };

  const response = await getAiClient().models.generateContent({
    model: 'gemini-2.5-flash',
    contents: promptText,
    config: {
      systemInstruction: STRATEGY_SYSTEM_PROMPT,
      responseMimeType: 'application/json',
      responseSchema: schemaObj as any,
      temperature: 0.7,
    }
  });

  if (response.text) {
    const parsed = JSON.parse(response.text);
    return {
      id: Math.random().toString(36).substring(2, 9),
      category: parsed.category,
      questionText: parsed.questionText
    };
  }
  return null;
}

export async function generateStrategyWorkspace(
  brief: InitialBrief,
  history: { question: DiscoveryQuestion, answer: DiscoveryAnswer }[]
): Promise<StrategyWorkspaceData> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'DUMMY_KEY') {
    return {
      businessFoundation: `${brief.brandName} is a high-growth brand operating in the ${brief.industry} market, focused on delivering ${brief.goal}.`,
      targetAudience: brief.market || "Targeting digital-first consumers seeking high-efficiency solutions.",
      marketLandscape: `Operating in the competitive ${brief.industry} space with rapid innovation cycles.`,
      competitorAnalysis: "Competing against traditional legacy providers by offering modern automated workflows.",
      customerPainPoints: "Frictionful setup processes, lack of clear visual communication, and slow delivery times.",
      differentiation: "AI-driven automated publication workflows and instant strategic content generation.",
      brandPurpose: `Empower brands in ${brief.industry} with effortless creative authority.`,
      brandVoice: "Authoritative, concise, visionary, and grounded in editorial precision.",
      mission: `Deliver world-class strategic content for ${brief.brandName} without manual operational overhead.`,
      vision: `Set the global gold standard for ${brief.industry} content automation.`,
      brandValues: ["Editorial Quality", "Speed & Precision", "Transparent Integrity", "User-Centric Innovation"],
      brandPersonality: {
        primary: "Visionary Strategist",
        secondary: "Editorial Director",
        tertiary: "Tech Innovator",
        avoid: ["Corporate Jargon", "Generic Hype", "Passive Phrasing"],
        communicationStyle: "Direct, structured, and insightful.",
        tone: "Confident and professional."
      },
      brandArchetype: "The Creator / The Sage",
      messagingPillars: [
        "Uncompromising Design Authority",
        "Instant Operational Speed",
        "Data-Backed Audience Connection"
      ],
      valueProposition: `${brief.brandName} transforms ${brief.description} into high-converting branded assets instantly.`,
      taglineDirections: [
        "Create Without Boundaries.",
        "Authority Built in Seconds.",
        "The Future of Branded Strategy."
      ],
      customerExperiencePrinciples: [
        "Zero-Friction Onboarding",
        "Consistent Editorial Standards",
        "Proactive Strategic Insights"
      ],
      visualDirection: "Warm off-white paper texture with fine blueprint grid lines, Bebas Neue headlines, and Cobalt Blue accents.",
      strategicRecommendations: [
        "Focus on high-frequency LinkedIn & Instagram editorial publishing.",
        "Maintain strict typography rules for instant brand recognition.",
        "Leverage 10-second UGC ad scripts to drive conversion."
      ]
    };
  }
  const promptText = `
You are the senior brand strategist.
Based on the initial brief and the discovery interview, synthesize the complete brand strategy.

Brief:
Name: ${brief.brandName}
Desc: ${brief.description}
Industry: ${brief.industry}
Market: ${brief.market}
Goal: ${brief.goal}

Interview History:
${history.map(h => `Q: ${h.question.questionText}\nA: ${h.answer.answerText}`).join('\n\n')}

Generate the complete 20-point strategic workspace.
Be highly specific, insightful, and actionable. Do not use generic corporate jargon. Ensure the positioning is actually differentiated in the market.`;

  const schemaObj = {
    type: Type.OBJECT,
    properties: {
      businessFoundation: { type: Type.STRING },
      targetAudience: { type: Type.STRING },
      marketLandscape: { type: Type.STRING },
      competitorAnalysis: { type: Type.STRING },
      customerPainPoints: { type: Type.STRING },
      differentiation: { type: Type.STRING },
      brandPurpose: { type: Type.STRING },
      brandVoice: { type: Type.STRING },
      mission: { type: Type.STRING },
      vision: { type: Type.STRING },
      brandValues: { type: Type.ARRAY, items: { type: Type.STRING } },
      brandPersonality: {
        type: Type.OBJECT,
        properties: {
          primary: { type: Type.STRING },
          secondary: { type: Type.STRING },
          tertiary: { type: Type.STRING },
          avoid: { type: Type.ARRAY, items: { type: Type.STRING } },
          communicationStyle: { type: Type.STRING },
          tone: { type: Type.STRING }
        },
        required: ["primary", "secondary", "tertiary", "avoid", "communicationStyle", "tone"]
      },
      brandArchetype: { type: Type.STRING },
      messagingPillars: { type: Type.ARRAY, items: { type: Type.STRING } },
      valueProposition: { type: Type.STRING },
      taglineDirections: { type: Type.ARRAY, items: { type: Type.STRING } },
      customerExperiencePrinciples: { type: Type.ARRAY, items: { type: Type.STRING } },
      visualDirection: { type: Type.STRING },
      strategicRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: [
      "businessFoundation", "targetAudience", "marketLandscape", "competitorAnalysis",
      "customerPainPoints", "differentiation", "brandPurpose", "brandVoice", "mission", "vision",
      "brandValues", "brandPersonality", "brandArchetype", "messagingPillars",
      "valueProposition", "taglineDirections", "customerExperiencePrinciples",
      "visualDirection", "strategicRecommendations"
    ]
  };

  const response = await getAiClient().models.generateContent({
    model: 'gemini-2.5-flash',
    contents: promptText,
    config: {
      systemInstruction: STRATEGY_SYSTEM_PROMPT,
      responseMimeType: 'application/json',
      responseSchema: schemaObj as any,
      temperature: 0.8,
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as StrategyWorkspaceData;
  }
  throw new Error("Failed to generate strategy");
}
