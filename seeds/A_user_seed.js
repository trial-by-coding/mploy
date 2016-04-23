
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({linkedin_id: '12313', username: 'Matt Phillips', profile_picture: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/085/208/31223ad.jpg', email: 'matthewcannonphillips@gmail.com'}),
    knex('users').insert({linkedin_id: '22313', username: 'Frankie V', profile_picture: 'http://lorempixel.com/400/200/', email: 'frankie@frankie.com'}),
    knex('users').insert({linkedin_id: '32313', username: 'Lance Spears', profile_picture: 'https://avatars2.githubusercontent.com/u/15279951?v=3&s=460', email: 'lance@lance.com'}),
    knex('users').insert({linkedin_id: '42313', username: 'Richard Morales', profile_picture: 'https://avatars3.githubusercontent.com/u/16308972?v=3&s=400', email: 'rich@rich.com'}),
    knex('users').insert({linkedin_id: '52313', username: 'John Carpenter', profile_picture: 'https://avatars3.githubusercontent.com/u/2602674?v=3&s=460', email: 'john@john.com'})
  );
};
