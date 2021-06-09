function plots(id){
  d3.json("samples.json").then(function(data) {
    // Bar plot
    let data_sample = data.samples.filter(item => item.id.toString() === id)[0];
    
    let values = data_sample.sample_values.slice(0, 10).reverse();
    let labels = data_sample.otu_ids.slice(0, 10).reverse().map(label => `OTU ${label}`);
    let barText = data_sample.otu_labels.slice(0, 10).reverse();
  
    var trace = {
      x: values,
      y: labels,
      marker: {
        color: 'rgb(158,202,225)',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)', 
          width: 1.5
        }
      },
      text: barText,
      type: "bar",
      orientation: 'h'
      };
      
    let data2 = [trace];
  
    Plotly.newPlot("bar", data2);

    // Bubble plot
    let trace2 = {
      x: data_sample.otu_ids,
      y: data_sample.sample_values,
      marker: {
          size: data_sample.sample_values,
          color: data_sample.otu_ids
      },
      text: data_sample.otu_labels,
      mode: "markers"
      };
    
    let bubbleLayout = {
      xaxis:{title: "OTU ID"},
      height: 550,
      width: 1100
      };
    
    let bubbleTrace = [trace2];

    Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);

    // Gauge plot

    let dataMeta = data.metadata.filter(f => f.id.toString() === id)[0];
    let wfreq = dataMeta.wfreq;

    let trace3 = [
      {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: {text: "Belly Button Washing Frequency"},
      type: "indicator",      
      mode: "gauge+number",
      gauge: { axis: { range: [null, 9] },
               steps: [
                {range: [0, 1], color: "#f8f3ec"},
                {range: [1, 2], color: "#f4f1e4"},
                {range: [2, 3], color: "#e9e6c9"},
                {range: [3, 4], color: "#e5e8b0"},
                {range: [4, 5], color: "#d5e599"},
                {range: [5, 6], color: "#b7cd8f"},
                {range: [6, 7], color: "#8ac086"},
                {range: [7, 8], color: "#89bc8d"},
                {range: [8, 9], color: "#84b589"}
              ]}
          
      }
    ];
    let gaugeLayout = { 
        width: 600, 
        height: 500, 
        margin: { t: 0, b: 0} 
      };
    Plotly.newPlot("gauge", trace3, gaugeLayout);
  
    });
}

function demographics(id){
  d3.json("samples.json").then((data)=> {    
    let dataMeta = data.metadata.filter(s => s.id.toString() === id)[0];
    let panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(dataMeta).forEach(([key, value])=>{
      panel.append("p").text(`${key}: ${value}`);
  });
  });
}

function init() {
  d3.json("samples.json").then((data)=> {
    data.names.forEach((name) => {
        d3.select("#selDataset")
        .append("option")
        .text(name)
        .property("value");
    });
    plots(data.names[0]);
    demographics(data.names[0]);
  });
};
init();

function optionChanged(id){
  plots(id);
  demographics(id);
};