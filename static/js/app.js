let id = "940";
//let names = data.names;


function buildPlots(id) {
      
    d3.json("samples.json").then(function(allData) {

        // grab sample data from json object and filter by id
        let samplesArray = allData.samples
        let filteredSamples = samplesArray.filter(d => d.id === id);
        let sampleValues = filteredSamples[0].sample_values;
        let otuIds = filteredSamples[0].otu_ids;
        let otuLabels = filteredSamples[0].otu_labels;
      
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
            height: 500,
            width: 1000
        };
          
        Plotly.newPlot('bubble', data, layout);

        // slice first 10 values from previously filtered data
        let sampleValues10 = sampleValues.slice(0,10);
        let otuIds10 = otuIds.slice(0,10);
        let otuLabels10 = otuLabels.slice(0,10);

        // convert IDs to text and add "OTU" 
        otuIds10 = otuIds10.map(number => `OTU ${number}`);

        var data2 = [{
            type: 'bar',
            x: sampleValues10,
            y: otuIds10,
            orientation: 'h',
            text: otuLabels10
          }];
          
          Plotly.newPlot('bar', data2);

        console.log(allData);
        console.log(filteredSamples);
        console.log(sampleValues);
        console.log(sampleValues10);
        console.log(otuIds10);
        console.log(otuLabels10);

        // grab metadata from json object and filter by id
        let metaArray = allData.metadata
        let filteredMeta = metaArray.filter(d => d.id.toString() === id);
        let ethnicity = filteredMeta[0].ethnicity;
        let gender = filteredMeta[0].gender;
        let age = filteredMeta[0].age.toString();
        let location = filteredMeta[0].location;
        let bbtype = filteredMeta[0].bbtype;
        let wfreq = filteredMeta[0].wfreq;

        document.getElementById("sample-metadata").innerHTML = `ID: ${id}\
        <br>Ethnicity: ${ethnicity}\
        <br>Gender: ${gender}\
        <br>Age: ${age}\
        <br>Location: ${location}\
        <br>bbtype: ${bbtype}\
        <br>wfreq: ${wfreq}`;


        
        
        
    });
};

buildPlots(id);