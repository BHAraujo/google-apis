import type { SummarizerApi } from "../service/summarizerApi.js";
import type { SummarizerApiView } from "../views/summarizerApiView.js";


export class SummarizerApiController {
    private view: SummarizerApiView
    private summarizerApi: SummarizerApi
    private prompt:string = ''

    constructor(view: SummarizerApiView, summarizerApi: SummarizerApi) {
        this.view = view
        this.summarizerApi = summarizerApi
    
    }

    async submitPrompt(){
        this.view.onFormSubmit(async (event)=> {
            event.preventDefault()
            this.view.setStatusOutput("Waiting for the prompt...")
            this.view.setSummarizerOutput('')
            this.view.setStatusOutput("Thinking for the answer...")
            
            setTimeout(async () => {
                this.prompt = this.view.getSummarizerInput()
                this.view.setStatusOutput('')
                this.view.setSummarizerOutput(await this.summarizerApi.sendPrompt(this.prompt))
            }, 1000); 
        })
    }
}