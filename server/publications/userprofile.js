import {UserProfile} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('userprofile.existingUser', function (userId) {
  	check(userId, String);
    return UserProfile.find({User_ID: userId});
  });
}