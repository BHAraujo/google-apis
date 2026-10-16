import { TranslatorApiController } from "../controllers/translatorApiController.js";
import { TranslatorApiView } from "../views/translatorApiView.js";


(async () => {
    // Starting Services
    // const promptApi = new PromptApi()
    
    // Starting view 
    const translatorView = new TranslatorApiView()
    
    // Starting Translator Controller
   
    const translatorController = new TranslatorApiController(translatorView)
    await translatorController.submitPrompt()
    
//     await Promise.all([
//     promptApi.healthCheck().then(()=> promptController.submitPrompt()),
// ]) 
    
})();




