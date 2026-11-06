const rowCount = 8;
const columnCount = 10;
let seats: number[][] = [];

// Agrega 10 asientos libres a cada una de las 8 filas.
for (let row = 0; row < rowCount; row++) {
  const seatRow: number[] = [];

  for (let column = 0; column < columnCount; column++) {
    seatRow.push(0);
  }

  seats.push(seatRow);
}

const totalSeats = seats.reduce((total, seatRow) => total + seatRow.length, 0);
console.log(`Total de posiciones: ${totalSeats}`);

// Muestra la matriz con filas, columnas y el estado de cada asiento.
function showSeats(seatMap: number[][]): void {
  console.log("        Columnas");
  let columnHeader = "Filas | ";

  for (let column = 0; column < columnCount; column++) {
    columnHeader += `${column}  `;
  }

  console.log(columnHeader);

  for (let row = 0; row < rowCount; row++) {
    let rowDisplay = `${row}     | `;

    for (let column = 0; column < columnCount; column++) {
      if (seatMap[row][column] === 0) {
        rowDisplay += "L  ";
      } else {
        rowDisplay += "X  ";
      }
    }

    console.log(rowDisplay);
  }
}

// Valida la posición y reserva el asiento si está disponible.
function reserveSeat(row: number, column: number): string {
  if (!Number.isInteger(row) || !Number.isInteger(column)) {
    const message = "Reserva rechazada: la fila y la columna deben ser números enteros.";
    console.log(message);
    return message;
  } else if (row < 0 || row >= rowCount) {
    const message = `Reserva rechazada: la fila ${row} está fuera del rango 0-${rowCount - 1}.`;
    console.log(message);
    return message;
  } else if (column < 0 || column >= columnCount) {
    const message = `Reserva rechazada: la columna ${column} está fuera del rango 0-${columnCount - 1}.`;
    console.log(message);
    return message;
  } else if (seats[row][column] === 0) {
    seats[row][column] = 1;
    const message = `Reserva exitosa: asiento en fila ${row}, columna ${column}.`;
    console.log(message);
    return message;
  } else if (seats[row][column] === 1) {
    const message = `Reserva rechazada: asiento en fila ${row}, columna ${column} ya está ocupado.`;
    console.log(message);
    return message;
  } else {
    const message = `Reserva rechazada: estado inválido en fila ${row}, columna ${column}.`;
    console.log(message);
    return message;
  }
}

// Cuenta y muestra los asientos; devuelve [disponibles, ocupados].
function showSeatCounts(seatMap: number[][]): number[] {
  let availableSeats = 0;
  let occupiedSeats = 0;

  // Cuenta cada asiento según su valor en la matriz.
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      if (seatMap[row][column] === 0) {
        availableSeats++;
      } else if (seatMap[row][column] === 1) {
        occupiedSeats++;
      }
    }
  }

  console.log(`Asientos disponibles: ${availableSeats}`);
  console.log(`Asientos ocupados: ${occupiedSeats}`);

  return [availableSeats, occupiedSeats];
}

// Muestra y devuelve [fila, primera columna, segunda columna], o [] si no hay par.
function findFirstFreePair(seatMap: number[][]): number[] {
  // Recorre filas y busca pares adyacentes sin cruzar a otra fila.
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount - 1; column++) {
      if (seatMap[row][column] === 0 && seatMap[row][column + 1] === 0) {
        console.log(
          `Hay disponibilidad: primer par libre en fila ${row}, columnas ${column} y ${column + 1}.`,
        );
        return [row, column, column + 1];
      }
    }
  }

  console.log("No hay asientos consecutivos disponibles.");
  return [];
}

// Crea una matriz de 8x10 con el valor inicial indicado.
function createRoom(initialValue: number): number[][] {
  const room: number[][] = [];

  for (let row = 0; row < rowCount; row++) {
    const seatRow: number[] = [];

    for (let column = 0; column < columnCount; column++) {
      seatRow.push(initialValue);
    }

    room.push(seatRow);
  }

  return room;
}

// Muestra la sala, los conteos y la búsqueda de asientos consecutivos.
function showScenario(title: string): void {
  console.log(`\n=== ${title} ===`);
  showSeats(seats);
  showSeatCounts(seats);
  findFirstFreePair(seats);
}

const emptyRoom = seats;
const partiallyOccupiedRoom = createRoom(0);
partiallyOccupiedRoom[0][0] = 1;
partiallyOccupiedRoom[1][8] = 1;

const almostFullRoom = createRoom(1);
for (let row = 0; row < rowCount; row++) {
  almostFullRoom[row][4] = 0;
}

const fullRoom = createRoom(1);

seats = emptyRoom;
showScenario("Escenario 1: sala vacía");

seats = partiallyOccupiedRoom;
console.log("\n=== PRUEBAS DE RESERVA ===");
reserveSeat(2, 3);
reserveSeat(0, 0);
reserveSeat(8, 10);
reserveSeat(2, 10);
reserveSeat(2.5, 4);
showScenario("Escenario 2: sala parcialmente ocupada");

seats = almostFullRoom;
showScenario("Escenario 3: sala casi llena sin pares contiguos");

seats = fullRoom;
showScenario("Escenario 4: sala completamente llena");

export {};
