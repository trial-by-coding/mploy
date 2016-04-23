
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('applications').del(), 

    // Inserts seed entries
    knex('applications').insert({years_experience: 1.5, desired_education: 'MA in CS', personal_statement: 'I am a great guy who likes computers', skill_1_met: true, skill_2_met: true, skill_3_met: false, skill_4_met: false, skill_5_met: true, skill_6_met: true, skill_7_met: true, can_work_here: false, user_id: 5, job_id: 4}),
    knex('applications').insert({years_experience: 1.5, desired_education: 'MA in CS', personal_statement: 'I am a great guy who likes computers', skill_1_met: true, skill_2_met: true, skill_3_met: false, skill_4_met: false, skill_5_met: true, skill_6_met: true, skill_7_met: true, can_work_here: false, user_id: 5, job_id: 3}),
    knex('applications').insert({years_experience: 1.5, desired_education: 'MBA', personal_statement: 'I am a great guy who likes banking', skill_1_met: true, skill_2_met: true, skill_3_met: false, skill_4_met: false, can_work_here: true, user_id: 4, job_id: 1}),
    knex('applications').insert({years_experience: 1.5, desired_education: 'GED', personal_statement: 'I am a great guy who likes facility maintenance', skill_1_met: true, skill_2_met: true, can_work_here: true, user_id: 2, job_id: 2})
  );
};
