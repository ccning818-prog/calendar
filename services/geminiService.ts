
import { GoogleGenAI, Type } from "@google/genai";
import { MonthlyInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMonthlyInsights = async (monthName: string, year: number): Promise<MonthlyInsight> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `请为 ${year}年${monthName} 提供一句励志名言和一条高效办公/生活的建议。
      特别注意：如果该月包含中国重要的传统节日（如春节、除夕、中秋等），请在建议中体现如何平衡节日休息与个人成长，或给出节日相关的温馨提示。请使用中文回答。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            month: { type: Type.STRING },
            quote: { type: Type.STRING },
            advice: { type: Type.STRING }
          },
          required: ["month", "quote", "advice"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching insights:", error);
    return {
      month: monthName,
      quote: "成功的秘诀在于每天的点滴努力。",
      advice: "保持专注，哪怕是在忙碌的节日期间，也要留一点时间给自己静思。"
    };
  }
};
