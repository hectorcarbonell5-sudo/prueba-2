import departamentosModelo from '../models/departamentos.js';
import empleadosModelo from '../models/empleados.js'; 

const departamentosController = {
    // crear un departamentos
    create: async (req, res) => {
        try {
            const { codigo, nombre } = req.body;
            const nuevoDepartamento = await departamentosModelo.create({ codigo, nombre });
            await nuevoDepartamento.save();
            res.status(201).json(nuevoDepartamento);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el departamento' });
        }
    },
    // obtener todos los departamentos
    readAll: async (req, res) => {

        try {
            const departamentos = await departamentosModelo.find();
            res.status(200).json(departamentos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los departamentos' });
        }
    },
    // obtener un departamento por codigo
    read: async (req, res) => {
        try {
            const { codigo } = req.params;
            const departamento = await departamentosModelo.findOne({ codigo });
            if (!departamento) {
                return res.status(404).json({ error: 'Departamento no encontrado' });
            }
            res.status(200).json(departamento);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el departamento' });
        }
    },
    // actualizar un departamento por codigo
    update: async (req, res) => {  
        try {
            const { codigo } = req.params;
            const { nombre } = req.body;
            const departamentoActualizado = await departamentosModelo.findOneAndUpdate({ codigo }, { nombre }, { new: true });
            if (!departamentoActualizado) {
                return res.status(404).json({ error: 'Departamento no encontrado' });
            }
            res.status(200).json(departamentoActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el departamento' });
        }
    },
    // eliminar un departamento por codigo
    delete: async (req, res) => {
        try {
            const { codigo } = req.params;
            const departamentoEliminado = await departamentosModelo.findOneAndDelete({ codigo });
            if (!departamentoEliminado) {
                return res.status(404).json({ error: 'Departamento no encontrado' });
            }
            res.status(200).json({ message: 'Departamento eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el departamento' });
        }
    },
    // obtener empleados por departamento
    getEmpleados: async (req, res) => {
        try {
            const { codigo } = req.params;
            const departamento = await departamentosModelo.findOne({ codigo });
            if (!departamento) {
                return res.status(404).json({ error: 'Departamento no encontrado' });
            }
            const empleados = await empleadosModelo.find({ codigo_departamento: codigo });
            res.status(200).json(empleados);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los empleados' });
        }
    }
};

export default departamentosController;