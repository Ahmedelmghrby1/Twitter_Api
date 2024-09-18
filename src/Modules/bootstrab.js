import mentionRouter from "./mentions/mention.routes.js"


export const bootstrab= (app)=>{
    app.use('/api/mentions',mentionRouter)

}


