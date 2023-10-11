import { CInput } from 'src/app/Shared/models/index.model';
import * as _ from 'lodash-es';

//#region INPUT MATRIX CLASS
export class InputMatrix {
  private _inputBoxes: CInput[][] = [];
  get inputBoxes() {
    return this._inputBoxes;
  }
  get data() {
    return this._inputBoxes.map((row) =>
      row.map((cell) => cell.value as string)
    );
  }

  readonly model: CInput;

  private numOfRows: number = 0;

  private numOfCols: number = 0;

  get firstRow() {
    return this._inputBoxes[0];
  }
  get bodyRows() {
    return this._inputBoxes.slice(1);
  }
  get hasData() {
    return this._inputBoxes.length > 0;
  }
  get hasError() {
    return this.inputBoxes?.some((r) =>
      r.some((c) => c.hasError  )
      // r.some((c) => c.hasError || (c.isEmpty && c.x != 0 && c.y != 0))
    );
  }
  constructor(
    numOfRows?: number,
    numOfCols?: number,
    model: CInput = new CInput('')
  ) {
    this.model = model;
    if (numOfRows == 1 && numOfCols == 1) return;
    if (numOfCols) {
      this.numOfCols = numOfCols;
      if (numOfRows) {
        this.addRows(numOfRows, numOfCols);
        this.numOfRows = numOfRows;
        this.format();
      }
    }
  }

    loadData(matrix: (string )[][]) {
    return new Promise((res) => {
      this.numOfRows = matrix.length;
      this.numOfCols = matrix[0]?.length;
      this._inputBoxes = [];
      for (let r = 0; r < matrix.length; r++) {
        const row = matrix[r];
        const ciRow = [];
        for (let c = 0; c < row.length; c++) {
          const cell = row[c]?.trim();
          const ci = new CInput('', '', cell);
          ci.x = c;
          ci.y = r;
          ciRow.push(ci);
        }
        this._inputBoxes.push(ciRow);
      }

      // this._inputBoxes = data.map((row) =>
      //   row.map((cell) => new CInput('', '', cell))
      // );
      res(this._inputBoxes)
    });
  }

  regen(value: { numOfRows: number; numOfCols: number }) {
    const { numOfCols, numOfRows } = value,
      numOfNewCols = numOfCols - this.numOfCols,
      numOfNewRows = numOfRows - this.numOfRows;
    numOfNewCols > 0 ? this.addCols(numOfNewCols) : this.removeCols(numOfCols);
    this.numOfCols = value.numOfCols;
    numOfNewRows > 0 ? this.addRows(numOfNewRows) : this.removeRows(numOfRows);
    this.numOfRows = value.numOfRows;
    this.format();
  }

  clear() {
    this._inputBoxes = [];
  }

  //#region additions
  private addRows(
    numOfNewRows: number,
    numofColumns: number = this._inputBoxes[0]?.length
  ) {
    for (let r = 0; r < numOfNewRows; r++) {
      const row: CInput[] = [];
      for (let cell = 0; cell < numofColumns; cell++) {
        this.model.x = cell;
        this.model.y = r;
        row.push(_.clone(this.model));
      }
      this._inputBoxes.push(row);
    }
  }

  private addCols(numOfNewCols: number) {
    for (let r = 0; r < this._inputBoxes.length; r++) {
      const row = this._inputBoxes[r];
      const cells: CInput[] = [];
      for (let c = 0; c < numOfNewCols; c++) {
        this.model.x = c;
        this.model.y = r;
        cells.push(_.clone(this.model));
      }
      const newCells = _.clone(cells);
      row.push(...newCells);
    }
  }
  //#endregion
  //#region subtractions
  private removeRows(numOfNewRows: number) {
    this._inputBoxes.splice(numOfNewRows);
  }

  private removeCols(numOfNewCols: number) {
    for (const row of this._inputBoxes) {
      row.splice(numOfNewCols);
    }
  }
  //#endregion

  //#region cell formats
  closeCells = (v: boolean) => {
    for (const row of this._inputBoxes) {
      for (const cell of row) {
        cell.readonly = v;
      }
    }
  };

  openCells = (v: boolean) => this.closeCells(false);

  private format() {
    for (const row of this._inputBoxes) {
      row[0].cls = 'control-bg-primary';
    }
    this._inputBoxes[0][0].hide = true;
  }
  //#endregion
}
//#endregion
