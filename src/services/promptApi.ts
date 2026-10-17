import type {Availability} from '../types/generalTypes.js'


const initialPrompts: [LanguageModelSystemMessage, ...LanguageModelMessage[]] = [
  { role: 'system', content: 'You are a helpful and friendly assistant.' },
  { role: 'user', content: 'What is the capital of Italy?' },
  { role: 'assistant', content: 'The capital of Italy is Rome.' },
  { role: 'user', content: 'What language is spoken there?' },
  { role: 'assistant', content: 'The official language of Italy is Italian. [...]' },
] as const


export class PromptApi {
    private availability: Availability = 'undefined'
    private session!: LanguageModel

    async healthCheck() {
        try {
            this.availability = await LanguageModel.availability()

            if(this.availability !== 'available')
                throw new Error(`The Prompt Api avaialability status is ${this.availability}`);

            return this.availability     
            
        } catch (error) {
           return error
        }   
    }

    async createSession() {
        try {   
            this.session = await LanguageModel.create({
            samplingMode: "balanced",
            initialPrompts:initialPrompts
        })
        return this.session
            
        } catch (error) {
            return error
        }
    } 

    async sendPrompt(content: string){
    
        try {
            await this.createSession()
            const result = await this.session.prompt(content);
            return result
        } catch (error) {
            return error
        }
    }
}

