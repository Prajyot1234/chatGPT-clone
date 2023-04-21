import openai from "./chatgpt";

const query = async (prompt: string, model: string) => {
    const res = await openai.createCompletion({
        model,
        prompt,
        temperature : 0.3,
        top_p : 1,
        max_tokens : 2000,
        frequency_penalty : 0,
        presence_penalty : 0,
    })
    .then( res => {
        return res.data.choices[0].text
    })
    .catch( err => `ChatGPT unable to proccess your request : Error: ${err.message}`)
    return res;
}

export default query;