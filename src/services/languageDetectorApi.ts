import type {Availability} from '../types/generalTypes.js'


export class LanguageDetectorApi {
    private availability: Availability = 'undefined'
    private session!: LanguageDetector
    

    async healthCheck() {
        try {
            this.availability = await LanguageDetector.availability()

            if(this.availability !== 'available')
                throw new Error(`The Prompt Api avaialability status is ${this.availability}`);

            return this.availability     
            
        } catch (error) {
           return error
        }   
    }

    async createSession() {
        try {   
            this.session = await LanguageDetector.create()
        return this.session
            
        } catch (error) { 
            return error
        }
    } 

    async sendPrompt(content: string){
        const languanges = []
        const accuracy:number[] = []
        try {
            await this.createSession()
            const response = await this.session.detect(content);
            for (const result of response) {
                languanges.push(result.detectedLanguage)
                accuracy.push(result.confidence ?? 0)                
        }
            return languanges.map((language, i) => ({ language, accuracy: accuracy[i] }));
        } catch (error) {
            return error
        }
    }
}


