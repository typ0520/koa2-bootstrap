### [sequelize](http://docs.sequelizejs.com/manual/tutorial/migrations.html)

- Bootstrapping

```
./sequelize init
```

- Creating first Model

```
./sequelize model:generate --name User --attributes username:string,password:string,email:string
```

- Running Migrations

```
./sequelize db:migrate
```