module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define(
    "posts",
    {
      text: {
        type: DataTypes.STRING,
      },
      media: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      likes: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
    },

    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      deletedAt: false,
      underscored: true,
    }
  );
  return posts;
};
