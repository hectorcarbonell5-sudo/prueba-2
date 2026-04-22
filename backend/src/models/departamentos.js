import { Schema, model } from 'mongoose';

const departamentosSchema = new Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Departamentos', departamentosSchema);