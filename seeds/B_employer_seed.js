
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('employers').del(), 

    // Inserts seed entries
    knex('employers').insert({user_id: 1}),
    knex('employers').insert({user_id: 3})
  );
};
