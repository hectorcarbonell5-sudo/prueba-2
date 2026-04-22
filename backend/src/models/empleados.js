import {Schema, model} from 'mongoose';

const empleadoSchema = new Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        
    },
    apellido1: {
        type: String,
        required: true
    },
    apellido2: {
        type: String,
        required: true
    },
    codigo_departamento: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

export default model('Empleado', empleadoSchema);