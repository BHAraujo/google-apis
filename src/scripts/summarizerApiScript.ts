import { SummarizerApiController } from "../controllers/summarizerApiController.js";
import { SummarizerApi } from "../services/summarizerApi.js";
import { SummarizerApiView } from "../views/summarizerApiView.js";


(async () => {
    // Starting Services
    const summarizerApi = new SummarizerApi()
    
    // Starting view 
    const summarizerView = new SummarizerApiView()
    
    // Starting Summarizer Controller
    const summarizerController = new SummarizerApiController(summarizerView, summarizerApi)

    await Promise.all([
    summarizerApi.healthCheck().then(()=> summarizerController.submitPrompt()),
    ]) 
    
})();
