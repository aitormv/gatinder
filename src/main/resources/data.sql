INSERT INTO roles (nombre) VALUES ("ROLE_REGISTRADO");
INSERT INTO roles (nombre) VALUES ("ROLE_PROTECTORA");
INSERT INTO roles (nombre) VALUES ("ROLE_ADMIN");

INSERT INTO usuarios (nombre, apellidos, sexo, fecha_nacimiento, localidad, telefono, email, nombre_usuario, password, foto_perfil, idrol) VALUES ("Aitor", "Merino  Vázquez", "Hombre", "1993-01-23", "Gijón", "666638805", "aitormv93@gmail.com", "admin", "{bcrypt}$2a$10$8LzIR5YQ3PXJzNA9uXF4COk9Id3Zfv7NDtpX79kXBtUIPYIJOLheu", "/img/admin.jpg", 3);
INSERT INTO usuarios (nombre, apellidos, sexo, fecha_nacimiento, localidad, telefono, email, nombre_usuario, password, foto_perfil, idrol) VALUES ("Jorge", "Fernández Días", "Hombre", "1999-06-03", "Gijón", "684306128", "jorgeferdi@gmail.com", "jorgeferdi", "{bcrypt}$2a$10$fP8WNY7fRtNUTCuTqoj5peBQtRUTpnBgKnG8o6A8sVSj77jRVetB2", "/img/usuario.jpg", 1);

INSERT INTO protectoras (denominacion, localidad, telefono, email, nombre_usuario, password, foto_perfil, idrol) VALUES ("Gijón Felino", "Gijón", "985663268", "gijonfelino@gmail.com", "gijonfelino", "{bcrypt}$2a$10$b0q/LGe1zVQa/nYvl1lz/.attYtwm2Gb/SWFyYU6.DmPnuF/5F3zu", "/img/protectora.jpg", 2);

/*INSERT INTO gatos () VALUES ();*/