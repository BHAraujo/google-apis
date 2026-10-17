import type {Availability} from '../types/generalTypes.js'


export class TranslatorApi {
    private availability: Availability = 'undefined'
    private session!: Translator
    
    async healthCheck() {
        try {
            this.availability = await Translator.availability({
            sourceLanguage: 'en',
            targetLanguage: 'pt',
            });

            if(this.availability !== 'available')
                throw new Error(`The Translator Api availability status is ${this.availability}`);

            return this.availability     
            
        } catch (error) {
           return error
        }   
    }

    async createSession() {
        try {   
            this.session = await Translator.create({
            sourceLanguage: 'en',
            targetLanguage: 'pt',
            });
            
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
            const response = await this.session.translate(content);
            return response

        } catch (error) {
            return error
        }
    }
}


