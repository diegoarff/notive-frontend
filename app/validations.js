class Validator {
    constructor(handleError){
        this.handleError = handleError
    }
    validatePassword(password, label){
        let val = false
        if (password == '') {
           this.handleError('Please input valid password', label)
        }
       else if (password.length <6) {
            this.handleError('Password must be at least 6 characters', label)
        } 
        else {
            val = true
        }

        return val
        
    }
    ValidateName(name, label){
        let val = false
        if (name == '') {
            this.handleError(`Please input valid ${label}`, label)
        }else if (name.length < 2)
        {
            this.handleError(`${label} must have more than 2 characters`, label)
        } 
        else {
            val = true
        }
        return val
    }
}

export default Validator