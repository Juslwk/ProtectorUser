export default {
  clearErrors({LocalState}) {
    return LocalState.set('ERROR', null);
  },
  loginUser({Meteor, LocalState}, emailVar, passwordVar) {
	Meteor.loginWithPassword(
		{email: emailVar},
		passwordVar,
		function(error) {
			if (error) {
				LocalState.set('ERROR', 'Email or Password is invalid.');
			}
		}
	);
  },
  createNewUser({Accounts, LocalState}, emailVar, passwordVar) {
	Accounts.createUser({
	  email: emailVar,
	  password: passwordVar
	}, 
	  function(error) {
		if (error) {
		  LocalState.set('ERROR', 'Failed to create account.');
		}
		else{
			FlowRouter.go('/user/home');
		}
	});
  },
  loginWithFacebook({Meteor, LocalState}) {
	Meteor.loginWithFacebook({}, function(error){
	    if (error) {
			LocalState.set('ERROR', 'Failed to login using Facebook.');
	    }
		else{
			FlowRouter.go('/user/home');
		}
	});
  },
  updateProfile({Meteor, FlowRouter}, userProfile){
  	// console.log(Meteor.userId());
  	Meteor.call('users.updateProfile', userProfile, Meteor.userId(), (err) =>{
  		if(err){
  			console.log(err);
  		}
  		else{
  			FlowRouter.go('/services/search')
  		}
  	});
  }
};