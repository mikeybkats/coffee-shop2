// 6:00am: 86.4 lbs [23 customers, 27.6 cups (1.4 lbs), 85 lbs to-go]
var coffeeTable = document.getElementById('coffee-table');
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var pikePlaceMarketLocation = new Location ('Pike Place Market', 14, 35, 1.2, 0.34);
var capitolHillLocation = new Location ('Capitol Hill', 12, 28, 3.2, 0.03);
var seattlePublicLibraryLocation = new Location ('Seattle Public Library', 9, 45, 2.6, 0.02);
var southLakeUnionLocation = new Location ('South Lake Union', 5, 18, 1.3, 0.04);
var seaTacAirportLocation = new Location ('Sea-Tac Airport', 28, 44, 1.1, 0.41);
var allLocations = [pikePlaceMarketLocation, capitolHillLocation, seattlePublicLibraryLocation, southLakeUnionLocation, seaTacAirportLocation];

function Location (location, minCustomersHr, maxCustomersHr, cupsPerCustomer, poundsOfBeansToGo) {
  this.location = location;
  this.minCustomersHour = minCustomersHr;
  this.maxCustomersHour = maxCustomersHr;
  this.cupsPerCustomer = cupsPerCustomer;
  this.poundsOfBeansToGo = poundsOfBeansToGo;
  this.allCustomersDaily = 0;
  this.allBeansNeededDaily = 0;
  this.customersPerHour = [];
  this.totalToGoPoundsOfBeansHour = [];
  this.totalCupsPerHour = [];
  this.beansNeededForCupsPerHour = [];
  this.totalBeansNeededPerHour = [];
}

Location.prototype.totalBeansNededPerHourCalc = function(){
  for (var i = 0; i < hours.length; i++){
    var totalBeans = this.beansNeededForCupsPerHour[i] + this.totalToGoPoundsOfBeansHour[i];
    this.totalBeansNeededPerHour.push(Math.round(totalBeans * 10) / 10);
  }
};

Location.prototype.beansNeededForCupsPerHourCalc = function(){
  // take the average cups / hour and divide it by 16
  for (var i = 0; i < hours.length; i++){
    var beansForCups = this.totalCupsPerHour[i] / 16;
    this.beansNeededForCupsPerHour.push(Math.round(beansForCups * 10) / 10);
  }
};

Location.prototype.totalCupsPerHourCalc = function(){
  for (var i = 0; i < hours.length; i++){
    var cupsPerHour = this.customersPerHour[i] * this.cupsPerCustomer;
    this.totalCupsPerHour.push(Math.round(cupsPerHour * 10) / 10);
  }
};

Location.prototype.randomNumberOfCustomersPerHourCalc = function(){
  for (var i = 0; i < hours.length; i++){
    var customers = Math.floor(Math.random() * (this.maxCustomersHour - this.minCustomersHour + 1)) + this.minCustomersHour;
    this.customersPerHour.push(customers);
  }
};

Location.prototype.totalDailyNumberOfCustomersCalc = function(){
  var total = 0;
  for (var i = 0; i < this.customersPerHour.length; i++){
    total += this.customersPerHour[i];
  };
  this.allCustomersDaily = total;
};

Location.prototype.allBeansNeededDailyCalc = function(){
  var total = 0;
  for (var i = 0; i < hours.length; i++){
    total += this.totalBeansNeededPerHour[i];
  }
  this.allBeansNeededDaily = Math.round((total * 10) / 10);
};

Location.prototype.totalToGoPoundsOfBeansHourCalc = function(){
  for (var i = 0; i < hours.length; i++){
    var toGoPounds = this.customersPerHour[i] * this.poundsOfBeansToGo;
    this.totalToGoPoundsOfBeansHour.push(Math.round(toGoPounds * 10) / 10);
  }
};

function drawTable () {
  var rowOne = document.createElement('tr');
  var dataOne = document.createElement('td');
  var dataTwo = document.createElement('td');

  coffeeTable.appendChild(rowOne);
  rowOne.appendChild(dataOne);
  rowOne.appendChild(dataTwo);

  dataOne.textContent = '';
  dataTwo.textContent = 'Daily Location Total';

  for (var i = 0; i < hours.length; i++){
    var data = document.createElement('td');
    rowOne.appendChild(data);
    data.textContent = hours[i];
  }

  for (var i = 0; i < allLocations.length; i++){
    var row = document.createElement('tr');
    var dataLocationName = document.createElement('td');
    var dataLocationTotal = document.createElement('td');

    coffeeTable.appendChild(row);
    row.appendChild(dataLocationName);
    row.appendChild(dataLocationTotal);

    dataLocationName.textContent = allLocations[i].location;
    dataLocationTotal.textContent = allLocations[i].allBeansNeededDaily;

    for(var j = 0; j < hours.length; j++){
      var dataLocationPerHour = document.createElement('td');
      row.appendChild(dataLocationPerHour);
      dataLocationPerHour.textContent = allLocations[i].totalBeansNeededPerHour[j];
    }
  }
  // rowOne.appendChild(dataOne);
  // rowOne.appendChild(dataTwo);
  // dataOne.textContent = 'Totals';

}

function allBeansColumnTotal(){
  sum = 0;
  for (var i = 0; i < allLocations.length; i++){
     sum += allLocations[i].allBeansNeededDaily;
  }
  return sum;
}

function loadTableData(){
  for (var i = 0; i < allLocations.length; i++){
    allLocations[i].randomNumberOfCustomersPerHourCalc();
    allLocations[i].totalDailyNumberOfCustomersCalc();
    allLocations[i].totalToGoPoundsOfBeansHourCalc();
    allLocations[i].totalCupsPerHourCalc();
    allLocations[i].beansNeededForCupsPerHourCalc();
    allLocations[i].totalBeansNededPerHourCalc();
    allLocations[i].allBeansNeededDailyCalc();
  }
};

loadTableData();
drawTable();
