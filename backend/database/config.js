import { DataTypes, Sequelize} from 'sequelize'
import { populateDatabase } from './populate.js'
import p from 'picocolors'
import express from 'express'
import { corsMiddleware } from '../middlewares/cors.js'
const app = express()
const PORT = process.env.PORT
app.use(corsMiddleware())
app.use(express.json())

const sequelize = new Sequelize({
    storage: process.env.DB_NAME,
    dialect: 'sqlite',
    define: {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
    },
})

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
}, {
    timestamps: false,
});

const Movie = sequelize.define('Movie', {
    movieId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    director: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.ENUM('Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Superhero', 'Thriller', 'War', 'Western'),
        allowNull: false,
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }, 
}, {
    timestamps: false,
})

const Review = sequelize.define('Review', {
    reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        }
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
}, {
    timestamps: false,
})

User.hasMany(Review, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
})

Review.belongsTo(User, {
    foreignKey: 'userId',
})

Movie.hasMany(Review, {
    foreignKey: 'movieId',
    onDelete: 'CASCADE',
})

Review.belongsTo(Movie, {
    foreignKey: 'movieId',
})

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            populateDatabase()
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error(p.red('Error connecting to the database: ', error))
    })

export {
    User,
    Movie,
    Review,
}
