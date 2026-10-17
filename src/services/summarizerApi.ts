import type {Availability} from '../types/generalTypes.js'


const options = {
sharedContext: 'These are requests to summarize news from a sports websites. The users expect a response in English.',
  type: 'key-points',
  format: 'markdown',
  length: 'medium',
  expectedInputLanguages: ['en'],
  expectedContextLanguages: ['en'],
} as const



export class SummarizerApi {
    private availability: Availability = 'undefined'
    private session!: Summarizer    

    async healthCheck() {
        try {
            this.availability = await Summarizer.availability()

            if(this.availability !== 'available')
                throw new Error(`The Summarizer Api avaialability status is ${this.availability}`);

            return this.availability     
            
        } catch (error) {
           return error
        }   
    }

    async createSession() {
        try {
            if (navigator.userActivation.isActive) {
            this.session = await Summarizer.create(options)
            return this.session
        }    
        } catch (error) {
            return this.session    
        }
    }

    async sendPrompt(content: string){
        await this.createSession()
        try {
            const result = await this.session.summarize(content, {
            context: 'This article is intended for the soccer',
            });
            return result
        } catch (error) {
            return error
        }
    }
}

