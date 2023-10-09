const { Configuration, OpenAIApi } = require("openai")

async function openAi(body) {
    const text_explode = body.split(" ", 2)
    if (text_explode[0] == "/bot") {
        
        try {
            const config = new Configuration({
                apiKey: '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',
            })
        
            const openAi = new OpenAIApi(config)
        
            // const cet = await openAi.chat.completions.create({
            //     messages: [{ role: 'user', content: 'Say this is a test' }],
            //     model: 'gpt-3.5-turbo',
            // })
        
            // const response = await openAi.createCompletion({
            //     model: "text-davinci-003",
            //     prompt: 'mencoba saja',
            //     temperature: 0.3,
            //     max_tokens: 3000,
            //     top_p: 1.0,
            //     frequency_penalty: 0.0,
            //     presence_penalty: 0.0,
            // });
        
            // console.log('cet', cet.choices)
    
            // console.log('response', response.data)
            const completion = await openAi.createCompletion({
                model: "text-davinci-002",
                prompt: "Hello world",
              });
    
            console.log('response', completion.data)
            
        } catch (error) {
            console.log('error dong', error)
            
        }
    }
}

module.exports = openAi