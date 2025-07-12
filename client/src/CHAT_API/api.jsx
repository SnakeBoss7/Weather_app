
import Together from "together-ai";

const together = new Together({
    apiKey: "d7d0b6c58e52f937c8730086974749e12a4a7e5995cc51de7c0c8a0e021ef6c9", // Replace with your API key
});

export async function queryTogetherAI(prompt) {
    try {
        const response = await together.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching from Together AI:", error);
        return "Error: Failed to fetch AI response.";
    }
}
