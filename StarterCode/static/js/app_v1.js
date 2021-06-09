
function label1(a){
	let b=a.toString();
	b="OTU "+b;
	return b;
}

function make_dir_sort(arr1,arr2){
	
}

d3.json("samples.json").then(data=> {
	let id="940";
	let filtered = data.samples.filter(a => a.id == id);
	
	let values=filtered[0].sample_values;
	let labels=filtered[0].otus_ids;
	let text=filtered[0].otus_labels;

	let data_p = [{
		type: 'bar',
		x: values,
		y: labels.map(label1),
		orientation: 'h'
	  }];
	  
	Plotly.newPlot('bar', data_p);
});
