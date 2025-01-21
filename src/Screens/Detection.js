import React, { useState, useRef } from 'react';
import * as onnx from 'onnxjs';

function Detect() {
  const [file, setFile] = useState(null);
  const [, setPrediction] = useState(null);
  const [totalPotholes, setTotalPotholes] = useState(0);
  const [errorLog, setErrorLog] = useState([]);
  const [detectionResult, setDetectionResult] = useState(null);
  
  const modelRef = useRef(null);
  
  const POTHOLE_CLASS_ID = 0;
  const CONFIDENCE_THRESHOLD = 0.5;
  const MODEL_INPUT_SIZE = 416;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorLog([]);
  };

  const initializeModel = async () => {
    try {
      if (!modelRef.current) {
        // Create session with specific configuration
        const session = new onnx.InferenceSession({
          backendHint: 'webgl'
        });

        // Load model with explicit configuration
        await session.loadModel('./best.onnx', {
          executionProviders: ['webgl'],
          graphOptimizationLevel: 'all'
        });

        // Log model metadata
        console.log('Model loaded successfully');
        console.log('Input names:', session.inputNames);
        console.log('Output names:', session.outputNames);

        modelRef.current = session;
      }
      return modelRef.current;
    } catch (error) {
      console.error('Detailed initialization error:', error);
      throw new Error(`Model initialization failed: ${error.message}`);
    }
  };

  const preprocessFrame = async (videoFrame) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = MODEL_INPUT_SIZE;
    canvas.height = MODEL_INPUT_SIZE;

    // Draw and resize the frame
    ctx.drawImage(videoFrame, 0, 0, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE);
    const imageData = ctx.getImageData(0, 0, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE);
    
    // Prepare input tensor in NCHW format
    const inputData = new Float32Array(1 * 3 * MODEL_INPUT_SIZE * MODEL_INPUT_SIZE);
    
    // Convert to NCHW format with proper normalization
    for (let c = 0; c < 3; c++) {
      for (let h = 0; h < MODEL_INPUT_SIZE; h++) {
        for (let w = 0; w < MODEL_INPUT_SIZE; w++) {
          const pixelIdx = (h * MODEL_INPUT_SIZE + w) * 4;
          const inputIdx = c * MODEL_INPUT_SIZE * MODEL_INPUT_SIZE + h * MODEL_INPUT_SIZE + w;
          inputData[inputIdx] = imageData.data[pixelIdx + c] / 255.0;
        }
      }
    }

    // Create tensor with explicit name matching model's input
    const tensor = new onnx.Tensor(inputData, 'float32', [1, 3, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE]);
    return tensor;
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      const model = await initializeModel();
      
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      
      video.onloadeddata = async () => {
        let potholeCount = 0;
        
        const processFrame = async () => {
          if (video.ended || video.paused) {
            URL.revokeObjectURL(video.src);
            return;
          }

          try {
            const inputTensor = await preprocessFrame(video);
            
            // Create feeds object with explicit input name
            const feeds = {};
            feeds[model.inputNames[0]] = inputTensor;

            // Run inference
            const results = await model.run(feeds);
            const output = results[model.outputNames[0]];

            if (output && output.data) {
              let detectedPotholes = 0;
              // Process batches of 6 values (x, y, w, h, confidence, class)
              for (let i = 0; i < output.data.length; i += 6) {
                const confidence = output.data[i + 4];
                const classId = Math.round(output.data[i + 5]);
                
                if (confidence > CONFIDENCE_THRESHOLD && classId === POTHOLE_CLASS_ID) {
                  detectedPotholes++;
                }
              }
              
              potholeCount += detectedPotholes;
              setPrediction(output.data);
              setTotalPotholes(potholeCount);
              setDetectionResult(`Detected Potholes in frame: ${detectedPotholes}`);
            }

            // Process next frame
            if (!video.ended) {
              video.currentTime += 1/30;
              requestAnimationFrame(processFrame);
            }
          } catch (error) {
            console.error('Frame processing error:', error);
            setErrorLog(prev => [...prev, `Frame processing error: ${error.message}`]);
          }
        };

        video.play();
        await processFrame();
      };

      video.load();
    } catch (error) {
      console.error('Submission error:', error);
      setErrorLog(prev => [...prev, `Error: ${error.message}`]);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Predict</button>
      
      {totalPotholes > 0 && <div>Total Potholes Detected: {totalPotholes}</div>}
      {detectionResult && <div>{detectionResult}</div>}
      
      {errorLog.length > 0 && (
        <div style={{ color: 'red' }}>
          {errorLog.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Detect;