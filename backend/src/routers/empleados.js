import {Router} from 'express';
import empleadosController from '../controller/empleados.js';

const empleadosRouter = Router();

empleadosRouter.get('/', empleadosController.readAll);
empleadosRouter.get('/:codigo', empleadosController.read);
empleadosRouter.post('/', empleadosController.create);
empleadosRouter.put('/:codigo', empleadosController.update);
empleadosRouter.delete('/:codigo', empleadosController.delete);
empleadosRouter.get('/:codigo_departamento/empleados', empleadosController.readByDepartamento);

export default empleadosRouter;