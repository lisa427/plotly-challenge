let id = "940";
//let names = data.names;


function buildPlots(id) {
      
    d3.json("samples.json").then(function(data) {

        let samplesArray = data.samples
        let filteredData = samplesArray.filter(d => d.id === id);
        let sampleValues = filteredData[0].sample_values;
        let otuIds = filteredData[0].otu_ids;
        let otuLabels = filteredData[0].otu_labels;
      
        console.log(data);
        console.log(filteredData);
        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);

        var trace1 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
              color: otuIds,
              size: sampleValues
            }
          };
          
          var data = [trace1];
          
          var layout = {
            xaxis: {title: 'OTU ID'},
            showlegend: false,
            height: 600,
            width: 1200
          };
          
          Plotly.newPlot('bubble', data, layout);
        
    });
};

buildPlots(id);