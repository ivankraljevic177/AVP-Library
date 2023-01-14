const { signJwt, verifyJwt } = require("./jwt");
const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const config = require("dotenv").config();
const { Role, User, Book, BookLoan, sequelize } = require("./models");
const { Op } = require("sequelize");
const mysql = require("mysql");

const app = express();
const port = 4000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "avplibrary",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connection Accepted!");
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.listen(port, () => {
  console.log("Running on port " + port);
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user === null) {
      return res
        .status(404)
        .json({ message: "User not found! Please register first." });
    }
    if (req.body.password === user.password) {
      const token = signJwt(user.id);
      const newUser = { ...user.dataValues, token };
      return res.json(newUser);
    } else {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const [user, created] = await User.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        roleid: 2,
        ...req.body,
      },
    });
    if (created) {
      return res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/addBook", async (req, res) => {
  try {
    const [book, created] = await Book.findOrCreate({
      where: { name: req.body.name },
      defaults: {
        ...req.body,
      },
    });
    if (created) {
      return res.json(book);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/return-book", verifyJwt, async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.sub;

    const book = await Book.findOne({ where: { id: req.body.bookId } });
    if (book === null) {
      return res.status(404).json({ message: "Book not found!" });
    }

    // find the loan to be returned
    const loan = await BookLoan.findOne({
      where: {
        bookId,
        userId,
        dateEnd: null,
      },
    });
    if (!loan) {
      // loan not found, return error
      return res.send({
        success: false,
        error: "Loan not found or already returned",
      });
    }
    // update the loan's end date
    loan.dateEnd = new Date();
    await loan.save();
    await book.update({ copies: book.copies + 1 });

    // return success
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ success: false, error: "An error occurred" });
  }
});

app.post("/borrow-book", verifyJwt, async (req, res) => {
  const book = await Book.findOne({ where: { id: req.body.bookId } });
  if (book === null) {
    return res.status(404).json({ message: "Book not found!" });
  }
  // ovo nam ne treba kad smo se prebacili na "digitalne knjige"
  //if (book.copies <= 0) {
  //  return res.status(400).json({ message: "Book is not available for loan!" });
  //}
  const loan = await BookLoan.create({
    bookId: req.body.bookId,
    userId: req.user.sub,
    dateStart: new Date(),
  });
  await book.update({ copies: book.copies - 1 });
  return res.json(loan);
});

// handle /available-books GET request
app.get("/available-books", async (req, res) => {
  const books = await Book.findAll({
    where: {
      copies: { [Op.gt]: 0 },
    },
  });
  return res.json(books);
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

app.get("/books", async (req, res) => {
  const userId = 1;

  const books = await Book.findAll({
    include: [
      {
        model: BookLoan,
        required: false,
        where: {
          userId: userId,
          dateStart: {
            [Op.gte]: new Date(new Date() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
          },
          dateEnd: null,
        },
      },
    ],
  });

  const bookData = books.map((book) => {
    const currentlyLoaned = book.bookloans.length > 0;
    return {
      id: book.id,
      name: book.name,
      currentlyLoaned: currentlyLoaned,
    };
  });

  return res.json(bookData);
});

app.get("/loanedBooks", async (req, res) => {
  const loanedBooks = await BookLoan.findAll({ include: [Book, User] });
  return res.json(loanedBooks);
});

app.get("/books-with-loan-counts", async (req, res) => {
  const query = `
  SELECT b.id AS bookId, b.name, b.author, COUNT(l.bookId) AS loanCount
  FROM books b
  LEFT JOIN bookLoans l ON b.id = l.bookId
  GROUP BY b.id
`;

  sequelize
    .query(query, { type: Sequelize.QueryTypes.SELECT })
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving books");
    });
});

app.get("/pending-users", async (req, res) => {
  const loans = await BookLoan.findAll({ where: { dateEnd: null } });
  const userIds = loans.map((loan) => loan.userId);
  const users = await User.findAll({
    where: { id: { [Op.in]: userIds } },
  });
  return res.json(users);
});

app.get("/verify", verifyJwt, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.sub },
    });

    if (!user) {
      throw Error("User does not exist");
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//nez jel radi jos
app.get("/getBookById", async (req, res) => {
  try {
    const book = await Book.findOne({
      where: { bookId: req.book.bookId },
    });

    if (!book) {
      throw Error("User does not exist");
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
