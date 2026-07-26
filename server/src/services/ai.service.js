const { GoogleGenAI, Type } = require('@google/genai');

const initAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in the environment.');
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

const getModel = () => 'gemini-2.5-flash';

const generateProjectTasks = async (description) => {
  const ai = initAI();
  const prompt = `Based on the following project description, generate a comprehensive list of tasks needed to complete it.
  
Project Description:
${description}

Generate the response in JSON format matching the requested schema.`;

  const response = await ai.models.generateContent({
    model: getModel(),
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            priority: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Urgent'] },
            labels: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['title', 'description', 'priority', 'labels']
        }
      }
    }
  });

  return JSON.parse(response.text);
};

const rewriteDescription = async (text) => {
  const ai = initAI();
  const prompt = `Rewrite the following task description to sound highly professional, clear, and actionable. Fix any grammatical errors and improve the structure.
  
Original:
${text}`;

  const response = await ai.models.generateContent({
    model: getModel(),
    contents: prompt,
  });

  return response.text;
};

const summarizeDiscussion = async (comments) => {
  const ai = initAI();
  const prompt = `Summarize the following project discussion. Highlight the main decisions made, open questions, and any action items.

Discussion:
${comments.join('\n')}`;

  const response = await ai.models.generateContent({
    model: getModel(),
    contents: prompt,
  });

  return response.text;
};

const generateSprintPlan = async (backlogTasks) => {
  const ai = initAI();
  const prompt = `Given the following backlog of tasks, suggest an optimal 2-week sprint plan. 
Select tasks based on priority and natural dependencies.

Backlog:
${JSON.stringify(backlogTasks, null, 2)}

Provide the response in JSON format.`;

  const response = await ai.models.generateContent({
    model: getModel(),
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sprintGoal: { type: Type.STRING },
          selectedTaskTitles: { type: Type.ARRAY, items: { type: Type.STRING } },
          rationale: { type: Type.STRING }
        },
        required: ['sprintGoal', 'selectedTaskTitles', 'rationale']
      }
    }
  });

  return JSON.parse(response.text);
};

const estimateTime = async (taskDetails) => {
  const ai = initAI();
  const prompt = `Estimate the completion time for the following task based on industry standards for software development.
  
Task:
${taskDetails}

Provide the response in JSON format with a numeric value and unit (Hours or Days).`;

  const response = await ai.models.generateContent({
    model: getModel(),
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          estimate: { type: Type.NUMBER },
          unit: { type: Type.STRING, enum: ['Hours', 'Days'] },
          reasoning: { type: Type.STRING }
        },
        required: ['estimate', 'unit', 'reasoning']
      }
    }
  });

  return JSON.parse(response.text);
};

const suggestPriority = async (taskDetails) => {
  const ai = initAI();
  const prompt = `Analyze the following task and suggest a priority level.
  
Task:
${taskDetails}

Provide the response in JSON format.`;

  const response = await ai.models.generateContent({
    model: getModel(),
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          priority: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Urgent'] },
          reasoning: { type: Type.STRING }
        },
        required: ['priority', 'reasoning']
      }
    }
  });

  return JSON.parse(response.text);
};

const suggestRisks = async (projectDetails) => {
  const ai = initAI();
  const prompt = `Analyze the following project details and identify potential risks and bottlenecks.

Project Details:
${projectDetails}`;

  const response = await ai.models.generateContent({
    model: getModel(),
    contents: prompt,
  });

  return response.text;
};

const generateReleaseNotes = async (completedTasks) => {
  const ai = initAI();
  const prompt = `Generate professional release notes for a software product based on the following completed tasks.
Organize them logically (e.g., Features, Bug Fixes).

Completed Tasks:
${JSON.stringify(completedTasks, null, 2)}`;

  const response = await ai.models.generateContent({
    model: getModel(),
    contents: prompt,
  });

  return response.text;
};

module.exports = {
  generateProjectTasks,
  rewriteDescription,
  summarizeDiscussion,
  generateSprintPlan,
  estimateTime,
  suggestPriority,
  suggestRisks,
  generateReleaseNotes,
};
