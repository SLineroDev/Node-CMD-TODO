const argv = require('./config/yargs').argv;
const porHacer = require('./Tareas/tareas');

let comando = argv._[0];
if (comando != undefined) {

	switch (comando.toLowerCase()) {
		case 'crear':
			porHacer.crear(argv.descripcion);
			break;

		case 'listar':
			porHacer.listar(argv.completado);
			break;

		case 'actualizar':
			if (!porHacer.actualizar(argv.descripcion, argv.completado)) {
				console.log('ERROR:La tarea no existe'.red);
			}
			break;

		default:
			if (!porHacer.borrar(argv.descripcion)) {
				console.log('ERROR:La tarea no existe'.red);
			}
			break;
	}
} else {
	console.log('Debe insertar algun comando. Escriba --help para obtener ayuda.');
}
