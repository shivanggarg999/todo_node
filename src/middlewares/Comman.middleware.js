const CommanMiddleware =  (app, express) => {
    app.use(express.json({ extended: false }));
    app.use(express.urlencoded({ extended: false }));
}

export default CommanMiddleware;