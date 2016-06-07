
var locationForm = document.getElementById('new-location-form');
var submitButton = document.getElementById('submit-button');
var coffeeTable = document.getElementById('coffee-table');
var baristasTable = document.getElementById('baristas-table');
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var pikePlaceMarketLocation = new Location ('Pike Place Market', 14, 35, 1.2, 0.34);
var capitolHillLocation = new Location ('Capitol Hill', 12, 28, 3.2, 0.03);
var seattlePublicLibraryLocation = new Location ('Seattle Public Library', 9, 45, 2.6, 0.02);
var southLakeUnionLocation = new Location ('South Lake Union', 5, 18, 1.3, 0.04);
var seaTacAirportLocation = new Location ('Sea-Tac Airport', 28, 44, 1.1, 0.41);
var allLocations = [pikePlaceMarketLocation, capitolHillLocation, seattlePublicLibraryLocation, southLakeUnionLocation, seaTacAirportLocation];

function Location (location, minCustomersHour, maxCustomersHour, cupsPerCustomer, poundsOfBeansToGo) {
  this.location = location;
  this.minCustomersHour = minCustomersHour;
  this.maxCustomersHour = maxCustomersHour;
  this.cupsPerCustomer = cupsPerCustomer;
  this.poundsOfBeansToGo = poundsOfBeansToGo;
  this.allCustomersDaily = 0;
  this.allBeansNeededDaily = 0;
  this.customersPerHour = [];
  this.totalToGoPoundsOfBeansHour = [];
  this.totalCupsPerHour = [];
  this.beansNeededForCupsPerHour = [];
  this.totalBeansNeededPerHour = [];
  this.numBaristas = [];
  this.numBaristasTotal = 0;
}

Location.prototype.baristasNeeded = function(){
  var numEmployees = [];
  for (var i = 0; i < hours.length; i++){
    var employees = Math.ceil((this.customersPerHour[i] * 2) / 60);
    this.numBaristas.push(employees);
  }
  return numEmployees;
};

Location.prototype.totalBaristasNeeded = function(){
  baristas = 0;
  for (var i = 0; i < hours.length; i++){
    baristas += this.numBaristas[i];
  }
  this.numBaristasTotal = baristas;
};

Location.prototype.totalBeansNededPerHourCalc = function(){
  for (var i = 0; i < hours.length; i++){
    var totalBeans = this.beansNeededForCupsPerHour[i] + this.totalToGoPoundsOfBeansHour[i];
    this.totalBeansNeededPerHour.push(Math.round(totalBeans * 10) / 10);
  }
};

Location.prototype.beansNeededForCupsPerHourCalc = function(){
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
  var lastRow = document.createElement('tr');
  var dataOneLast = document.createElement('td');
  var dataTwoLast = document.createElement('td');

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
  coffeeTable.appendChild(lastRow);
  lastRow.appendChild(dataOneLast);
  lastRow.appendChild(dataTwoLast);
  dataOneLast.textContent = 'Totals';
  dataTwoLast.textContent = allBeansColumnTotal();

  for (var i = 0; i < hours.length; i++){
    var totalsData = document.createElement('td');
    lastRow.appendChild(totalsData);
    totalsData.textContent = allBeansTotalRow()[i];
  }
}

function drawTableBaristas(){
  var rowOne = document.createElement('tr');
  var dataOne = document.createElement('td');
  var dataTwo = document.createElement('td');
  var lastRow = document.createElement('tr');
  var dataOneLast = document.createElement('td');
  var dataTwoLast = document.createElement('td');

  baristasTable.appendChild(rowOne);
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

    baristasTable.appendChild(row);
    row.appendChild(dataLocationName);
    row.appendChild(dataLocationTotal);

    dataLocationName.textContent = allLocations[i].location;
    dataLocationTotal.textContent = allLocations[i].numBaristasTotal;

    for(var j = 0; j < hours.length; j++){
      var dataLocationPerHour = document.createElement('td');
      row.appendChild(dataLocationPerHour);
      dataLocationPerHour.textContent = allLocations[i].numBaristas[j];
    }
  }
  baristasTable.appendChild(lastRow);
  lastRow.appendChild(dataOneLast);
  lastRow.appendChild(dataTwoLast);
  dataOneLast.textContent = 'Totals';
  dataTwoLast.textContent = allBaristasColumnTotal();

  for (var i = 0; i < hours.length; i++){
    var totalsData = document.createElement('td');
    lastRow.appendChild(totalsData);
    totalsData.textContent = allBaristasTotalRow()[i];
  }
}

function allBeansTotalRow(){
  arrayTotalsSums = [];
  sum = 0;
  for (var i = 0; i < hours.length; i++){
    for (var j = 0; j < allLocations.length; j++){
      sum += allLocations[j].totalBeansNeededPerHour[i];
    }
    arrayTotalsSums.push(Math.round(sum * 10) / 10);
    sum = 0;
  }
  return arrayTotalsSums;
}

function allBaristasTotalRow(){
  arrayTotalsSums = [];
  sum = 0;
  for (var i = 0; i < hours.length; i++){
    for (var j = 0; j < allLocations.length; j++){
      sum += allLocations[j].numBaristas[i];
    }
    arrayTotalsSums.push(Math.round(sum * 10) / 10);
    sum = 0;
  }
  return arrayTotalsSums;
}

function allBeansColumnTotal(){
  sum = 0;
  for (var i = 0; i < allLocations.length; i++){
    sum += allLocations[i].allBeansNeededDaily;
  }
  return sum;
}

function allBaristasColumnTotal(){
  sum = 0;
  for (var i = 0; i < allLocations.length; i++){
    sum += allLocations[i].numBaristasTotal;
  }
  return sum;
}

function addNewLocationFromForm(event){
  event.preventDefault();
  document.getElementById('coffee-table').innerHTML = '';
  document.getElementById('baristas-table').innerHTML = '';
  var location = event.target.newLocationName.value || 'unnamed';
  console.log(location);
  var minCustomersHour = parseInt(event.target.minCustHour.value) || 0;
  var maxCustomersHour = parseInt(event.target.maxCustHour.value) || 0;
  var cupsPerCustomer = parseInt(event.target.cupsPerCustomer.value) || 0;
  var poundsOfBeansToGo = parseInt(event.target.toGoPounds.value) || 0;
  var newLocation = new Location (location, minCustomersHour, maxCustomersHour, cupsPerCustomer, poundsOfBeansToGo);

  if (location === 'unnamed' || minCustomersHour === 0 || maxCustomersHour === 0 || cupsPerCustomer === 0 || poundsOfBeansToGo === 0){
    allLocations = [pikePlaceMarketLocation, capitolHillLocation, seattlePublicLibraryLocation, southLakeUnionLocation, seaTacAirportLocation];
    loadTableData();
    drawTable();
    drawTableBaristas();
    alert('Please add all the pertinent data to the form before posting a new location');
    return;
  }

  else {
    allLocations.push(newLocation);
    console.log(allLocations);
    loadTableData();
    drawTable();
    drawTableBaristas();
  }
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
    allLocations[i].baristasNeeded();
    allLocations[i].totalBaristasNeeded();
  }
};

loadTableData();
drawTable();
drawTableBaristas();

locationForm.addEventListener('submit', addNewLocationFromForm);
