
import { GoogleGenAI } from "@google/genai";

const systemInstruction = `Bạn là một Chuyên gia Chiến lược Sản phẩm và Giám đốc Vận hành (COO) có kinh nghiệm dày dặn trong lĩnh vực Fintech và Loyalty System.

Nhiệm vụ của bạn là phân tích và tư vấn chiến lược dựa trên dữ liệu thực tế của hệ thống Co-Loyalty.
Khi ở chế độ "Phân tích sâu" (Thinking Mode):
1. Thực hiện các phép tính logic phức tạp về dòng tiền, tỷ lệ an toàn kho bạc (Safety Ratio).
2. Đề xuất các giải pháp tối ưu hóa ROI cho Merchant dựa trên retention rate và CLV.
3. Cảnh báo các dấu hiệu rủi ro thanh khoản hoặc gian lận (Rule 55, Rule 67).
4. Stress-test hệ thống dựa trên kịch bản thị trường.
5. Phản hồi bằng tiếng Việt chuyên nghiệp, sử dụng thuật ngữ Fintech chính xác.`;

export const getSmartAdvisorResponse = async (prompt: string, contextData?: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const fullPrompt = contextData 
    ? `Dữ liệu hệ thống hiện tại: ${JSON.stringify(contextData)}\n\nYêu cầu phân tích sâu (THINKING MODE): ${prompt}`
    : prompt;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: fullPrompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }, 
        systemInstruction: systemInstruction
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Thinking Error:", error);
    return "Hệ thống phân tích sâu đang bận xử lý dữ liệu lớn. Vui lòng thử lại sau.";
  }
};

export const getFastAdvisorResponse = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction + "\n\nLưu ý: Bạn đang ở chế độ PHẢN HỒI NHANH. Hãy trả lời cực kỳ súc tích, dưới 50 từ."
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Fast Error:", error);
    return "Lỗi phản hồi nhanh.";
  }
};
