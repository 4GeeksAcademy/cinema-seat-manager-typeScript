const rowCount = 8;
const columnCount = 10;
const seats: number[][] = [];

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

function reserveSeat(row: number, column: number): void {
  if (!Number.isInteger(row) || !Number.isInteger(column)) {
    console.log("Reserva rechazada: la fila y la columna deben ser números enteros.");
  } else if (row < 0 || row >= rowCount) {
    console.log(`Reserva rechazada: la fila ${row} está fuera del rango 0-${rowCount - 1}.`);
  } else if (column < 0 || column >= columnCount) {
    console.log(`Reserva rechazada: la columna ${column} está fuera del rango 0-${columnCount - 1}.`);
  } else if (seats[row][column] === 0) {
    seats[row][column] = 1;
    console.log(`Reserva exitosa: asiento en fila ${row}, columna ${column}.`);
  } else if (seats[row][column] === 1) {
    console.log(`Reserva rechazada: asiento en fila ${row}, columna ${column} ya está ocupado.`);
  } else {
    console.log(`Reserva rechazada: estado inválido en fila ${row}, columna ${column}.`);
  }
}

console.log("\nPrueba 1: reserva válida");
reserveSeat(2, 3);

console.log("\nPrueba 2: reserva repetida");
reserveSeat(2, 3);

console.log("\nPrueba 3: coordenadas inválidas");
reserveSeat(8, 10);

console.log("\nPrueba 4: coordenadas decimales");
reserveSeat(2.5, 4);

// Muestra la matriz después de las pruebas de reserva.
showSeats(seats);

export {};
