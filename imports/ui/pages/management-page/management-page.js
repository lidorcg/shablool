import { Template } from 'meteor/templating';

import './management-page.html';
import Quiz from '../../../api/quizes/quizes';

Template.managementPage.onCreated(function() {
  Template.instance().subscribe('quiz-title');
});

Template.managementPage.helpers({
  getQuizes() {
    return Quiz.find();
  },
});