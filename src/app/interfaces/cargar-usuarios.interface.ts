import { Usuario } from "../models/usuario.model";

export interface CargarUsuario{
    total:Number,
    usuarios: Usuario[]
}