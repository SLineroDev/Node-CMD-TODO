const descripcion = {
	demand: true,
	alias: 'd',
	desc: 'Descripcion de la tarea por hacer'
};

const completado = {
	alias: 'c',
	desc: 'Estado de la tarea',
	type: 'boolean'
};

const argv = require('yargs')
	.command('crear', 'Crear una tarea por hacer', {
		descripcion
	})
	.command('actualizar', 'Actualiza el estado completado de una tarea', {
		descripcion,
		completado
	})
	.command('listar', 'Muestra todas las tareas', {
		completado
	})
	.command('borrar', 'Borra una tarea', {
		descripcion
	})
	.help().argv;

module.exports = { argv };
