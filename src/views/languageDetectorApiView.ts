export class LanguageDetectorApiView {
    private form: HTMLFormElement
    private statusOutput: HTMLOutputElement;
    private languageDetectorOutput: HTMLOutputElement;
    

    constructor() {
        this.statusOutput = document.querySelector<HTMLOutputElement>('#statusOutput')!;
        this.languageDetectorOutput = document.querySelector<HTMLOutputElement>('#language-detector-output')!;
        this.form = document.querySelector<HTMLFormElement>('#language-detector-api-form')!;
    }

    onFormSubmit(handler: (event: SubmitEvent) => void) {
        this.form.addEventListener('submit', handler)
    }
    
    getPromptInput():string {
        return this.form.querySelector<HTMLInputElement>('#language-detector-textarea')!.value
    }

    setStatusOutput(text: string | any) {
        this.statusOutput.textContent = text;
    }

    setlanguageDetectorOutput(text: string | any) {
        this.languageDetectorOutput.textContent = text;
    }
}

