import { PromptApiController } from "./controllers/promptApiController.js";
import { SummarizerApiController } from "./controllers/summarizerApiController.js";
import { PromptApi } from "./service/promptApi.js";
import { SummarizerApi } from "./service/summarizerApi.js";
import { PromptApiView } from "./views/promptApiView.js";
import { SummarizerApiView } from "./views/summarizerApiView.js";


(async () => {
    // Starting Services
    const promptApi = new PromptApi()
    const summarizerApi = new SummarizerApi()

    // Starting view 
    const promptView = new PromptApiView()
    const summarizerView = new SummarizerApiView()
    
    // Starting Prompt Controller
    const promptController = new PromptApiController(promptView, promptApi)
    
    // Starting Summairzer Controller
    const summarizerController = new SummarizerApiController(summarizerView, summarizerApi)

    await promptApi.healthCheck()
    await summarizerApi.healthCheck()
    await promptController.submitPrompt()
    await summarizerController.submitPrompt()

    await Promise.all([
         promptApi.healthCheck().then(()=> promptController.submitPrompt()),
         summarizerApi.healthCheck().then(()=> summarizerController.submitPrompt()),
    ])
    
})();
