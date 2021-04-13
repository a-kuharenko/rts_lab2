const ChartJSImage = require("chart.js-image");
const fs = require("fs");

class Chart {
  constructor({ height = 500, width = 800, title }) {
    this.height = height;
    this.width = width;
    this.title = title;
  }

  setData(x, y) {
    this.x = x;
    this.y = y;
  }

  async generateImage(path) {
    const configuration = {
      type: "line",
      data: {
        labels: this.x,
        datasets: [
          {
            label: this.title,
            data: this.y,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192)",
            labelColor: "green",
            tension: 1,
          },
        ],
      },
    };
    const chart = ChartJSImage()
      .chart(configuration)
      .backgroundColor("white")
      .width(this.width)
      .height(this.height);
    const image = await chart.toBuffer();
    fs.writeFileSync(path, image);
  }
}

module.exports = { Chart };
