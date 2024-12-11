class Field {
    constructor(name='', value='', type='', size=0, decimal=0) {
      this.name = name; // Nombre del campo
      this.type = type; // Tipo de dato (string, int, etc.)
      this.size = size; // Tamaño del campo
      this.decimal = decimal; // Número de decimales (si aplica)
      this.value = value; // Valor del campo
    }
  }

  export default Field;