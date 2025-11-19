import { GoogleGenAI, Type } from "@google/genai";
import { ItineraryRequest } from "../types";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY is missing");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const generateTravelItinerary = async (request: ItineraryRequest): Promise<string> => {
  const ai = getClient();
  if (!ai) return "错误：未配置 API Key，请检查环境设置。";

  const cityMap: Record<string, string> = {
    'Bangkok': '曼谷',
    'Pattaya': '芭提雅',
    'Both': '曼谷和芭提雅'
  };

  const travelerMap: Record<string, string> = {
    'Solo': '独自旅行',
    'Couple': '情侣',
    'Family': '家庭',
    'Friends': '朋友'
  };

  // Translate interests to Chinese for the prompt context if needed, 
  // or just pass them directly if they are already mapped in UI. 
  // Assuming UI sends English keys, we can just let the model interpret or map them.
  
  const prompt = `
    请为${cityMap[request.city] || request.city}制定一份详细的逐日旅游行程。
    时长：${request.days} 天。
    旅行者类型：${travelerMap[request.travelerType] || request.travelerType}。
    兴趣偏好：${request.interests.join(', ')}。
    
    请使用 Markdown 格式美化排版。
    请使用中文（简体）回答。
    地点名称请加粗。
    包含午餐和晚餐的具体美食推荐。
    每一天添加一个“旅行小贴士”。
    保持语气兴奋且乐于助人。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "无法生成行程。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "抱歉，生成行程时遇到错误，请稍后再试。";
  }
};

export const askAIAboutAttraction = async (attractionName: string, city: string): Promise<string> => {
    const ai = getClient();
    if (!ai) return "错误：未配置 API Key。";
  
    const prompt = `
      请用中文提供关于泰国${city}的景点“${attractionName}”的3个鲜为人知的有趣事实或隐藏秘密。
      另外，请建议避开人群或拍摄最佳照片的最佳时间。
      请保持简洁（150字以内）。
    `;
  
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text || "暂无详细信息。";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "暂时无法获取 AI 见解。";
    }
  };