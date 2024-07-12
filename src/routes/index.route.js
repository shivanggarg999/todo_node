import userRoutes from '../routes/user.route.js';
import categoryRoutes from '../routes/category.route.js';
import todoRoutes from '../routes/todo.route.js';

const Routes =  (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/category', categoryRoutes);
    app.use('/api/todo', todoRoutes);
}

export default Routes;