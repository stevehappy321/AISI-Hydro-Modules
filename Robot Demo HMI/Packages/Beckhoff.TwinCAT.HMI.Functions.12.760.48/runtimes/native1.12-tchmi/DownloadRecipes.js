var TcHmi;!function(TcHmi){!function(Functions){!function(Beckhoff){Beckhoff.DownloadRecipes=function(ctx,filter,referencedRecipeTypes=!1){if(!ctx)throw new TypeError("Parameter 'ctx' must be defined.");if(!ctx.success||!ctx.error)throw new TypeError("Parameter 'ctx' must be defined properly. Either 'success' or 'error' or both are missing.");if("function"!=typeof ctx.success||"function"!=typeof ctx.error)throw new TypeError("Parameter 'ctx' must be defined properly. Either 'success' or 'error' or both are not of type 'function'.");TcHmi.Server.RecipeManagement.downloadRecipesEx(filter,null,{referencedRecipeTypes:referencedRecipeTypes},null,(data=>data.error?void ctx.error(data.error,{code:data.error,message:TcHmi.Errors[data.error],reason:"Downloading recipe has failed.",domain:"TcHmi.Functions.Beckhoff.DownloadRecipes",errors:data.details?[data.details]:void 0}):(TCHMI_CONSOLE_LOG_LEVEL>=3&&TcHmi.Log.info("[Source=Function, Module=TcHmi.Functions.Beckhoff.DownloadRecipes] Recipe "+filter+" download started successfully."),void ctx.success())))}}(Functions.Beckhoff||(Functions.Beckhoff={}))}(TcHmi.Functions||(TcHmi.Functions={}))}(TcHmi||(TcHmi={})),TcHmi.Functions.registerFunctionEx("DownloadRecipes","TcHmi.Functions.Beckhoff",TcHmi.Functions.Beckhoff.DownloadRecipes);