export class SummarizerApiView {
    private form: HTMLFormElement
    private statusOutput: HTMLOutputElement;
    private summarizerOutput: HTMLOutputElement;
    

    constructor() {
        this.statusOutput = document.querySelector<HTMLOutputElement>('#statusOutput')!;
        this.summarizerOutput = document.querySelector<HTMLOutputElement>('#summarizer-api-output')!;
        this.form = document.querySelector<HTMLFormElement>('#summarizer-api-form')!;
    }

    onFormSubmit(handler: (event: SubmitEvent) => void) {
        this.form.addEventListener('submit', handler)
    }
    
    getSummarizerInput():string {
        return this.form.querySelector<HTMLInputElement>('#summarizer-api-textarea')!.value
    }

    setStatusOutput(text: string | any) {
        this.statusOutput.textContent = text;
    }

    setSummarizerOutput(text: string | any) {
        this.summarizerOutput.textContent = text;
    }


}

