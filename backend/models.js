const Sequelize = require("sequelize");

const sequelize = new Sequelize("avplibrary", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Role = sequelize.define(
  "role",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

User.belongsTo(Role, { foreignKey: "roleid" });
Role.hasMany(User, { foreignKey: "roleid" });

const Book = sequelize.define(
  "book",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ISBN: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    format: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publisher: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    copies: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const BookLoan = sequelize.define(
  "bookloan",
  {
    bookId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    dateStart: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    dateEnd: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

BookLoan.belongsTo(Book, { foreignKey: "bookId" });
Book.hasMany(BookLoan, { foreignKey: "bookId" });

BookLoan.belongsTo(User, { foreignKey: "userId" });
User.hasMany(BookLoan, { foreignKey: "userId" });

module.exports = {
  Role,
  User,
  Book,
  BookLoan,
};
