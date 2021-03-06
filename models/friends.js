module.exports = function (sequelize, DataTypes) {
  const friends = sequelize.define(
    "friends",
    {
      user1: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      user2: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      accepted: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
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

  return friends;
};
