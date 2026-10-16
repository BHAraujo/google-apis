import type { TranslatorApiView } from "../views/translatorApiView.js"

export class TranslatorApiController {
    private view: TranslatorApiView
  
    constructor(view: TranslatorApiView) {
        this.view = view       
    }

    async submitPrompt(){
            this.view.onFormSubmit(async (event)=> {
            event.preventDefault();
            const getInut:string = this.view.getPromptInput()

            // this.view.setStatusOutput("Waiting for the prompt...")

            console.log(getInut)
            this.view.setStatusOutput(getInut)
            // this.view.setPromptOutput('')
            // this.view.setStatusOutput("Thinking for the answer...")
            
            // setTimeout(async () => {
            //     this.prompt = this.view.getPromptInput()
            //     this.view.setStatusOutput('')
            //     this.view.setPromptOutput(await this.promptApi.sendPrompt(this.prompt))
            // }, 1000); 

        })
        
    }

    // displayPrompt(){
    //     this.view.setPromptOutput('test')
    // }
}