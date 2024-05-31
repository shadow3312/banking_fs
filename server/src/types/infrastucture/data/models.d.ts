import User from "@/infrastructure/data/models/user/user.model";

declare module "sequelize" {
  interface Sequelize {
    models: {
      User: typeof User;
      // Ajoutez d'autres modèles ici si nécessaire
    };
  }
}
