import { useState, useEffect } from "react";

const trafficLights = [
  {
    color: "red",
    backgroundColor: "red",
    wait: 3000,
  },
  {
    color: "yellow",
    backgroundColor: "yellow",
    wait: 2000,
  },
  {
    color: "green",
    backgroundColor: "green",
    wait: 2000,
  },
];

export default function TrafficLights() {
  const [activeLight, setActiveLight] = useState("red");
  const light = trafficLights.find((light) => light.color === activeLight);
  const currentIndex = trafficLights.findIndex(
    (light) => light.color === activeLight
  );

  useEffect(() => {
    let timer = setTimeout(() => {
      const idx = (currentIndex + 1) % trafficLights.length;
      setActiveLight(trafficLights[idx].color);
    }, light.wait);
    return () => clearTimeout(timer);
  }, [activeLight]);
  return (
    <div>
      <h1>Traffic Lights</h1>
      <div className="container">
        {trafficLights.map((light, index) => (
          <div
            key={index}
            className={`light ${
              light.color === activeLight ? light.backgroundColor : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
/**
 * styles
 * .container {
  background-color: #000;
  width: 90px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.light {
  width: 40px;
  height: 40px;
  background-color: grey;
  border-radius: 50%;
}

.red {
  background-color: red;
}
.yellow {
  background-color: yellow;
}
.green {
  background-color: green;
}
 */
