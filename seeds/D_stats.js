
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries //4 //2
    knex('stats').del(), 

    // Inserts seed entries
    knex('stats').insert({total_apps: 2, denied: 1, considered: 1, interviewed: 0, additional: 0, offered: 0, user_id: 2}),
    knex('stats').insert({total_apps: 1, denied: 0, considered: 0, interviewed: 1, additional: 0, offered: 0, user_id: 4}),
    knex('stats').insert({total_apps: 2, denied: 0, considered: 1, interviewed: 0, additional: 0, offered: 0, user_id: 5}),
    knex('stats').insert({total_apps: 3, denied: 0, considered: 1, interviewed: 0, additional: 0, offered: 0, user_id: 6}),
    knex('stats').insert({total_apps: 3, denied: 0, considered: 1, interviewed: 0, additional: 0, offered: 0, user_id: 7}),
    knex('stats').insert({total_apps: 3, denied: 0, considered: 1, interviewed: 0, additional: 0, offered: 0, user_id: 8}),
    knex('stats').insert({total_apps: 3, denied: 0, considered: 1, interviewed: 0, additional: 0, offered: 0, user_id: 9}),
    knex('stats').insert({total_apps: 3, denied: 0, considered: 1, interviewed: 0, additional: 0, offered: 0, user_id: 10})
  );
};
