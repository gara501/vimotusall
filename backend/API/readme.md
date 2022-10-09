# Vimotus Routine API

## Models generation
Run this code inside the project folder, first generate the DUMP file from MySql.

sequelize-auto -h localhost -d vimotus_routines -u root -x 123456 -p 3306  --dialect mysql -c /JSProjects/PROJECTS/VIMOTUS/backend/graphql-express-migrating-mysql/tutorial_assets/sequelize-auto-settings.json -o /JSProjects/PROJECTS/VIMOTUS/backend/graphql-express-migrating-mysql/app/models