/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
const Raven = require('raven');
global._pager = require('sails-pager');
global._ = require('lodash');
global.slug = require('slug');
global._moment = require('moment');
global._pager = require('sails-pager');
global._uuidv = require('uuid/v4');
module.exports.bootstrap = async function(cb) {
  cb();

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)


  // await Faculty.create({name:'Faculty of Agriculture'});//1
  // await Faculty.create({name:'Faculty of Arts'});//2
  // await Faculty.create({name:'Faculty of Education'});//3
  // await Faculty.create({name:'Faculty of Engineering'});//4
  // await Faculty.create({name:'Faculty of Environmental Sciences'});//5
  // await Faculty.create({name:'Faculty of Law'});//6
  // await Faculty.create({name:'Faculty of Management sciences'});//7
  // await Faculty.create({name:'Faculty of Life Sciences'});//8
  // await Faculty.create({name:'Faculty of Social Sciences'});//9
  // await Faculty.create({name:'Faculty of Pharmacy'});//10
  // await Faculty.create({name:'Faculty of Physical Sciences'});//11
  // await Faculty.create({name:'College of Medical Sciences'});//12
  // await Faculty.create({name:'School of Basic Med. Science'});//13
  // await Faculty.create({name:'School of Dentistry'});//14
  // await Faculty.create({name:'School of Medicine'});//15


  // await Department.create({name:'Animal Science', faculty: "1"});
  // await Department.create({name:'Forestry And WildLife', faculty: "1"});

  // await Department.create({name:'English and Literature', faculty: "2"});
  // await Department.create({name:'Fine and Applied Arts', faculty: "2"});
  // await Department.create({name:'Foreign Languages', faculty: "2"});
  // await Department.create({name:'Linguistics and African Languages', faculty: "2"});
  // await Department.create({name:'Philosophy and Religions', faculty: "2"});
  // await Department.create({name:'Theatre Arts and Mass communication', faculty: "2"});

  // await Department.create({name:'Adult and Non-formal Education', faculty: "3"});
  // await Department.create({name:'Curriculum and Instructional Technology', faculty: "3"});
  // await Department.create({name:'Educational Foundations', faculty: "3"});
  // await Department.create({name:'Education Evaluation and Counselling Psychology', faculty: "3"});
  // await Department.create({name:'Health, Safety and Environmental Education', faculty: "3"});
  // await Department.create({name:'Human Kinetics and Sports Science', faculty: "3"});
  // await Department.create({name:'Vocation and Technical Education', faculty: "3"});

  // await Department.create({name:'Private and property law', faculty: "6"});
  // await Department.create({name:'Public Law', faculty: "6"});
  // await Department.create({name:'Business Law', faculty: "6"});
  // await Department.create({name:'Jurisprudence and International law', faculty: "6"});

  // await Department.create({name:'Biochemistry', faculty: "8"});
  // await Department.create({name:'Environmental Management and Toxicology', faculty: "8"});
  // await Department.create({name:'Optometry', faculty: "8"});
  // await Department.create({name:'Plant Biology and Biotechnology', faculty: "8"});

  //   await Department.create({name:'Economics and Statistics', faculty: "9"});
  // await Department.create({name:'Geography and Regional Planning', faculty: "9"});
  // await Department.create({name:'Political Science', faculty: "9"});
  // await Department.create({name:'Public Administration', faculty: "9"});
  // await Department.create({name:'Sociology and Anthropology', faculty: "9"});
  // await Department.create({name:'Social Works', faculty: "9"});

  // await Department.create({name:'Clinical Pharmacy & Pharmacy Practice', faculty: "10"});
  // await Department.create({name:'Pharmaceutical Chemistry', faculty: "10"});
  // await Department.create({name:'Pharmaceutical Microbiology', faculty: "10"});
  // await Department.create({name:'Pharmaceutics & Pharmaceutical Technology', faculty: "10"});
  // await Department.create({name:'Pharmacology', faculty: "10"});
  // await Department.create({name:'Pharmacology & Toxicology', faculty: "10"});

  // await Department.create({name:'Chemistry', faculty: "11"});
  // await Department.create({name:'Computer Science', faculty: "11"});
  // await Department.create({name:'Geology', faculty: "11"});
  // await Department.create({name:'Mathematics', faculty: "11"});
  // await Department.create({name:'Physics', faculty: "11"});

  // await Department.create({name:'Anatomy', faculty: "13"});
  // await Department.create({name:'Medical Biochemistry', faculty: "13"});
  // await Department.create({name:'Medical Laboratory science', faculty: "13"});
  // await Department.create({name:'Nursing Sciences', faculty: "13"});
  // await Department.create({name:'Physiology', faculty: "13"});
  // await Department.create({name:'Physiotheraphy', faculty: "13"});
  // await Department.create({name:'Radiography', faculty: "13"});

  // await Department.create({name:'Oral Diagnosis and Radiology', faculty: "14"});
  // await Department.create({name:'Oral Surgery and Pathology', faculty: "14"});
  // await Department.create({name:'Periodontics Dentistry', faculty: "14"});
  // await Department.create({name:'Preventive Dentistry', faculty: "14"});
  // await Department.create({name:'Restorative Dentistry', faculty: "14"});
  
  // await Department.create({name:'Anaesthesiology', faculty: "15"});
  // await Department.create({name:'Chemical Pathology', faculty: "15"});
  // await Department.create({name:'Child Health', faculty: "15"});
  // await Department.create({name:'Community Health', faculty: "15"});
  // await Department.create({name:'Haematology', faculty: "15"});
  // await Department.create({name:'Medical Microbiology', faculty: "15"});
  // await Department.create({name:'Medicine', faculty: "15"});
  // await Department.create({name:'Mental Health', faculty: "15"});
  // await Department.create({name:'Morbid Anatomy', faculty: "15"});
  // await Department.create({name:'Obstetrics & Gynaecology', faculty: "15"});
  // await Department.create({name:'Ophthalmology', faculty: "15"});
  // await Department.create({name:'Orthopaedics & Traumatology', faculty: "15"});
  // await Department.create({name:'Radiology', faculty: "15"});
  // await Department.create({name:'Surgery', faculty: "15"});








  //stop or start

  
  // await Department.create({name:'Accounting', faculty: "7"});
  // await Department.create({name:'Actuarial Science', faculty: "7"});
  // await Department.create({name:'Adult Education', faculty: "3"});
  // await Department.create({name:'Adult Education / Economics and Statistics', faculty: "3"});
  // await Department.create({name:'Adult Education / English Literature', faculty: "3"});
  // await Department.create({name:'Adult Education / Geography and Regional Planning', faculty: "3"});
  // await Department.create({name:'Adult Education / Political Science and Public Administration', faculty: "3"});
  // await Department.create({name:'Agricultural Economics', faculty: "1"});
  // await Department.create({name:'Agricultural Science and Education', faculty: "3"});
  // await Department.create({name:'Animal Biology and Environment', faculty: "8"});
  // await Department.create({name:'Animal Science', faculty: "1"});
  // await Department.create({name:'Architecture', faculty: "4"});
  // await Department.create({name:'Biochemistry', faculty: "8"});
  // await Department.create({name:'Banking and Finance', faculty: "7"});
  // await Department.create({name:'Botany', faculty: "1"});
  // await Department.create({name:'Business Administration', faculty: "7"});
  // await Department.create({name:'Business Education', faculty: "3"});
  // await Department.create({name:'Chemical Engineering', faculty: "4"});
  // await Department.create({name:'Chemistry', faculty: "1"});
  // await Department.create({name:'Civil Engineering', faculty: "4"});
  // await Department.create({name:'Computer Education', faculty: "3"});
  // await Department.create({name:'Computer Engineering', faculty: "4"});
  // await Department.create({name:'Computer Science', faculty: "11"});
  // await Department.create({name:'Dentistry And Dental Surgery', faculty: "14"});
  // await Department.create({name:'Dentistry and Dental Technology', faculty: "14"});
  // await Department.create({name:'Drama / Dramatic / Performing Arts', faculty: "2"});
  // await Department.create({name:'Early Childhood Education', faculty: "3"});
  // await Department.create({name:'Education and Biology', faculty: "3"});
  // await Department.create({name:'Education and Chemistry', faculty: "3"});
  // await Department.create({name:'Education and Computer Science', faculty: "3"});
  // await Department.create({name:'Education and Economics', faculty: "3"});
  // await Department.create({name:'Education and Edo Language', faculty: "3"});
  // await Department.create({name:'Education and English Language and Literature', faculty: "3"});
  // await Department.create({name:'Education and Fine and Applied Arts', faculty: "3"});
  // await Department.create({name:'Education and French', faculty: "3"});
  // await Department.create({name:'Education and Geography', faculty: "3"});
  // await Department.create({name:'Education and History', faculty: "3"});
  // await Department.create({name:'Education and Integrated Science', faculty: "3"});
  // await Department.create({name:'Education and Mathematics', faculty: "3"});
  // await Department.create({name:'Education and Physics', faculty: "3"});
  // await Department.create({name:'Education and Political Science', faculty: "3"});
  // await Department.create({name:'Education and Religious Studies', faculty: "3"});
  // await Department.create({name:'Education and Social Studies', faculty: "3"});
  // await Department.create({name:'Education Psychology and Curriculum Studies', faculty: "3"});
  // await Department.create({name:'Educational Administration', faculty: "3"});
  // await Department.create({name:'Educational Management', faculty: "3"});
  // await Department.create({name:'Electrical / Electronic Engineering', faculty: "4"});
  // await Department.create({name:'English Language and Literature', faculty: "2"});
  // await Department.create({name:'Environmental Education', faculty: "3"});
  // await Department.create({name:'Environmental Management And Toxicology', faculty: "3"});
  // await Department.create({name:'Enterpreneurship', faculty: "7"});
  // await Department.create({name:'Estate Management', faculty: "4"});
  // await Department.create({name:'Fine Art / Fine and Applied Arts', faculty: "2"});
  // await Department.create({name:'Fisheries', faculty: "1"});
  // await Department.create({name:'Forestry And WildLife', faculty: "1"});
  // await Department.create({name:'Foreign Language', faculty: "2"});
  // await Department.create({name:'French', faculty: "2"});
  // await Department.create({name:'Geography and Regional Planning', faculty: "9"});
  // await Department.create({name:'Geology', faculty: "11"});
  // await Department.create({name:'Guidance and Counseling', faculty: "1"});
  // await Department.create({name:'Health Education', faculty: "3"});
  // await Department.create({name:'History', faculty: "2"});
  // await Department.create({name:'Home Economics and Education', faculty: "1"});
  // await Department.create({name:'Human Kinetics', faculty: "3"});
  // await Department.create({name:'Industrial Chemistry', faculty: "2"});
  // await Department.create({name:'Industrial Mathematics', faculty: "2"});
  // await Department.create({name:'Industrial Relations and Personnel Management', faculty: "2"});
  // await Department.create({name:'Industrial Technical Education', faculty: "2"});
  // await Department.create({name:'Insurance', faculty: "7"});
  // await Department.create({name:'International Studies and Diplomacy', faculty: "2"});
  // await Department.create({name:'Languages and Linguistics', faculty: "2"});
  // await Department.create({name:'Law', faculty: "6"});
  // await Department.create({name:'Library and Information Science', faculty: "2"});
  // await Department.create({name:'Linguistics / Edo', faculty: "2"});
  // await Department.create({name:'Linguistics and African Language', faculty: "2"});
  // await Department.create({name:'Marketing', faculty: "7"});
  // await Department.create({name:'Mass Communication', faculty: "2"});
  // await Department.create({name:'Mathematics and Economics', faculty: "11"});
  // await Department.create({name:'Mechanical Engineering', faculty: "4"});
  // await Department.create({name:'Medical Biochemistry', faculty: "2"});
  // await Department.create({name:'Medical Laboratory Technology / Science', faculty: "2"});
  // await Department.create({name:'Medicine and Surgery', faculty: "12"});
  // await Department.create({name:'Microbiology', faculty: "8"});
  // await Department.create({name:'Nursing / Nursing Science', faculty: "2"});
  // await Department.create({name:'Optometry', faculty: "8"});
  // await Department.create({name:'Petroleum Engineering', faculty: "4"});
  // await Department.create({name:'Pharmacy', faculty: "10"});
  // await Department.create({name:'Philosophy', faculty: "2"});
  // await Department.create({name:'Physical Education', faculty: "3"});
  // await Department.create({name:'Physics', faculty: "11"});
  // await Department.create({name:'Physics / Industrial Physics', faculty: "11"});
  // await Department.create({name:'Physiology', faculty: "2"});
  // await Department.create({name:'Physiotherapy', faculty: "2"});
  // await Department.create({name:'Plant Science and Biotechnology', faculty: "8"});
  // await Department.create({name:'Political Science', faculty: "2"});
  // await Department.create({name:'Political Science and Public Administration', faculty: "9"});
  // await Department.create({name:'Production Engineering', faculty: "4"});
  // await Department.create({name:'Public Administration', faculty: "9"});
  // await Department.create({name:'Pure / Applied Mathematics', faculty: "2"});
  // await Department.create({name:'Quantity Surveying', faculty: "5"});
  // await Department.create({name:'Religious Studies', faculty: "2"});
  // await Department.create({name:'Science Laboratory Technology', faculty: "8"});
  // await Department.create({name:'Secretarial Administration and Education', faculty: "3"});
  // await Department.create({name:'Secretarial Education', faculty: "3"});
  // await Department.create({name:'Social Works', faculty: "9"});
  // await Department.create({name:'Sociology and Anthropology', faculty: "9"});
  // await Department.create({name:'Soil Science', faculty: "1"});
  // await Department.create({name:'Special Education', faculty: "3"});
  // await Department.create({name:'Statistics', faculty: "2"});
  // await Department.create({name:'Structural Engineering', faculty: "4"});
  // await Department.create({name:'Surveying and Geo-Informatics', faculty: "4"});
  // await Department.create({name:'Technical Education', faculty: "3"});
  // await Department.create({name:'Theater Arts', faculty: "2"});
};
