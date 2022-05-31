export default {
    methods: {
        validationPass(skiArray, className) {
            const inputField = document.querySelector(`.${className}`)
            let passedCounter = 0;
        
            skiArray.forEach(pairs => {
              pairs.forEach(pair => {
                if (typeof pair.currentResult !== 'undefined') {
                  passedCounter += 1
                }
              })
            })
        
            if (passedCounter === skiArray.length*2) {
                inputField.style.display = 'none';
                return true
            } else {
              inputField.innerText = 'Obs, fyll inn alle feltene';
              inputField.style.display = 'block';
              return false
            }
        },
        
        validationTextInput(inputField, className, errorMessage) {
            const errorView = document.querySelector(`.${className}`);
            if (inputField === '') {
                errorView.innerText = errorMessage;
                errorView.style.display = 'block'
                return false
            }
            errorView.style.display = 'none';
            return true 
        }
    }
}
