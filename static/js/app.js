let id = "940";
//let names = data.names;


function buildBarPlot(id) {
      
    d3.json("samples.json").then(function(data) {

        let samplesArray = data.samples
        let filteredData = samplesArray.filter(d => d.id === id);
  
        let sampleValues = filteredData[0].sample_values;
        let otuIds = filteredData[0].otu_ids;
        let otuLables = filteredData[0].otu_labels;
      
        console.log(data);
        console.log(filteredData);
        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLables);
    
    });
};

buildBarPlot(id);