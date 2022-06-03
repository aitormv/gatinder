INSERT INTO roles (nombre) VALUES ("ROLE_REGISTRADO");
INSERT INTO roles (nombre) VALUES ("ROLE_PROTECTORA");
INSERT INTO roles (nombre) VALUES ("ROLE_ADMIN");

INSERT INTO usuarios (nombre, apellidos, sexo, fecha_nacimiento, localidad, telefono, email, nombre_usuario, password, foto_perfil, idrol) VALUES ("Aitor", "Merino  Vázquez", "Hombre", "1993-01-23", "Gijón", "666638805", "aitormv93@gmail.com", "admin", "{bcrypt}$2a$10$8LzIR5YQ3PXJzNA9uXF4COk9Id3Zfv7NDtpX79kXBtUIPYIJOLheu", "img/admin.jpg", 21);
INSERT INTO usuarios (nombre, apellidos, sexo, fecha_nacimiento, localidad, telefono, email, nombre_usuario, password, foto_perfil, idrol) VALUES ("Jorge", "Fernández Díaz", "Hombre", "1999-06-03", "Gijón", "684306128", "jorgeferdi@gmail.com", "jorgeferdi", "{bcrypt}$2a$10$fP8WNY7fRtNUTCuTqoj5peBQtRUTpnBgKnG8o6A8sVSj77jRVetB2", "img/usuario.jpg", 1);

INSERT INTO protectoras (denominacion, localidad, telefono, email, nombre_usuario, password, foto_perfil, idrol) VALUES ("Gijon Felino", "Gijón", "985663268", "gijonfelino@gmail.com", "gijonfelino", "{bcrypt}$2a$10$b0q/LGe1zVQa/nYvl1lz/.attYtwm2Gb/SWFyYU6.DmPnuF/5F3zu", "img/protectora.jpg", 11);
INSERT INTO protectoras (denominacion, localidad, telefono, email, nombre_usuario, password, foto_perfil, idrol) VALUES ("Don Gato", "Gijón", "984653167", "dongato@gmail.com", "dongato", "{bcrypt}$2a$10$b0q/LGe1zVQa/nYvl1lz/.attYtwm2Gb/SWFyYU6.DmPnuF/5F3zu", "img/protectora.jpg", 11);

INSERT INTO gatos (nombre, sexo, edad, descripcion, acogido, adoptado, foto, idusuario, idprotectora) VALUES ("Gofre", "Macho", 3, "Gato naranja muy bueno y cariñoso. Es tranquilo y se lleva bien con otros gatos. No tiene enfermedades conocidas.", true, false, "img/gato1.jpg", 11, 1);
INSERT INTO gatos (nombre, sexo, edad, descripcion, acogido, adoptado, foto, idprotectora) VALUES ("Juanita", "Hembra", 1, "Gata atigrada joven y muy activa. Le encanta jugar todo el rato. Le cuesta un poco convivir con otros animales. No tiene enfermedades.", false, false, "img/gato2.jpg", 1);
INSERT INTO gatos (nombre, sexo, edad, descripcion, acogido, adoptado, foto, idprotectora) VALUES ("Manolin", "Macho", 6, "Gato negro adulto desconfiado con los humanos. Necesita un hogar donde pueda estar tranquilo hasta que se adapte.", false, false, "img/gato3.jpg", 11);