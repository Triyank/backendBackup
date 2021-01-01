module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    "comments",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      media: {
        type: DataTypes.STRING,
      },
    },

    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: false,
      underscored: true,
      freezeTableName: true,
    }
  );
  return comments;
};
