-- En este archivo deben estar tus ejercicios de consultas sql
-- 1.
SELECT
    nombres
FROM
    empleados
ORDER BY
    nombres DESC;

-- 2.
SELECT
    nombres,
    puesto,
    localidad
FROM
    empleados
    JOIN puestos on empleados.puesto_id = puestos.id
    JOIN departamentos ON empleados.departamento_id = departamentos.id
    JOIN localidades ON departamentos.localidad_id = localidades.id
WHERE
    puesto = "Soporte";

-- 3.
SELECT
    nombres
FROM
    empleados
WHERE
    nombres LIKE "%o";

-- 4.
SELECT
    nombres,
    sueldo,
    localidad
FROM
    empleados
    JOIN departamentos ON empleados.departamento_id = departamentos.id
    JOIN localidades ON departamentos.localidad_id = localidades.id
WHERE
    localidad = "Carlos Paz";

-- 5.
SELECT
    nombres,
    sueldo,
    localidad
FROM
    empleados
    JOIN departamentos ON empleados.departamento_id = departamentos.id
    JOIN localidades ON departamentos.localidad_id = localidades.id
WHERE
    sueldo BETWEEN 10000 AND 13000;

-- 6.
SELECT
    denominacion
FROM
    departamentos
    JOIN empleados ON departamentos.id = empleados.departamento_id
GROUP BY
    denominacion
HAVING
    COUNT(empleados.id) > 5;

-- 7.
SELECT
    nombres
FROM
    empleados
    JOIN puestos ON empleados.puesto_id = puestos.id
    JOIN departamentos ON empleados.departamento_id = departamentos.id
    JOIN localidades ON departamentos.localidad_id = localidades.id
WHERE
    localidades.localidad = "Cordoba"
    AND (
        puestos.puesto = "Analista"
        OR puestos.puesto = "Programador"
    );

-- 8.
SELECT
    AVG(sueldo) AS sueldo_medio
FROM
    empleados;

-- 9.
SELECT
    MAX(sueldo) AS sueldo_maximo
FROM
    empleados
WHERE
    departamento_id = 10;

-- 10.
SELECT
    MIN(sueldo) AS sueldo_minimo
FROM
    empleados
    JOIN departamentos ON empleados.departamento_id = departamentos.id
WHERE
    departamentos.denominacion = 'Soporte';

-- 11.
SELECT
    puestos.puesto,
    SUM(sueldo) AS sueldo_maximo_por_puesto
FROM
    empleados
    JOIN puestos ON empleados.puesto_id = puestos.id
GROUP BY
    puestos.puesto;
