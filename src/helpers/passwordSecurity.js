import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10)

export const hashPassword = (plainPassword) => {
    const hash = bcrypt.hashSync(plainPassword, salt)
    return hash
}

export const comparePassword = (plainPassword, hash) => {
    const result = bcrypt.compareSync(plainPassword, hash)
    console.log("RESS::", result)
    return result
}
