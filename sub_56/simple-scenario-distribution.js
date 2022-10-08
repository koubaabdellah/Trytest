class SimpleScenarioDistribution extends HTMLElement {
  static template = `
    <style>
      .graph {
        flex-grow: 1;
        position: absolute;
        overflow: visible;
        margin: 0px 20px 100px 20px;
      }
    </style>
    `;
  
  thresholds = 20;
  
  constructor() {
    super();
    
    this.root = this.attachShadow({mode: 'open'});
    this.root.innerHTML = SimpleScenarioDistribution.template;
    
    this.svg = d3.create("svg")
      .classed("graph", true);
    
    this.root.host.onresize = e => this.resize();
    this.root.appendChild(this.svg.node());
    
    this.graph = this.svg.append("g");
    this.graph.append("path")
      .style("fill", "#f4cbb1");
      
    this.svg
      .append("line")
      .attr("stroke", "#e6e6e6")
      .attr("stroke-width", "4")
      .attr("x0", "0")
      .attr("x1", "100%")
      .attr("y1", "100%")
      .attr("y2", "100%");
      
    this.lineTracker = this.svg
      .append("line")
      .attr("stroke", "#222")
      .attr("stroke-width", "4")
      .attr("x0", "0")
      .attr("y1", "100%")
      .attr("y2", "100%");
      
    this.scoreTracker = this.svg
      .append("g");
    this.scoreTracker
      .append("circle")
      .attr("stroke", "#222")
      .attr("stroke-width", "4")
      .attr("r", "30");
      
    this.scoreTracker
      .append("text")
      .style("font-size", "1.25em")
      .style("font-family", "Noto")
      .style("font-weight", "bold")
      .attr("y", "0.3em")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("0");
      
    let leftTick = d3.create("div")
      .style("position", "absolute")
      .style("left", "20px")
      .style("bottom", "40px")
      .text("Laag");
    let rightTick = d3.create("div")
      .style("position", "absolute")
      .style("right", "20px")
      .style("bottom", "40px")
      .text("Hoog");
      
    this.root.appendChild(leftTick.node());
    this.root.appendChild(rightTick.node());
  }
  
  form(d) {
    return Number(d.toFixed(0)).toLocaleString("nl");
  }
  
  resize() {
    this.redraw(this.drawnData);
  }
  
  redraw(data) {
    if (data == null) {
      console.log("Nothing to draw.");
      return;
    }
    
    this.width = Math.max(0, this.root.host.clientWidth - 40);
    this.height = Math.max(0, this.root.host.clientHeight - 100);
    
    this.drawnData = data;
    
    this.svg
      .attr("width", this.width)
      .attr("height", this.height);
      
    let bins = this.transformData(data);
    // Draw the average text
    let mean = d3.mean(data, d => d.score);
    
    let x = d3.scaleLinear().range([0, this.width]);
    let y = d3.scaleLinear().range([this.height, 0]);
    
    let valueline = d3.area()
      .curve(d3.curveBasis)
      .x((d, i) => x(i))
      .y1(d => y(d))
      .y0(d => y(0));

    // Update the score text
    this.lineTracker
      .transition()
      .attr("x1", mean + "%");
      
    this.scoreTracker
      .attr("transform", "translate(" + 0 + ", " + this.height + ")")
      .select("circle")
      .transition()
      .attr("cx", mean + "%");
      
    let me = this;
    this.scoreTracker
      .select("text")
      .datum(mean)
      .transition()
      .attr("x", mean + "%")
      .attrTween("text", function(d) {
        let i = d3.interpolate(Number(this.textContent) | 0, d | 0);
        let txt = d3.select(this);
        
        return function(t) {
          return txt.text(me.form(i(t)));
        };
      });
      
    // Update the graph
    x.domain([0, bins.length - 1]);
    y.domain([0, d3.max(bins)]);
    
    this.graph.select("path")
        .data([bins])
        .transition()
        .attr("d", valueline);
  }

  // Only called for the disabled and open attributes due to observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
    case 'url':
      this.changeUrl(newValue);
      break;
    }
  }

  static get observedAttributes() {
    return ['url'];
  }
  
  transformData(d) {
    let xScale = d3.scaleLinear()
              .domain([0, 100]);
    
    let bins = d3.histogram()
      .domain(xScale.domain())
      .value(d => d.score)
      .thresholds(this.thresholds);
    
    let result = bins(d);
    let histo = result.map(d => d.length);
    
    return histo;
  }
  
  changeUrl(url) {
    d3.json(url)
      .then(data => this.redraw(data))
      .catch(function(error) {
        throw error;
      });
  }
}

customElements.define('simple-scenario-distribution', SimpleScenarioDistribution);
