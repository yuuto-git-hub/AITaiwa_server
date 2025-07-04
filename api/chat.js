// 実験用なのでフロントに直書きですが、本番では絶対サーバーで管理してね
const API_KEY = "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"; // 例: sk-xxxxxxx

const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

sendButton.addEventListener("click", async () => {
  const text = userInput.value;
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const reply = await getAIResponse(text);
  addMessage(reply, "bot");
});

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function getAIResponse(userText) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "あなたは親切な日本語のアシスタントです。" },
          { role: "user", content: userText }
        ],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    return "エラーが発生しました。";
  }
}
