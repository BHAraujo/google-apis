import type { PromptApi } from "../service/promptApi.js";
import type { PromptApiView } from "../views/promptApiView.js";


export class PromptApiController {
    private view: PromptApiView
    private promptApi: PromptApi
    private prompt:string = ''

    constructor(view: PromptApiView, promptApi: PromptApi) {
        this.view = view
        this.promptApi = promptApi
    
    }

    async submitPrompt(){
        this.view.onFormSubmit(async (event)=> {
            event.preventDefault()
            this.view.setStatusOutput("Waiting for the prompt...")
            this.view.setPromptOutput('')
            this.view.setStatusOutput("Thinking for the answer...")
            
            setTimeout(async () => {
                this.prompt = this.view.getPromptInput()
                this.view.setStatusOutput('')
                this.view.setPromptOutput(await this.promptApi.sendPrompt(this.prompt))
            }, 1000); 
        })
    }

    displayPrompt(){
        this.view.setPromptOutput('test')
    }
}