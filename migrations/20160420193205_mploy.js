exports.up = function(knex, Promise) {
  return Promise.all([

    //users table
    knex.schema.createTable('users', function(table) {
      table.increments('userID').primary();
      table.string('linkedin_id').unique();
      table.string('username', 30); //needs character limit
      table.string('firstname', 30);
      table.string('lastname', 30);
      table.string('profile_picture');
      table.string('email');
      table.string('industry');
      table.string('linkedin_headline');
      table.string('location');
      table.string('linkedin_url');
      table.string('resume');
      table.boolean('employer');
    }),

    // //job posts table
    knex.schema.createTable('job_posts', function(table) {
      table.increments('jobID').primary();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.string('company_name');
      table.string('job_title');
      table.string('job_description', 400);
      table.string('desired_education');
      table.integer('min_salary');
      table.integer('max_salary');
      table.string('location');
      table.string('employment_type');
      table.boolean('visa_required');
      table.jsonb('skills');
      table.integer('user_id')
        .references('userID')
        .inTable('users');
    }),
    
    //applications table
    knex.schema.createTable('applications', function(table) {
      table.increments('appID').primary();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.string('cover_letter');
      table.string('years_experience');
      table.string('education', 100);
      table.string('personal_statement', 300);
      table.string('status');
      table.jsonb('skills_met');
      table.boolean('can_work_here');
      table.integer('user_id')
        .references('userID')
        .inTable('users');
      table.integer('job_id')
        .references('jobID')
        .inTable('job_posts');
     }),

    // //stats table
    knex.schema.createTable('stats', function(table) {
      table.increments('statID').primary();
      table.integer('total_apps');
      table.integer('rescinded');
      table.integer('denied');
      table.integer('applied');
      table.integer('considered');
      table.integer('interviewed');
      table.integer('offered');
      table.integer('user_id')
        .references('userID')
        .inTable('users'); 
    }),

    knex.schema.createTable('notifications', function(table) {
      table.increments('notifyID').primary();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.string('new_status')
      table.integer('app_id')
        .references('appID')
        .inTable('applications');
      table.integer('user_id')
        .references('userID')
        .inTable('users');
     }),
  ])
};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('job_posts'),
    knex.schema.dropTable('applications'),
    knex.schema.dropTable('stats'),
    knex.schema.dropTable('notifications')
  ]);
};