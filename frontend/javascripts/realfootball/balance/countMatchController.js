require('../../app/app');

(function() {
	'use strict';

	angular
		.module('football-app')
		.controller('CountMatchController', CountMatchController);

	CountMatchController.$inject = [
		'$uibModalInstance',
		'matchData'
	];

	function CountMatchController($uibModalInstance, matchData) {
		var vm = this;

		vm.players = [];
		vm.surcharges = [{
			name: 'Field',
			cost: 495
		}, {
			name: 'Water',
			cost: 17
		}];

		vm.addSurcharge = addSurcharge;
		vm.removeSurcharge = removeSurcharge;
		vm.updateBalance = updateBalance;
		vm.updateSurcharge = updateSurcharge;

		function addSurcharge() {
			vm.surcharges.push({
				name: '',
				cost: 0
			});
		}

		function recountCosts() {
			var iterationsCount = vm.surcharges.length;
			vm.totalCost = 0;
			vm.costPerPerson = 0;

			for (var i = 0; i < iterationsCount; i++) {
				vm.totalCost += vm.surcharges[i].cost;
			}
			vm.costPerPerson = Math.ceil(vm.totalCost / vm.players.length);
		}

		function removeSurcharge(index) {
			vm.surcharges = vm.surcharges.splice(index, 1);
			recountCosts();
		}

		function updateBalance() {
			
		}

		function updateSurcharge(propName, value) {
			if (propName === 'cost') {
				recountCosts();
			}
		}

		(function() {
			for (var i = 0; i < matchData.teams.length; i++) {
				vm.players = vm.players.concat(matchData.teams[i].players);
				recountCosts();
			}
		})();
	}
})();