const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

},
{
    timestamps: true
})

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", UserSchema)