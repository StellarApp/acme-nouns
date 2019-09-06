const Sequelize = require("sequelize");
const conn = new Sequelize("postgres://localhost/acme_db");
const { UUID, UUIDV4, STRING } = Sequelize;

const People = conn.define("people", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false
  }
});

const Place = conn.define("places", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false
  }
});

const Things = conn.define("things", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false
  }
});

People.belongsTo(Place);
Place.hasMany(People);

Things.belongsTo(People);
People.hasMany(Things);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const places = [{ name: "New York" }, { name: "New Jersey" }];
  const [pl1, pl2] = await Promise.all(
    places.map(place => {
      Place.create(place);
    })
  );
  const things = [{ name: "pen" }, { name: "car" }, { name: "house" }];
  const [t1, t2, t3] = await Promise.all(
    things.map(thing => {
      Things.create(thing);
    })
  );
  const peoples = [
    { name: "Stella", placesId: p1.id, thingsId: t2 },
    { name: "Palak", placesId: p2.id, thingsId: t1 }
  ];

  const [p1, p2] = await Promise.all(
    peoples.map(people => {
      People.create(people);
    })
  );
};

syncAndSeed();
