
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('job_posts').del(), 
    // Inserts seed entries
    knex('job_posts').insert({company_name: 'Bank of America', job_title: 'Banker', job_description: 'Bank of America is a great company that offers great benefits. The banker is responsible for handling money and interacting with customers in a courteous manner.', desired_education: 'Bachelors Degree in Finance', min_salary: 40000, max_salary: 50000, location: 'San Francisco', employment_type: 'Full-Time', visa_required: true, skills: JSON.stringify(['Counting', 'Microsoft Excel', 'Microsoft Outlook', 'Data Entry']), user_id: 1}),
    knex('job_posts').insert({company_name: 'Bank of America', job_title: 'Custodian', job_description: 'Bank of America is a great company that offers great benefits. The custodian is responsible for maintaining the facility.', desired_education: 'GED', min_salary: 25000, max_salary: 35000, location: 'San Francisco', employment_type: 'Full-Time', visa_required: false, skills: JSON.stringify(['Landscaping', 'Basic Plumbing']), user_id: 1}),
    knex('job_posts').insert({company_name: 'MakerSquare', job_title: 'Fellow', job_description: 'MakerSquare is an immersive software engineering program. The fellow is responsible for assisting students and interviewing potential students.', desired_education: 'GED', min_salary: 30000, max_salary: 30000, location: 'Austin', employment_type: 'Part-Time', visa_required: true, skills: JSON.stringify(['Javascript', 'Node.js', 'Express', 'Backbone.js']), user_id: 3}),
    knex('job_posts').insert({company_name: 'MakerSquare', job_title: 'Instructor', job_description: 'MakerSquare is an immersive software engineering program. The instructor is responsible for teaching the curriculum.', desired_education: 'Bachelors Degree in CS', min_salary: 40000, max_salary: 50000, location: 'Austin', employment_type: 'Full-Time', visa_required: true, skills: JSON.stringify(['Javascript', 'Node.js',  'Express', 'AngularJS', 'Chai', 'Backbone', 'jQuery']), user_id: 3})
  );
};