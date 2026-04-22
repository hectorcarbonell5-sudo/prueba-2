import empleadosModelo from '../models/empleados.js';
const empleadosController = {
    // crear un empleado
    create: async (req, res) => {
        try {
            const { codigo, nombre, apellido1, apellido2, codigo_departamento } = req.body;
            const nuevoEmpleado = await empleadosModelo.create({ codigo, nombre, apellido1, apellido2, codigo_departamento });
            res.status(201).json(nuevoEmpleado);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al crear el empleado' });
        }
    },
    // obtener todos los empleados
    readAll: async (req, res) => {
        try {
            const empleados = await empleadosModelo.find();
            res.status(200).json(empleados);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los empleados' });
        }
    },
    // obtener un empleado por codigo
    read: async (req, res) => {
        try {            const { codigo } = req.params;
            const empleado = await empleadosModelo.findOne({ codigo });
            if (!empleado) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }
            res.status(200).json(empleado);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el empleado' });
        }
    },
    // actualizar un empleado por codigo
    update: async (req, res) => {
        try {
            const { codigo } = req.params;
            const { nombre, apellido1, apellido2, codigo_departamento } = req.body;
            const empleadoActualizado = await empleadosModelo.findOneAndUpdate({ codigo }, { nombre, apellido1, apellido2, codigo_departamento }, { new: true });
            if (!empleadoActualizado) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }
            res.status(200).json(empleadoActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el empleado' });
        }
    },
    // eliminar un empleado por codigo
    delete: async (req, res) => {
        try {
            const { codigo } = req.params;
            const empleadoEliminado = await empleadosModelo.findOneAndDelete({ codigo });
            if (!empleadoEliminado) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }
            res.status(200).json({ message: 'Empleado eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el empleado' });
        }
    },
    // obtener empleados por departamento
    readByDepartamento: async (req, res) => {
        try {
            const { codigo_departamento } = req.params;
            const empleados = await empleadosModelo.find({ codigo_departamento });
            res.status(200).json(empleados);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los empleados' });
        }
    }
};
export default empleadosController;