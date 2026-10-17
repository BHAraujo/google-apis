import { LanguageDetectorApiController } from "../controllers/languageDetectorApiController.js";
import { LanguageDetectorApi } from "../services/languageDetectorApi.js";
import { LanguageDetectorApiView } from "../views/languageDetectorApiView.js";

(async () => {
    // Starting Services
    const languageDetectorApi = new LanguageDetectorApi()

    // Starting view 
    const languageDetectorView = new LanguageDetectorApiView()

    // Starting Language Detector Controller
    const languageDetectorController = new LanguageDetectorApiController(languageDetectorView, languageDetectorApi)

    await Promise.all([    
    languageDetectorApi.healthCheck().then(()=> languageDetectorController.submitPrompt()),
    ]) 
})();
