### [sequelize](http://docs.sequelizejs.com/manual/tutorial/migrations.html)

- Bootstrapping

```
node_modules/.bin/sequelize init
```

- Creating first Model

```
node_modules/.bin/sequelize model:generate --name User --attributes username:string,password:string,email:string
```

- Running Migrations

```
node_modules/.bin/sequelize db:migrate
```