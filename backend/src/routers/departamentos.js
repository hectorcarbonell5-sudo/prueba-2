import {Router} from 'express';
import departamentosController from '../controller/departamentos.js';
    
const departamentosRouter = Router();

departamentosRouter.get('/', departamentosController.readAll);
departamentosRouter.get('/:codigo', departamentosController.read);
departamentosRouter.post('/', departamentosController.create);
departamentosRouter.put('/:codigo', departamentosController.update);
departamentosRouter.delete('/:codigo', departamentosController.delete);
departamentosRouter.get('/:codigo/empleados', departamentosController.getEmpleados);

export default departamentosRouter;