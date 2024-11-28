import { User, Movie, Review } from './config.js'
import p from 'picocolors'
import bcrypt from 'bcrypt'

export async function populateDatabase() {
    const userCount = await User.count() 
    const movieCount = await Movie.count()
    const reviewCount = await Review.count()

    if (userCount === 0 && movieCount === 0 && reviewCount === 0) {
        const users = [
            { username: "user1", email: "user1@example.com", password: (await bcrypt.hash("password1", 10)).toString(), role: "admin" },
            { username: "user2", email: "user2@example.com", password: (await bcrypt.hash("password2", 10)).toString(), role: "user" },
            { username: "john_doe", email: "johndoe@example.com", password: (await bcrypt.hash("securePass1", 10)).toString(), role: "user" },
            { username: "jane_smith", email: "janesmith@example.com", password: (await bcrypt.hash("securePass2", 10)).toString(), role: "user" },
            { username: "mike_wilson", email: "mikewilson@example.com", password: (await bcrypt.hash("securePass3", 10)).toString(), role: "user" },
            { username: "sarah_connor", email: "sarahconnor@example.com", password: (await bcrypt.hash("securePass4", 10)).toString(), role: "user" },
            { username: "anna_brown", email: "annabrown@example.com", password: (await bcrypt.hash("securePass5", 10)).toString(), role: "user" },
            { username: "mark_green", email: "markgreen@example.com", password: (await bcrypt.hash("securePass6", 10)).toString(), role: "user" },
            { username: "lucy_gray", email: "lucygray@example.com", password: (await bcrypt.hash("securePass7", 10)).toString(), role: "user" },
            { username: "paul_taylor", email: "paultaylor@example.com", password: (await bcrypt.hash("securePass8", 10)).toString(), role: "user" },
            { username: "emma_clark", email: "emmaclark@example.com", password: (await bcrypt.hash("securePass9", 10)).toString(), role: "user" },
            { username: "david_white", email: "davidwhite@example.com", password: (await bcrypt.hash("securePass10", 10)).toString(), role: "user" },
            { username: "olivia_walker", email: "oliviawalker@example.com", password: (await bcrypt.hash("securePass11", 10)).toString(), role: "user" },
            { username: "liam_hall", email: "liamhall@example.com", password: (await bcrypt.hash("securePass12", 10)).toString(), role: "user" },
            { username: "chloe_king", email: "chloeking@example.com", password: (await bcrypt.hash("securePass13", 10)).toString(), role: "user" },
            { username: "josh_adams", email: "joshadams@example.com", password: (await bcrypt.hash("securePass14", 10)).toString(), role: "user" },
            { username: "mia_moore", email: "miamoore@example.com", password: (await bcrypt.hash("securePass15", 10)).toString(), role: "user" },
            { username: "noah_turner", email: "noahturner@example.com", password: (await bcrypt.hash("securePass16", 10)).toString(), role: "user" },
            { username: "sophie_hill", email: "sophiehill@example.com", password: (await bcrypt.hash("securePass17", 10)).toString(), role: "user" },
            { username: "alex_scott", email: "alexscott@example.com", password: (await bcrypt.hash("securePass18", 10)).toString(), role: "user" },
            { username: "grace_martin", email: "gracemartin@example.com", password: (await bcrypt.hash("securePass19", 10)).toString(), role: "user" },
            { username: "jack_baker", email: "jackbaker@example.com", password: (await bcrypt.hash("securePass20", 10)).toString(), role: "user" }
        ];
        const movies = [
            { title: "The Dark Knight", year: 2008, director: "Christopher Nolan", duration: 152, poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", genre: "Action", rate: 9.0 },
            { title: "Inception", year: 2010, director: "Christopher Nolan", duration: 148, poster: "https://image.tmdb.org/t/p/w500/8tNX8s3j1O0eqilOQkuroRLyOZA.jpg", genre: "Sci-Fi", rate: 8.8 },
            { title: "Forrest Gump", year: 1994, director: "Robert Zemeckis", duration: 142, poster: "https://image.tmdb.org/t/p/w500/h5J4W4veyxMXDMjeNxZI46TsHOb.jpg", genre: "Drama", rate: 8.8 },
            { title: "The Shawshank Redemption", year: 1994, director: "Frank Darabont", duration: 142, poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", genre: "Drama", rate: 9.3 },
            { title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino", duration: 154, poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", genre: "Crime", rate: 8.9 },
            { title: "The Godfather", year: 1972, director: "Francis Ford Coppola", duration: 175, poster: "https://image.tmdb.org/t/p/w500/eEslKSwcqmiNS6va24Pbxf2UKmJ.jpg", genre: "Crime", rate: 9.2 },
            { title: "The Lord of the Rings: The Return of the King", year: 2003, director: "Peter Jackson", duration: 201, poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg", genre: "Adventure", rate: 9.0 },
            { title: "The Matrix", year: 1999, director: "The Wachowskis", duration: 136, poster: "https://image.tmdb.org/t/p/w500/hlvzUBJpjMi3zRzR8pOua7rVRF3.jpg", genre: "Sci-Fi", rate: 8.7 },
            { title: "Fight Club", year: 1999, director: "David Fincher", duration: 139, poster: "https://image.tmdb.org/t/p/w500/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg", genre: "Drama", rate: 8.8 },
            { title: "Interstellar", year: 2014, director: "Christopher Nolan", duration: 169, poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo6680fSTgFi3.jpg", genre: "Sci-Fi", rate: 8.6 },
            { title: "Titanic", year: 1997, director: "James Cameron", duration: 195, poster: "https://image.tmdb.org/t/p/w500/kHXEpyfl6zqn8a6YuozZUujufXf.jpg", genre: "Romance", rate: 7.8 },
            { title: "The Silence of the Lambs", year: 1991, director: "Jonathan Demme", duration: 118, poster: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg", genre: "Thriller", rate: 8.6 },
            { title: "The Lion King", year: 1994, director: "Roger Allers, Rob Minkoff", duration: 88, poster: "https://image.tmdb.org/t/p/w500/2hzxzXYBDUD7QwMnwI0eF79C10d.jpg", genre: "Animation", rate: 8.5 },
            { title: "Avengers: Endgame", year: 2019, director: "Anthony Russo, Joe Russo", duration: 181, poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", genre: "Superhero", rate: 8.4 },
            { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980, director: "Irvin Kershner", duration: 124, poster: "https://image.tmdb.org/t/p/w500/7BuH8itoSrLExs2YZSsM01Qk2no.jpg", genre: "Sci-Fi", rate: 8.7 },
            { title: "Schindler's List", year: 1993, director: "Steven Spielberg", duration: 195, poster: "https://image.tmdb.org/t/p/w500/ahZp1r9I8IbSjaNdntzK1GzoMy5.jpg", genre: "History", rate: 9.0 },
            { title: "Saving Private Ryan", year: 1998, director: "Steven Spielberg", duration: 169, poster: "https://image.tmdb.org/t/p/w500/miDoEMlYDJhOCvxlzI0wZqBs9Yt.jpg", genre: "War", rate: 8.6 },
            { title: "Braveheart", year: 1995, director: "Mel Gibson", duration: 178, poster: "https://image.tmdb.org/t/p/w500/32NsLX9z1fAAnglgsoMXj3qKSEA.jpg", genre: "History", rate: 8.3 },
            { title: "Joker", year: 2019, director: "Todd Phillips", duration: 122, poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", genre: "Crime", rate: 8.4 },
            { title: "Toy Story", year: 1995, director: "John Lasseter", duration: 81, poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg", genre: "Animation", rate: 8.3 },
        ];
        const reviews = [
            { userId: 1, movieId: 1, rating: 5.0, comment: "An absolute masterpiece!" },
            { userId: 2, movieId: 1, rating: 4.5, comment: "Amazing cinematography and acting." },
            { userId: 3, movieId: 2, rating: 4.5, comment: "A mind-bending experience." },
            { userId: 4, movieId: 2, rating: 5.0, comment: "One of the best sci-fi films ever made." },
            { userId: 1, movieId: 3, rating: 4.0, comment: "Heartwarming and emotional." },
            { userId: 2, movieId: 3, rating: 4.5, comment: "Simply timeless." },
            { userId: 3, movieId: 4, rating: 5.0, comment: "The ultimate prison drama." },
            { userId: 4, movieId: 4, rating: 4.5, comment: "A story of hope and resilience." },
            { userId: 1, movieId: 5, rating: 4.0, comment: "Quentin Tarantino at his finest." },
            { userId: 2, movieId: 5, rating: 4.5, comment: "Unique and captivating." },
            { userId: 3, movieId: 6, rating: 5.0, comment: "A cinematic classic." },
            { userId: 4, movieId: 6, rating: 4.5, comment: "Outstanding performances and direction." },
            { userId: 1, movieId: 7, rating: 5.0, comment: "An epic conclusion to an epic saga." },
            { userId: 2, movieId: 7, rating: 4.5, comment: "Visually stunning." },
            { userId: 3, movieId: 8, rating: 4.0, comment: "A revolutionary sci-fi film." },
            { userId: 4, movieId: 8, rating: 4.5, comment: "Action-packed and thought-provoking." },
            { userId: 1, movieId: 9, rating: 4.5, comment: "Dark, gripping, and unforgettable." },
            { userId: 2, movieId: 9, rating: 5.0, comment: "David Fincher's best work." },
            { userId: 3, movieId: 10, rating: 4.0, comment: "An emotional rollercoaster." },
            { userId: 4, movieId: 10, rating: 4.5, comment: "Incredible visuals and story." },
            { userId: 1, movieId: 11, rating: 5.0, comment: "A tale of love and tragedy." },
            { userId: 2, movieId: 11, rating: 4.5, comment: "Heartbreaking and beautifully shot." },
            { userId: 3, movieId: 12, rating: 4.0, comment: "Powerful and moving." },
            { userId: 4, movieId: 12, rating: 4.5, comment: "Exceptional storytelling." },
            { userId: 1, movieId: 13, rating: 5.0, comment: "A thrilling journey." },
            { userId: 2, movieId: 13, rating: 4.5, comment: "Keeps you on the edge of your seat." },
            { userId: 3, movieId: 14, rating: 4.5, comment: "Visually impressive and engaging." },
            { userId: 4, movieId: 14, rating: 5.0, comment: "A true masterpiece of its genre." },
            { userId: 1, movieId: 15, rating: 4.0, comment: "Charming and delightful." },
            { userId: 2, movieId: 15, rating: 4.5, comment: "Entertaining from start to finish." },
            { userId: 3, movieId: 16, rating: 5.0, comment: "A dark and thought-provoking story." },
            { userId: 4, movieId: 16, rating: 4.5, comment: "An unforgettable experience." },
            { userId: 1, movieId: 17, rating: 5.0, comment: "A love story for the ages." },
            { userId: 2, movieId: 17, rating: 4.5, comment: "Romantic and captivating." },
            { userId: 3, movieId: 18, rating: 4.0, comment: "A perfect blend of humor and emotion." },
            { userId: 4, movieId: 18, rating: 4.5, comment: "Witty and charming throughout." },
            { userId: 1, movieId: 19, rating: 5.0, comment: "Epic in scale and execution." },
            { userId: 2, movieId: 19, rating: 4.5, comment: "A fantastic addition to the franchise." },
            { userId: 3, movieId: 20, rating: 4.5, comment: "Intense and thrilling." },
            { userId: 4, movieId: 20, rating: 5.0, comment: "A must-watch for fans of the genre." },
        ];
        await User.bulkCreate(users, { validate: true })
        await Movie.bulkCreate(movies, { validate: true })
        await Review.bulkCreate(reviews, { validate: true })
        console.log(p.green('Database populated succesfully'))
    }else {
        console.log(p.yellow('Database already populated'))
    }
}