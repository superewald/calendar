/**
 * ownCloud - Calendar App
 *
 * @author Raghu Nayyar
 * @author Georg Ehrke
 * @copyright 2014 Raghu Nayyar <beingminimal@gmail.com>
 * @copyright 2014 Georg Ehrke <oc.list@georgehrke.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
* Controller: Date Picker Controller
* Description: Takes care for pushing dates from app navigation date picker and fullcalendar.
*/
app.controller('DatePickerController', ['$scope', 'uiCalendarConfig', 'uibDatepickerConfig',
	function ($scope, uiCalendarConfig, uibDatepickerConfig) {
		'use strict';

		$scope.dt = new Date();
		$scope.displayedMonth = '';
		$scope.visibility = false;

		$scope.selectedview = angular.element('#fullcalendar').attr('data-defaultView');

		angular.extend(uibDatepickerConfig, {
			showWeeks: false,
			startingDay: parseInt(moment().startOf('week').format('d'))
		});

		// Changes the view for the month, week or daywise.
		$scope.changeView = function (view) {
			uiCalendarConfig.calendars.calendar.fullCalendar(
				'changeView',
				view);
		};

		// Changes the view to Today's view.
		$scope.today = function () {
			$scope.dt = new Date();
		};

		$scope.prev = function() {
			$scope.dt = moment($scope.dt).subtract(1, 'month').toDate();
		};

		$scope.next = function() {
			$scope.dt = moment($scope.dt).add(1, 'month').toDate();
		};

		$scope.toggle = function() {
			$scope.visibility = !$scope.visibility;
		};

		$scope.$watch('dt', function(newValue) {
			if (uiCalendarConfig.calendars.calendar) {
				uiCalendarConfig.calendars.calendar.fullCalendar(
					'gotoDate',
					newValue
				);
			}
			$scope.displayedMonth = moment($scope.dt).format('MMMM GGGG');
		});
	}
]);
