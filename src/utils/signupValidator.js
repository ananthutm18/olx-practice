

const signupValidator=(fname,lname,email,password,confirmpassford)=>{



  const isEmailValid=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    const checkPassword=(password==confirmpassford)?true:false

    if(!isEmailValid) return "Email Id is not valid"
    if(!isPasswordValid) return "Password is not Valid"
    if(!checkPassword) return "Password is not matching"

    return(null)


}
export default signupValidator 