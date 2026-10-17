import type { TranslatorApi } from "../services/translatorApi.js";
import type { TranslatorApiView } from "../views/translatorApiView.js"

export class TranslatorApiController {
    private view: TranslatorApiView
    private translator: TranslatorApi
    private prompt:string = ''
  
    constructor(view: TranslatorApiView, translator: TranslatorApi) {
        this.view = view 
        this.translator = translator       
    }

    async submitPrompt(){
            this.view.onFormSubmit(async (event)=> {
            event.preventDefault();
            const prompt:string = this.view.getPromptInput()

            this.view.setStatusOutput("Waiting for the prompt...")
            this.view.setStatusOutput('')
            this.view.setStatusOutput("Thinking for the answer...")    

            setTimeout(async () => {
                this.prompt = this.view.getPromptInput()
                this.view.setTranslatorOutput(await this.translator.sendPrompt(this.prompt))
            }, 1000); 
        })
    }
}