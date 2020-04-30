const fs = require('fs');
const colors = require('colors');
let listadoTareas = [];

const obtenerDB = () => {
	try {
		listadoTareas = require('../db/data.json');
	} catch (error) {
		console.log(error);
		listadoTareas = [];
	}
};

const guardarDB = () => {
	let data = JSON.stringify(listadoTareas);

	fs.writeFile('db/data.json', data, err => {
		if (err) {
			throw new Error(err);
		} else {
			console.log('Cambios guardados en BBDD');
		}
	});
};

const crear = descripcion => {
	obtenerDB();

	let porHacer = {
		descripcion: descripcion,
		completado: false,
	};

	listadoTareas.push(porHacer);

	guardarDB();

	return porHacer;
};

const listar = completado => {
	obtenerDB();

	if (completado == undefined) {
		//Si no se especifica el valor de completado, muestra todas las tareas
		listadoTareas.forEach(tarea => {
			console.log('============TO DO============'.green);
			console.log(tarea.descripcion);
			console.log(`Estado: ${tarea.completado}`);
			console.log('============================='.green);
		});
	} else {
		//Filtra segun el estado
		listadoTareas.forEach(tarea => {
			if (tarea.completado === completado) {
				console.log('============TO DO============'.green);
				console.log(tarea.descripcion);
				console.log(`Estado: ${tarea.completado}`);
				console.log('============================='.green);
			}
		});
	}

	return listadoTareas;
};

const actualizar = (descripcion, completado = true) => {
	obtenerDB();

	let tareaEncontrada = listadoTareas.find(
		tarea => tarea.descripcion === descripcion
	);

	if (tareaEncontrada !== undefined) {
		tareaEncontrada.completado = completado;
		guardarDB();
		return true;
	} else {
		return false;
	}
};

const borrar = descripcion => {
	obtenerDB();

	let nuevoListado = listadoTareas.filter(d => d.descripcion !== descripcion);

	if (listadoTareas.length != nuevoListado.length) {
		listadoTareas = nuevoListado;
		guardarDB();
		return true;
	} else {
		return false;
	}
};

module.exports = { crear, listar, actualizar, borrar };
