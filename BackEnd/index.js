const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const Class = require("./models/class")
const User = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Student = require('./models/student')
const Profesor = require('./models/profesor')
const sendGrid = require('@sendgrid/mail');
const template = require('./utils')

server.use(cors());
server.use(express.json());

mongoose.connect("mongodb+srv://Tomas:TomasSanjiao149@cluster0.nyiuezw.mongodb.net/?retryWrites=true&w=majority")

function generateToken(userId) {
    const payload = {
        user: {
            id: userId
        }
    }

    return jwt.sign(payload, "149", { expiresIn: '24hr'  });
}


server.get("/api/class", 
    async function(request, response){
        const clases = await Class.find();

        for (let index = 0; index < clases.length; index++) {
            const clase = clases[index];
            
            clase.profesor = await Profesor.findOne({ _id: clase.profesorId });
            clase.user = await User.findOne({ _id: clase?.profesor?.userId });
        }

        console.log(clases);

        response.json({ clases });
    }
);

server.post("/api/login", async function(request, response) {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({ email: email });
    
        console.log(user);
    
        if (!user) {
            return response.status(401).json('Password or email is incorrect');
        }
    
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return response.status(401).json('Password or email is incorrect');
        }
    
        const token = generateToken(user._id);
        response.status(200).json({ token: token });
    } catch (err) {
        console.log(err.message);
        response.sendStatus(500); // Internal server error
    }
});


server.post("/api/register", async function(request, response) {
    try {
        const { username, email, password, name, surname, role, phone } = request.body;

        const user = await User.findOne({ email: email });

        if (user) {
            return response.status(401).json('User already exists');
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const encryptPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            surname: surname,
            email: email,
            password: encryptPassword,
            username: username,
            role: role,
            phone: phone,
            decryptPassword: password, 
        });

        await newUser.save();

        if (role === "student") {
            const { birthday, primary, secondary, third, university } = request.body;

            const newStudent = new Student({
                userId: newUser._id,
                birthday: birthday,
                studies: {
                    primary: primary,
                    secondary: secondary,
                    third: third,
                    university: university
                }
            });

            await newStudent.save();
            newUser.student = newStudent;
        } else if (role === "profesor") {
            const { title, experience, description } = request.body;

            const newProfesor = new Profesor({
                userId: newUser._id,
                title: title,
                experience: experience,
                description: description
            });

            await newProfesor.save();
            newUser.profesor = newProfesor;
        }

        const token = generateToken(newUser._id);
        response.status(201).json({ token: token, user: newUser });
    } catch (err) {
        console.log(err.message);
        response.status(500).json({err: err});
    }
});

server.get("/api/check-token", async function(request, response) {
    try {
        const token = request.header('token');

        if (!token) {
            return response.status(403).json('Not authorize');
        }

        jwt.verify(token, "149"); // Tira un error

        response.sendStatus(200);
    } catch (err) {
        response.status(403).json('Not authorize');
    }
});

server.get("/api/users/:id", async function(request, response) {
    try {
        const { id } = request.params;
        const payload = {};
        const user = await User.findOne({ _id: id  });
        payload.user = user;

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        if (user.role === "student") {
            payload.student = await Student.findOne({ userId: user._id });
        } else if (user.role === "profesor") {
            payload.profesor = await Profesor.findOne({ userId: user._id });
        }

        response.status(200).json(payload)
    } catch(err) {
        console.log(err.message);
        response.sendStatus(500);
    }
});

server.get('/api/password-recovery', async function (request, response) {
    const { email } = request.query;

    const user = await User.findOne({ email: email });
    const decryptedPassword = user.decryptPassword

    const payload = {
        to: email, // Recipient
        from: "juangara99@gmail.com", // Verified sender
        subject: "Recuperar contraseña",
        html: template(decryptedPassword)
    };
    
    const apiKey = "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";
    sendGrid.setApiKey(apiKey);

    sendGrid.send(payload)
});

server.post("/api/create-class", async function (request, response) {
    try {
        const { name, subject, duration, frecuency, price, type, description, public, profesorId } = request.body;

        const cClass = new Class({
            comments: [],
            rating: [],
            profesorId: profesorId,
            name: name,
            subject: subject,
            duration: duration,
            frecuency: frecuency,
            price: price,
            type: type,
            description: description,
            public: public
        });

        await cClass.save();
    
        response.status(201).json('Created class');
    } catch (err) {
        response.status(500).json('Internal server error');
    }
});


server.listen(3001, 
    function(){
        console.log("Servidor conectado y escuchando")
    } 
);