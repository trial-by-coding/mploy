
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({linkedin_id: '12313', username: 'Joe Shmo', firstname: 'Joe', lastname: 'Shmo', profile_picture: 'http://lorempixel.com/400/200/', email: 'joeshmo@gmail.com', industry: 'Banking', linkedin_headline: 'Senior Banker at BoA', location: 'SF Bay Area, CA', linkedin_url: 'linkedin.com', employer: true}),
    knex('users').insert({linkedin_id: '22313', username: 'John Doe', firstname: 'John', lastname: 'Doe', profile_picture: 'http://lorempixel.com/400/200/', email: 'frankie@frankie.com', industry: 'Facility Management', linkedin_headline: 'Custodian at Smith HS', location: 'SF Bay Area, CA', linkedin_url: 'linkedin.com', employer: false}),
    knex('users').insert({linkedin_id: '32313', username: 'Tom Smith', firstname: 'Tom', lastname: 'Smith', profile_picture: 'http://lorempixel.com/400/200/', email: 'lance@lance.com', industry: 'Education', linkedin_headline: 'Director of Admissions at MakerSquare', location: 'Austin Area, TX', linkedin_url: 'linkedin.com', employer: true}),
    knex('users').insert({linkedin_id: '42313', username: 'Robert Roberts', firstname: 'Robert', lastname: 'Roberts', profile_picture: 'http://lorempixel.com/400/200/', email: 'rich@rich.com', industry: 'Computer Software', linkedin_headline: 'Software Developer', location: 'Austin Area, TX', linkedin_url: 'linkedin.com', employer: false}),
    knex('users').insert({linkedin_id: '52311', username: 'Joel Johnson', firstname: 'Joel', lastname: 'Johnson', profile_picture: 'http://lorempixel.com/400/200/', email: 'john@john.com', industry: 'Computer Software', linkedin_headline: 'Developer at BlahCorp', location: 'Austin Area, TX', linkedin_url: 'linkedin.com', employer: false}),
    knex('users').insert({linkedin_id: '52312', username: 'Bob Bobbington', firstname: 'Bob', lastname: 'Bobbington', profile_picture: 'http://lorempixel.com/400/200/', email: 'bob@bob.com', industry: 'Computer Software', linkedin_headline: 'Developer at BlahCorp', location: 'Austin Area, TX', linkedin_url: 'linkedin.com', employer: false}),
    knex('users').insert({linkedin_id: '62313', username: 'Stacy Smith', firstname: 'Stacy', lastname: 'Smith', profile_picture: 'http://lorempixel.com/400/200/', email: 'stacy@stacy.com', industry: 'Computer Software', linkedin_headline: 'Developer at BlahCorp', location: 'Austin Area, TX', linkedin_url: 'linkedin.com', employer: false}),
    knex('users').insert({linkedin_id: '52314', username: 'Alice Albert', firstname: 'Alice', lastname: 'Albert', profile_picture: 'http://lorempixel.com/400/200/', email: 'alice@alice.com', industry: 'Computer Software', linkedin_headline: 'Developer at BlahCorp', location: 'Austin Area, TX', linkedin_url: 'linkedin.com', employer: false}),
    knex('users').insert({linkedin_id: '52315', username: 'Beth Bee', firstname: 'Beth', lastname: 'Bee', profile_picture: 'http://lorempixel.com/400/200/', email: 'beth@beth.com', industry: 'Computer Software', linkedin_headline: 'Developer at BlahCorp', location: 'Austin Area, TX', linkedin_url: 'linkedin.com', employer: false}),
    knex('users').insert({linkedin_id: '52316', username: 'Donna Jones', firstname: 'Donna', lastname: 'Jones', profile_picture: 'http://lorempixel.com/400/200/', email: 'donna@donna.com', industry: 'Computer Software', linkedin_headline: 'Developer at BlahCorp', location: 'Austin Area, TX', linkedin_url: 'linkedin.com', employer: false})
  );
};