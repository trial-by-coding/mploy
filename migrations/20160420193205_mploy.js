exports.up = function(knex, Promise) {
  return Promise.all([

    //users table
    knex.schema.createTable('users', function(table) {
      table.increments('userID').primary();
      table.string('linkedin_id').unique();
      table.string('username', 30); //needs character limit
      table.string('profile_picture');
      table.string('email');
      table.binary('resume');
    }),

    //companies table
    knex.schema.createTable('employers', function(table) {
      table.increments('employerID').primary();
      table.integer('user_id')
        .references('userID')
        .inTable('users');
    }),

    //applications table
    knex.schema.createTable('applications', function(table) {
      table.increments('appID').primary();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.binary('cover_letter');
      table.decimal('years_experience', 4, 1);
      table.string('desired_education', 100);
      table.string('personal_statement', 300);
      table.string('status');
      table.boolean('skill_1_met');
      table.boolean('skill_2_met');
      table.boolean('skill_3_met');
      table.boolean('skill_4_met');
      table.boolean('skill_5_met');
      table.boolean('skill_6_met');
      table.boolean('skill_7_met');
      table.boolean('skill_8_met');
      table.boolean('skill_9_met');
      table.boolean('skill_10_met');
      table.boolean('can_work_here');
      table.integer('user_id')
        .references('userID')
        .inTable('users');
      table.integer('job_id')
        .references('jobID')
        .inTable('job_posts');
     }),

    // //job posts table
    knex.schema.createTable('job_posts', function(table) {
      table.increments('jobID').primary();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.string('company_name');
      table.string('job_description');
      table.string('desired_education');
      table.integer('min_salary');
      table.integer('max_salary');
      table.string('location');
      table.string('employment_type');
      table.boolean('visa_required');
      table.string('skill_1');
      table.string('skill_2');
      table.string('skill_3');
      table.string('skill_4');
      table.string('skill_5');
      table.string('skill_6');
      table.string('skill_7');
      table.string('skill_8');
      table.string('skill_9');
      table.string('skill_10');
      table.integer('user_id')
        .references('userID')
        .inTable('users');
    }),

    // //stats table
    knex.schema.createTable('stats', function(table) {
      table.increments('statID').primary();
      table.integer('total_apps');
      table.integer('denied');
      table.integer('considered');
      table.integer('interviewed');
      table.integer('user_id')
        .references('userID')
        .inTable('users'); 
    })
  ])
};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('companies'),
    knex.schema.dropTable('applications'),
    knex.schema.dropTable('job_posts'),
    knex.schema.dropTable('stats'),
  ]);
};