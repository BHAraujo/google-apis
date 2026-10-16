export class PromptApiView {
    private form: HTMLFormElement
    private statusOutput: HTMLOutputElement;
    private promptOutput: HTMLOutputElement;
    

    constructor() {
        this.statusOutput = document.querySelector<HTMLOutputElement>('#statusOutput')!;
        this.promptOutput = document.querySelector<HTMLOutputElement>('#promptOutput')!;
        this.form = document.querySelector<HTMLFormElement>('#prompt-form')!;
    }

    onFormSubmit(handler: (event: SubmitEvent) => void) {
        this.form.addEventListener('submit', handler)
    }
    
    getPromptInput():string {
        return this.form.querySelector<HTMLInputElement>('#promptApi')!.value
    }


    setStatusOutput(text: string | any) {
        this.statusOutput.textContent = text;
    }

    setPromptOutput(text: string | any) {
        this.promptOutput.textContent = text;
    }
}

