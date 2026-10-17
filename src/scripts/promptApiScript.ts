import { PromptApiController } from "../controllers/promptApiController.js";
import { PromptApi } from "../services/promptApi.js";
import { PromptApiView } from "../views/promptApiView.js";

(async () => {
    // Starting Services
    const promptApi = new PromptApi()
    
    // Starting view 
    const promptView = new PromptApiView()

    // Starting Prompt Controller
    const promptController = new PromptApiController(promptView, promptApi)

    await Promise.all([
    promptApi.healthCheck().then(()=> promptController.submitPrompt()),
    ]) 
})();



