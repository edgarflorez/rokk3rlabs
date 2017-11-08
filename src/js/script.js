var MainScriptClass = function () {
  //vars
  var model;

  this.init = function () {
    callData.then(function(data) {
      model = data;
      initChartDougnut();
    }, function(err) {
      console.log(err);
    });
  }

  var callData = new Promise(function (resolve, reject) {
    // Call the fetch function passing the url of the API as a parameter
    fetch('data/activity-data.json')
    .then( (function (resp) {return resp.json()}) ) // Transform the data into json //.then((resp) => resp.json()) // ES6
    .then(function(data) {
      resolve(data);
    })
    .catch(function(error) {
      reject(Error(error));
    });
  })

  var initChartDougnut = function() {
    var i;
    var labels = [];
    var speedAverage = []

    for (i = 0; i < model.length; i++) {
      labels.push(model[i].zoneId);
      speedAverage.push(model[i].data.speed);
    }

    console.log(labels);
    console.log(speedAverage);


    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Speed Average',
                data: speedAverage,
                backgroundColor: [
                    'rgb(194, 89, 145)',
                    'rgb(249, 153, 46)',
                    'rgb(165, 120, 247)',
                    'rgb(93, 223, 202)',
                    'rgb(239, 0, 0)'
                ]
            }]
        },
        options: {
          cutoutPercentage: 70,
          title: {
            display: true,
            position: 'top',
            padding: 10,
            fontColor: "#7cb2ed",
            text: 'Speed Average'
          },
          layout: {
            padding: {
                left: 15,
                right: 15,
                top: 20,
                bottom: 20
            }
          },
          legend: {
            display: true,
            position: 'bottom',
            boxWidth: 10
          }

        }
    });
  }

}
window['mainScript'] = new MainScriptClass();
window['mainScript'].init();
