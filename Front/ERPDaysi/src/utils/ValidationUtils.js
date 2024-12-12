class ValidationUtils{
    static validateNumber(e){
        if (
            ["Backspace", "Delete", "Tab","ArrowLeft", "ArrowRight"].includes(e.key)
          ) {
            return;
          }
          if
           (isNaN(Number(e.key))||e.key==' ') {
            e.preventDefault();
          }
    }

    static validateNumberWithDecimals(e, maxDecimals) {
        const allowedKeys = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"];
        
        if (allowedKeys.includes(e.key)) {
            return;
        }
    
        if (isNaN(Number(e.key)) && e.key !== "." || e.key === " ") {
            e.preventDefault();
            return;
        }
    
        const currentValue = e.target.value;
        const decimalIndex = currentValue.indexOf(".");
    
        if (e.key === "." && decimalIndex !== -1) {
            e.preventDefault();
            return;
        }
    
        if (decimalIndex !== -1 && currentValue.length - decimalIndex > maxDecimals) {
            e.preventDefault();
        }
    }

    static validateEmail(e) {
        const email = e.target.value + e.key;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            return;
        }
        
        if (!emailPattern.test(email)) {
            e.preventDefault();
        }
    }

    static validateHostNameOrIP(e) {
        const newValue = e.target.value + e.key;
        // Permite letras, números, guiones y puntos en cualquier orden sin requerir formato completo
        const partialPattern = /^[a-zA-Z0-9.-]*$/;
        
        // Permitir teclas especiales de navegación y edición
        if (["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            return;
        }
        
        // Si el nuevo valor no cumple con el patrón parcial, prevenir la entrada
        if (!partialPattern.test(newValue)) {
            e.preventDefault();
        }
    }    
    
    static validateNumberLetter(e,withSpace=true) {
        const text = e.target.value + e.key;
        let pattern =/^[a-zA-Z0-9]*$/;

        if(withSpace){
            pattern = /^[a-zA-Z0-9\s]*$/;
        }
        
        if (["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            return;
        }
        
        if (!pattern.test(text)) {
            e.preventDefault();
        }
    }

    static validateIsEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailPattern.test(email)) {
            return false;
        }
        return true;
    }

    static validatePassword(password,nameField='') {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>°_\-;+¿¡'=]/.test(password);
        let errores=[];
      
        if (!hasUpperCase) {
          errores.push(nameField+" debe incluir al menos una letra mayúscula.");
        }
        if (!hasLowerCase) {
            errores.push(nameField+" debe incluir al menos una letra minúscula.");
        }
        if (!hasNumber) {
          errores.push(nameField+" debe incluir al menos un número.");
        }
        if (!hasSpecialChar) {
            errores.push(nameField+" debe incluir al menos un carácter especial.");
        }

        if(password.length<8){
            errores.push(nameField+" debe ser mayor o igual a 8 caracteres.");
        }
      
        return errores;
      }
}
export default ValidationUtils;