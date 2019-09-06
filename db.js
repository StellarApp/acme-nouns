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

const Places = conn.define("places", {
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

People.belongsTo(Places);
Places.hasMany(People);

Things.belongsTo(People);
People.hasMany(Things);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  // const places = [{ name: "New York" }, { name: "New Jersey" }];
  const things = [{ name: "pen" }, { name: "car" }, { name: "house" }];
  // const people = [{ name: "Stella" }, { name: "Palak" }, {name: "Mandoo"}];

  const acmePlaces = await Promise.all(
    [Places.create({ name: "New York" }), Places.create({ name: "Texas" })]
    // places.map(place => {
    //   Places.create(place);
    // }) // this returns 'undefined' // console.log(acmePlaces);
  );

  // console.log(acmePlaces[0].get());

  const acmePeople = await Promise.all(
    [
      People.create({ name: "Stella", placeId: acmePlaces[1].id }),
      People.create({ name: "Palak", placeId: acmePlaces[0].id }),
      People.create({ name: "Mandoo", placeId: acmePlaces[1].id })
    ]
    // people.map((people, i) => {
    //   People.create({ ...people, placeId: acmePlaces[i].id });
    // })
  );
    // console.log(acmePeople[0].get());

  await Promise.all(
    things.map((thing, idx) => {
      Things.create({ ...thing, personId: acmePeople[idx].id });
    })
  );
};

// syncAndSeed();

module.exports = {
  syncAndSeed,
  models: {
    Places,
    Things,
    People
  }
};
