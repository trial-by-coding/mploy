import apps from './app_reducers';
import jobs from './job_reducers';
import profile from './profile_reducers';
import appdash from './appdash_reducers';
import employerposts from './employer_posts_reducers';
import employerunconsidered from './employer_unconsidered_reducers';
import employerconsidered from './employer_considered_reducers';
import employerinterviews from './employer_interviews_reducers';
import employeroffers from './employer_offers_reducers';
import charts from './chart_reducers';
import notifications from './notifications';
import modals from './modal_reducers';

module.exports = {
  ...apps,
  ...jobs,
  ...charts,
  ...profile,
  ...appdash,
  ...employerposts,
  ...employerunconsidered,
  ...employerconsidered,
  ...employerinterviews,
  ...employeroffers,
  ...notifications,
  ...modals
};



// {(() => {
//           console.log('currentModal index', currentModal.index, 'currentModal status', currentModal.status)
//           if(currentModal.index === index && currentModal.status === status){
//             console.log('empdashCard if statement', that);
//             setTimeout(function(){
//             ModalManager.create.bind(this, this.getLargeModal())
              
//             }, 2000);
//           }
//         })()}