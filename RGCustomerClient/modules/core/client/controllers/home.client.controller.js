'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Menus', 'Project', '$http', '$state',
  function ($scope, Authentication, Menus, Project, $http, $state) {
    // This provides Authentication context.
    $scope.authentication = Authentication; 
    $scope.users = [];
    $scope.displayedUsers = [];
    $scope.shouldDisplayUsers = false;
    if($scope.authentication.user){
      Menus.setMenu($scope.authentication.user);  // header will check Menu to see if it changed
    }

    $scope.samplesAccess = false;
    $scope.platesAccess = false;
    $scope.projectAccess = false;
    $scope.projectFinancesAccess = false;  

		$scope.getUsersAndProjects = function() {
			if ($scope.authentication) {
				$http({  // retrieve projects that this person has access to
		      method: 'GET',
		      url: '/api/allowedprojects'
				})
				.then(function successCallback(response) {
	        $scope.hello = response.data;
			
			
		console.log($scope.hello); 
		if ($scope.hello[0])
			$scope.switchProject($scope.hello[0]); 
			
			
			
	      }, function errorCallback(response) {
	        console.log('Error in retrieving projects');
	      });

        if($scope.authentication.user){
          var roles = $scope.authentication.user.roles;
          if(roles.includes('admin') || roles.includes('groupleader')){  // actual authentication done one back-end
            $scope.shouldDisplayUsers = true;
          }
        }

        if($scope.shouldDisplayUsers === true){
          $http({  // retrieve users that this person has access to
            method: 'GET',
            url: '/api/users'
          })
          .then(function successCallback(response) {
            $scope.users = response.data;
			
          }, function errorCallback(response) {
            console.log('Error in retrieving projects');
          });
        }
			} 
		};

    var addRippleEffect = function (e) {
      var target = e.target;
      if (target.tagName.toLowerCase() !== 'button') return false;
      var rect = target.getBoundingClientRect();
      var ripple = target.querySelector('.ripple');
      if (!ripple) {
          ripple = document.createElement('span');
          ripple.className = 'ripple';
          ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
          target.appendChild(ripple);
      }
      ripple.classList.remove('show');
      var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
      var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
      ripple.style.top = top + 'px';
      ripple.style.left = left + 'px';
      ripple.classList.add('show');
      return false;
    };

document.addEventListener('click', addRippleEffect, false);



	var platedata = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]; 
	
	$scope.labels = ['Pending Arrival', 'Sample Arrived', 'Quality Control 1', 'Shearing', 
			'Library Preparation', 'Quality Control 2', 'Hybridization', 'Quality Control 3', 
			'Sequencing', 'Data Analysis', 'Completed'];
    $scope.series = ['Series A'];
	$scope.colors = 
	[{  
			fillColor: "#b2b3b4", 
            strokeColor: "#000000", 
            highlightFill: "#ff9966", 
            highlightStroke: "#000000", 
	}] ; 
    $scope.data = platedata; // Need to update this every time we get a new project. 
	
	

//fillColor: ["#b2b3b4", "#b2b3b4", "#b2b3b4", "#b2b3b4", "#b2b3b4", "#b2b3b4", 
	//		"#b2b3b4", "#b2b3b4", "#b2b3b4", "#b2b3b4", "#ff2b00"]
// highlightFill: ["#ff9966", "#ff9966", "#ff9966", "#ff9966", "#ff9966", "#ff9966", 
// 			"#ff9966", "#ff9966", "#ff9966", "#ff9966", "#ff8000"], 
// The colors that they should be if they worked. 
// DO NOT DELETE ANY COMMENTS!!!!!!!

//	if ($scope.hello[0])
//		$scope.currentProject = $scope.hello[0]; 

    $scope.switchProject = function(x) {

      //  ensure project data doesn't initially show
      $scope.samplesAccess = false;
      $scope.platesAccess = false;
      $scope.projectAccess = false;
      $scope.projectFinancesAccess = false;

      $scope.currentProject = x;
	  
	  platedata[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	  
	// This needs to be a double array like this because of the way angular-chart.js
	// is set up. It wants to do multiple series of bars and we only need one. Thus, 
	// platedata[0] is the way to go. 
	  
	// The mapping of the stages to their labels. 

		  // 0: Pending Arrival 
		  // 1: Sample Arrival 
		  // 2: Quality Control 1 
		  // 3: Shearing 
		  // 4: Library Prep 
		  // 5: Quality Control 2 
		  // 6: Hybridization 
		  // 7: Quality Control 3
		  // 8: Sequencing 
		  // 9: Data Analysis 
		  // 10: Completed 	
	
	  for (var q in $scope.currentProject.plates) {
		  
		  var ref = $scope.currentProject.plates[q].stage; 
		  
		  // Mapping of the commercial LIMS database to the client display stages 
		  // Note: DB indexing starts at 1, this indexing starts at 0. 
		  switch (ref) {
		  case 0: {
			  platedata[0][0]++; 
			  break; } 
		  case 1: {
			  platedata[0][1]++; 
			  break; }
		  case 2: {
			  platedata[0][2]++; 
			  break; }
		  case 3: {
			  platedata[0][3]++; 
			  break; }
		  case 4: {
			  platedata[0][3]++; 
			  break; }
		  case 5: {
			  platedata[0][4]++; 
			  break; }
		  case 6: {
			  platedata[0][4]++; 
			  break; }
		  case 7: {
			  platedata[0][4]++; 
			  break; }
		  case 8: {
			  platedata[0][4]++; 
			  break; }
		  case 9: {
			  platedata[0][4]++; 
			  break; }
		  case 10: {
			  platedata[0][4]++; 
			  break; }
		  case 11: {
			  platedata[0][5]++; 
			  break; }
		  case 12: {
			  platedata[0][6]++; 
			  break; }
		  case 13: {
			  platedata[0][6]++; 
			  break; }
		  case 14: {
			  platedata[0][6]++; 
			  break; }
		  case 15: {
			  platedata[0][6]++; 
			  break; }
		  case 16: {
			  platedata[0][7]++; 
			  break; }
		  case 17: {
			  platedata[0][8]++; 
			  break; }
		  case 18: {
			  platedata[0][9]++; 
			  break; }
		  case 19: {
			  platedata[0][10]++; 
			  break; }
		  default: {
			platedata[0][0]++; }// Safety default case. 
		  }
	  } 

	  $scope.data = platedata; // Need to update this every time we get a new project. 
	  
      $scope.dname = x.displayName;
      $scope.uname = x.username;
      $scope.currProjectCode = x.projectCode;
      $scope.currShearing = x.shearingMethod;
      $scope.currOrganism = x.organism;
      $scope.currStage = x.analysisStage;
      $scope.currReagent = x.totalReagentsAndLibrary;
      $scope.currTotProbes = x.totalProbes;
      $scope.currSeq = x.totalSequencing;
      $scope.currContract = x.totalContract;
      $scope.currMachine = x.machineType;
      $scope.currIndMode = x.indexingMode;
      $scope.currSeqType = x.sequencingType;
      $scope.dateArrive = x.samplesArrivalDate;
      $scope.currSampCnt = x.totalSamplesExpected;
      $scope.currProbe = x.probe;
      $scope.currSeqPlex = x.sequencingPlex;
      $scope.currCapPlex = x.capturePlex;
      $scope.currSeqMeth = x.sequencingMethod;
      $scope.dateLastEdit = x.lastEdited;
      $scope.dateDue = x.due;
      $scope.dateCreate = x.created;
      $scope.plate0Stg = x.plates[0].stage;
      $scope.plate1Stg = x.plates[1].stage;
      $scope.plate2Stg = x.plates[2].stage;
      $scope.plate3Stg = x.plates[3].stage;
      $scope.plate4Stg = x.plates[4].stage;
      $scope.plate5Stg = x.plates[5].stage;
      $scope.plate6Stg = x.plates[6].stage;
      $scope.plate7Stg = x.plates[7].stage;
      $scope.plate8Stg = x.plates[8].stage;

      if($scope.shouldDisplayUsers === true){
        $scope.filterUsersByProject(x.projectCode);  // change the displayed users
      }

      $scope.restrictProjectData(x.projectCode);
    };

    // filter the users displayed based on whether or not they have access to the displayed project,
    // stores the users to display in the $scope.displayedUsers array
    $scope.filterUsersByProject = function(projectCode){
       var users = $scope.users;
       $scope.displayedUsers = [];
       for(var i = 0; i < users.length; i++){
        if(users[i].clientSitePermissions){
          var userProjectNames = Object.keys(users[i].clientSitePermissions);
          if(userProjectNames.includes(projectCode)){
            $scope.displayedUsers.push(users[i]);
          }
        }
       }
    };

    //  sets variables to restrict user access to different aspects of project
    $scope.restrictProjectData = function(projectCode){
      var csp = $scope.authentication.user.clientSitePermissions;
      for(var property in csp){
        if(property === projectCode){
          $scope.samplesAccess = csp[property].samplesAccess;
          $scope.platesAccess = csp[property].platesAccess;
          $scope.projectAccess = csp[property].projectAccess;
          $scope.projectFinancesAccess = csp[property].projectFinancesAccess;
          break;
        }
      }
    };
	}
]);
