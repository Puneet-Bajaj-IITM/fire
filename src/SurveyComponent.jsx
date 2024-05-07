import React, { useEffect, useState, useRef } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "./theme";
import { mydata } from "./data/json";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/auto"; // Import Chart.js
import { useReactToPrint } from "react-to-print";
import "./surveyComponent.css";
import Results from "./Results";
import ResultsHeader from "./ResultsHeader";

function SurveyComponent() {
  const [surveyModel, setSurveyModel] = useState();
  const [averages, setAverages] = useState([]);
  const [overallAverage, setOverallAverage] = useState(0);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);

  // Define industry averages
  const industryAverages = {
    "Customer Experience": 3.65,
    "Product & Services": 3.6,
    Strategy: 3.7,
    "Interactions & Data Security": 3.7,
    Technology: 3.7,
    Operations: 3.75,
    Organization: 3.7,
    "Partners & Alliances": 3.65,
  };

  useEffect(() => {
    const survey = new Model(mydata);
    survey.applyTheme(themeJson);
    survey.onComplete.add((sender, options) => {
      const data = sender.data;
      calculateAverages(data);
      setOverallAverage(calculateOverallAverage(data));
      setSurveyCompleted(true);
    });
    setSurveyModel(survey);
  }, []);

  const calculateAverages = (data) => {
    const pages = mydata.pages;
    const calculatedAverages = [];

    pages.forEach((page) => {
      let total = 0;
      let count = 0;

      page.elements.forEach((question) => {
        const response = data[question.name];
        if (response !== undefined) {
          total += parseFloat(response);
          count++;
        }
      });

      if (count > 0) {
        const average = total / count;
        calculatedAverages.push({ average, label: page.name });
      }
    });

    setAverages(calculatedAverages);
  };

  const calculateOverallAverage = (data) => {
    let total = 0;
    let count = 0;

    mydata.pages.forEach((page) => {
      page.elements.forEach((question) => {
        const response = data[question.name];
        if (response !== undefined) {
          total += parseFloat(response);
          count++;
        }
      });
    });

    return count > 0 ? total / count : 0;
  };

  // useEffect(() => {
  //   // Hook into beforeprint event to resize charts before printing
  //   window.addEventListener("beforeprint", resizeChartsBeforePrint);

  //   // Hook into afterprint event to restore chart size after printing
  //   window.addEventListener("afterprint", resizeChartsAfterPrint);

  //   return () => {
  //     // Remove event listeners when component unmounts
  //     window.removeEventListener("beforeprint", resizeChartsBeforePrint);
  //     window.removeEventListener("afterprint", resizeChartsAfterPrint);
  //   };
  // }, []);

  useEffect(() => {
    const handleBeforePrint = () => {
      console.log("before");
      setIsPrintMode(false);
    };

    const handleAfterPrint = () => {
      console.log("after");
      setIsPrintMode(false);
    };

    // window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      // window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to resize charts before printing
  const resizeChartsBeforePrint = () => {
    for (let id in Chart.instances) {
      Chart.instances[id].resize();
    }
  };

  // Function to restore chart size after printing
  const resizeChartsAfterPrint = () => {
    // Restore the chart size to its original size here if needed
    const originalChartSizes = {}; // Store original chart sizes

    // Loop through all Chart.js instances
    for (let id in Chart.instances) {
      const chart = Chart.instances[id];

      // Store original size if not already stored
      if (!originalChartSizes[id]) {
        originalChartSizes[id] = {
          width: chart.width,
          height: chart.height,
        };
      }

      // Set chart size back to its original dimensions
      chart.resize(originalChartSizes[id].width, originalChartSizes[id].height);
    }
  };

  useEffect(() => {
    if (isPrintMode) {
      handlePrint();
    }
  }, [isPrintMode]);

  const handlePrint = () => {
    window.print(); // Trigger browser's print functionality
  };

  return (
    <div>
      {!surveyCompleted ? surveyModel && <Survey model={surveyModel} /> : null}
      {surveyCompleted &&
        <div className="charts-container">
          <ResultsHeader />
          <div
            style={{
              width: "100%",
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              marginBottom:'30px'
            }}
          >
            <div style={{ width: "38%" , alignItems:'center', display:'flex', flexDirection:'column'}}>
              <div
                id="performance-container"
                className="performance-container"
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                  padding: "8px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "normal",
                }}
              >
                Your Overall Performance Score
              </div>
              <div className="doughnut-chart-container">
                <DoughnutChart overallAverage={overallAverage} />
              </div>
            </div>

            <div style={{ width: "60%", alignItems:'center', display:'flex', flexDirection:'column'}}>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                  padding: "8px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "normal",
                  marginBottom:'20px'
                }}
              >
                Your Business vs Industry Standards
              </div>
              <div id="bar-chart-container" style={{ width: "80%" }}>
                <BarChart
                  averages={averages}
                  industryAverages={industryAverages}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "250px",
                backgroundColor: "red",
                color: "white",
                padding: "8px",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {`(0 - 1.5) Early Stage`}
            </div>

            <div
              style={{
                width: "250px",
                backgroundColor: "#FCE38A",
                color: "black",
                padding: "8px",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {`(1.5 - 3.5) Development Stage`}
            </div>

            <div
              style={{
                width: "250px",
                backgroundColor: "#00B430",
                color: "white",
                padding: "8px",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {`(3.5 - 5.0) Advanced Stage`}
            </div>
          </div>

          {!isPrintMode && (
            <button
              style={{
                height: "50px",
                width: "180px",
                backgroundColor: "red",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                fontSize: "17px",
                fontWeight: "bold",
                marginTop: "20px",
              }}
              onClick={() => {
                setIsPrintMode(true);
              }}
            >
              Print Survey Report
            </button>
          )}
          <Results
            id="results-component"
            overallAverage={overallAverage}
            industryAverages={industryAverages}
          />
        </div>
      }
    </div>
  );
}

const BarChart = ({ averages, industryAverages }) => {
  const customPageNames = {
    page1: "Customer Experience",
    page2: "Product & Services",
    page3: "Strategy",
    page4: "Interactions & Data Security",
    page5: "Technology",
    page6: "Operations",
    page7: "Organization",
    page8: "Partners & Alliances",
  };

  const combinedData = averages.flatMap((avg) => [
    { label: customPageNames[avg.label] || avg.label, average: avg.average },
    {
      label: `${customPageNames[avg.label]} (Industry Avg)`,
      average: industryAverages[customPageNames[avg.label]] || 0,
    },
  ]);

  const data = {
    labels: Object.keys(customPageNames).map((key) => customPageNames[key]),
    datasets: [
      {
        label: "Your Score",
        data: averages.map((avg) => avg.average),
        backgroundColor: averages.map((avg) => {
          if (avg.average < 1.5) {
            return "red"; // Red for values less than 1.5
          } else if (avg.average >= 1.5 && avg.average < 3) {
            return "#FCE38A"; // Yellow for values between 1.5 and 3
          } else {
            return "#00B430"; // Green for values greater than or equal to 3
          }
        }),
        borderColor: "#000",
        borderWidth: 1,
      },
      {
        label: "Industry Average",
        data: Object.values(industryAverages),
        backgroundColor: "#00B430", // Green for industry average
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };
  let delayed;
  const options = {
    plugins: {
      title: {
        display: false,
      },
    },

    responsive: false,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "black",
          font: { size: 12, weight: "bold" },
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "black",
          font: { size: 12, weight: "bold" },
        },
      },
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    layout: {
      padding: {
        left: 0, // Add left padding
        right: 0, // Add right padding
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} height="250px" width="400px" />
    </div>
  );
};

const DoughnutChart = ({ overallAverage }) => {
  const roundedAverage = overallAverage.toFixed(2);
  const data = {
    // labels: ["Overall Average"],
    datasets: [
      {
        label: "Overall Average",
        data: [overallAverage, 5.0 - overallAverage],
        backgroundColor: ["#FCE38A", "#00B430"],
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0, // Add left padding
        right: 0, // Add right padding
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bolder 40px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseLine = "middle";
      ctx.fillText(
        roundedAverage,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };
  return (
    <div className="doughnut-chart-container" style={{ paddingTop: "40px" }}>
      <Doughnut
        data={data}
        options={options}
        plugins={[textCenter]}
        height="200px"
        width="200px"
      />
      {/* <p>Overall Average: {roundedAverage}</p> */}
    </div>
  );
};

export default SurveyComponent;
