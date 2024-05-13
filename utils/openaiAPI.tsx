import axios, { AxiosError } from 'axios';



export async function generateRecipe(prompt: string): Promise<string> {
    

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4",
                messages: [{
                    role: "user",
                    content: `Generate a complete recipe in HTML format for the dish described here: ${prompt}. Please ensure the HTML is clean and properly formatted for display on a web page. Include tags for sections such as ingredients and steps. Do not include any line breaks do not use the return character, you should write everything in one single line of html or other characters that might interfere with HTML rendering.`
                }],
                max_tokens: 1000,
                temperature: 0
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const rawResponse = JSON.stringify(response.data["choices"][0]["message"]["content"]);
              
        return rawResponse;
    } catch (error) {
        let errorMessage = "An error occurred while fetching the recipe";
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                errorMessage = (axiosError.response.data as { message?: string })?.message || JSON.stringify(axiosError.response.data);
            } else {
                errorMessage = axiosError.message;
            }
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.error(`Error: ${errorMessage}`);
        return "Failed to fetch recipe. Please check the logs for more details.";
    }
}
