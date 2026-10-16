import { LanguageDetectorApiController } from "./controllers/languageDetectorApiController.js";
import { PromptApiController } from "./controllers/promptApiController.js";
import { SummarizerApiController } from "./controllers/summarizerApiController.js";
import { LanguageDetectorApi } from "./services/languageDetectorApi.js";
import { PromptApi } from "./services/promptApi.js";
import { SummarizerApi } from "./services/summarizerApi.js";
import { LanguageDetectorApiView } from "./views/languageDetectorApiView.js";
import { PromptApiView } from "./views/promptApiView.js";
import { SummarizerApiView } from "./views/summarizerApiView.js";


(async () => {
    // Starting Services
    const promptApi = new PromptApi()
    const summarizerApi = new SummarizerApi()
    const languageDetectorApi = new LanguageDetectorApi()

    // Starting view 
    const promptView = new PromptApiView()
    const summarizerView = new SummarizerApiView()
    const languageDetectorView = new LanguageDetectorApiView()
    
    // Starting Prompt Controller
    const promptController = new PromptApiController(promptView, promptApi)
    
    // Starting Summarizer Controller
    const summarizerController = new SummarizerApiController(summarizerView, summarizerApi)

    // Starting Language Detector Controller
    const languageDetectorController = new LanguageDetectorApiController(languageDetectorView, languageDetectorApi)

        await Promise.all([
        promptApi.healthCheck().then(()=> promptController.submitPrompt()),
        summarizerApi.healthCheck().then(()=> summarizerController.submitPrompt()),
        languageDetectorApi.healthCheck().then(()=> languageDetectorController.submitPrompt()),
    ]) 
    
})();
