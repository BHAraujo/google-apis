export class TranslatorApiView {
    private form: HTMLFormElement
    private statusOutput: HTMLOutputElement;
    private translatorApiOutput: HTMLOutputElement;
    

    constructor() {
        this.form = document.querySelector<HTMLFormElement>('#translator-api-form')!;
        this.statusOutput = document.querySelector<HTMLOutputElement>('#statusOutput')!;
        this.translatorApiOutput = document.querySelector<HTMLOutputElement>('#translator-api-output')!;
        
    }

    onFormSubmit(handler: (event: SubmitEvent) => void) {
        this.form.addEventListener('submit', handler)
    }
     
    getPromptInput():string {
        return this.form.querySelector<HTMLTextAreaElement>('#translator-api-textarea')!.value
    }

    setStatusOutput(text: string | any) {
        this.statusOutput.textContent = text;
    }

    seTranslatorOutput(text: string | any) {
        this.translatorApiOutput.textContent = text;
    }
}

