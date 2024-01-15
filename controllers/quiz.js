const db = require("../models");
const Quiz = db.quizzes;

//CREATE: untuk menambahkan data kedalam tabel quiz
exports.create = async(req, res) => {
    try {
        const data = await Quiz.create(req.body)
        res.json({
           message: "quiz created succesfully.",
           data: data, 
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

//READ: menampilkan atau mengambil semua data quiz sesuai model dari database
exports.getAll = async(req, res) => {
    try {
        const quizzes = await Quiz.findAll()
        res.json({
           message: "Quiz retrieved succesfully.",
           data: quizzes, 
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

//Mengubah data sesuai id yang dikirimkan
exports.update = async(req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true})
        quiz.update(req.body, {
            where: {id}
        })
        res.json({
           message: "Quizzes updated succesfully.",
           data: quiz, 
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error ocurred while retrieving quiz",
            data: null
        });
    }
}

// Menghapus data sesuai id yang dikirimkan
exports.delete = async(req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true})
        quiz.destroy()
        res.json({
           message: "quiz deleted succesfully."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error ocurred while retrieving quiz",
            data: null
        });
    }
}

// Mengambil data sesuai id yang dikirimkan
exports.findOne = async (req, res) => {
    const id = req.params.id
    try{
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true})
        res.json({
           message: `Quizzes retrieved succesfully with id=${id}.`,
           data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error ocurred while retrieving quiz",
            data: null
        });
    }
};

// Menampilkan atau mengambil semua data quiz berdasarkan category tertentu
exports.getByCategoryId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where: {
            category: id
        }
    })
    res.json({
        message: `Quizzes retrieved succesfully with id=${id}.`,
        data: quizzes,
    });
}

// Menampilkan atau mengambil semua data berdasarkan level tertentu
exports.getByLevelId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where: {
            levelId: id
        }
    })
    res.json({
        message: `Quizzes retrieved succesfully with id=${id}.`,
        data: quizzes,
    });
}