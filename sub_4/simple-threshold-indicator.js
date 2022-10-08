class SimpleThresholdIndicator extends HTMLElement {
  threshold = 2;
  thresholdMax = Math.log(Math.pow(this.threshold + 1, 2));
  
  constructor() {
    super();
    
    const root = this.attachShadow({mode: 'open'});
    root.innerHTML = `<style>
    .container {
      display: flex;
      justify-items: center;
      flex-direction: column;
      margin: 0px 40px 0px 60px;
    }
    
    .graphContainer {
      height: 60px;
      display: flex;
      align-items: center;
    }
    
    .label {
      text-align: center;
      margin-top: 15px;
      margin-left: 4px;
    }
    
    .scoreBar {
      flex-grow: 1;
      position: relative;
      z-index: 1;
      height: 4px;
      background: #999999;
      border-radius: 5px;
    }
    .indicator {
      position: absolute;
      left: 50%;
      width: 4px;
      background: #999999;
      height: 40px;
      margin-top: -17px;
      border-radius: 5px;
    }
    .score {
      width: 60px;
      height: 4px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 0;
      
      color: white;
      font-weight: bold;
      font-size: 1.3em;
    }
    
    .score::before {
      content: '';
      display: block;
      position: absolute;
      z-index: -1;
      
      width: 60px;
      height: 60px;
      border-radius: 30px;
      
      transition: background 0.15s ease-out;
      background: inherit;
    }
    `;
    
    this.container = d3.create("div")
      .classed("container", true);
    
    this.graphContainer = this.container
      .append("div")
      .classed("graphContainer", true);

    this.thresholdContainer = this.graphContainer
      .append("div")
      .classed("scoreBar", true);
    this.thresholdIndicator = this.thresholdContainer
      .append("div")
      .classed("indicator", true);
    this.thresholdSpan = this.thresholdContainer
      .append("div")
      .style("transition", "left 0.15s ease-out")
      .classed("score", true);
    
    this.thresholdLabel = this.container
      .append("div")
      .classed("label", true)
      .html(this.threshold);
    
    root.appendChild(this.container.node());
  }
  
  form(d) {
    return Number(d).toLocaleString("nl", {minimumFractionDigits: 1, maximumFractionDigits: 1});
  }
  
  redraw(data) {
    let value = Number(data);
    
    let valueLog = Math.log(1 + value);
    
    let xPerc = Math.min((valueLog / this.thresholdMax) * 100, 100);
    
    // Update the score text
    let maxScoreUpdate = this.thresholdSpan
      .datum(value)
      .style("background", d => d >= this.threshold ? "#39870cee" : "#d52b1eee")
    let me = this;
    maxScoreUpdate
      .style("left", d => "calc(" + xPerc + "% - 30px)")
      .transition()
      .tween("text", function(d) {
        let i = d3.interpolateNumber(Number(this.textContent.replace(",", ".")), Number(d));
        return function(t) {
          maxScoreUpdate.text(me.form(i(t)));
        };
      });
  }

  // Only called for the disabled and open attributes due to observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
    case 'deposition':
      this.redraw(newValue);
      break;
    }
  }

  static get observedAttributes() {
    return ['deposition'];
  }
}

customElements.define('simple-threshold-indicator', SimpleThresholdIndicator);
