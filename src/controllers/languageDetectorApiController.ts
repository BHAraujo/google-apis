import type { LanguageDetectorApi } from "../services/languageDetectorApi.js"
import type { LanguageDetectorApiView } from "../views/languageDetectorApiView.js";


export class LanguageDetectorApiController {
    private view: LanguageDetectorApiView
    private languageDetectorApi: LanguageDetectorApi
    private prompt:string = ''

    constructor(view: LanguageDetectorApiView, languageDetectorApi: LanguageDetectorApi) {
        this.view = view
        this.languageDetectorApi = languageDetectorApi
    
    }

    async submitPrompt(){
        this.view.onFormSubmit(async (event)=> {
            event.preventDefault()
            const result = await this.languageDetectorApi.sendPrompt(this.prompt)
            
            this.view.setStatusOutput("Waiting for the prompt...")
            this.view.setlanguageDetectorOutput('')
            this.view.setStatusOutput("Thinking for the answer...")
            
            setTimeout(async () => {
                this.prompt = this.view.getPromptInput()
                this.view.setStatusOutput('')
                this.view.setlanguageDetectorOutput(`Language detected was ${JSON.stringify(result)}`)
            }, 1000); 
        })
    }

}