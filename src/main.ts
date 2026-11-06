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

// Muestra cada fila y cada asiento con sus índices.
showSeats(seats);

export {};
