import { TranslatorApiController } from "../controllers/translatorApiController.js";
import { TranslatorApi } from "../services/translatorApi.js";
import { TranslatorApiView } from "../views/translatorApiView.js";


(async () => {
    // Starting Services
    const translatorApi = new TranslatorApi()
    
    // Starting view 
    const translatorView = new TranslatorApiView()
    
    // Starting Translator Controller
    const translatorController = new TranslatorApiController(translatorView, translatorApi)
    
    await Promise.all([
    translatorApi.healthCheck().then(()=> translatorController.submitPrompt())
    ])  
})();




