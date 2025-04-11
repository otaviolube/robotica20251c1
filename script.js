document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const fileInput = document.getElementById('file-input');
    const uploadArea = document.getElementById('upload-area');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const classifyButton = document.getElementById('classify-button');
    const modelLoading = document.getElementById('model-loading');
    const resultsPlaceholder = document.getElementById('results-placeholder');
    const loadingResults = document.getElementById('loading-results');
    const predictionResults = document.getElementById('prediction-results');
    const errorContainer = document.getElementById('error-container');
    const errorText = document.getElementById('error-text');

    // Model variables
    let model = null;
    let modelMetadata = null;
    let isModelLoaded = false;
    let selectedImage = null;

    // Replace with your Teachable Machine model URL
    const modelURL = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/';
    const modelJSONPath = modelURL + 'model.json';
    const metadataJSONPath = modelURL + 'metadata.json';

    // Load model
    async function loadModel() {
        try {
            // Load model
            model = await tf.loadLayersModel(modelJSONPath);
            
            // Load metadata
            const response = await fetch(metadataJSONPath);
            modelMetadata = await response.json();
            
            // Update UI
            isModelLoaded = true;
            modelLoading.style.display = 'none';
            updateClassifyButtonState();
            
        } catch (error) {
            console.error('Failed to load model:', error);
            showError('Falha ao carregar o modelo. Verifique a URL do modelo e sua conexão com a internet.');
        }
    }

    // Initialize model loading
    loadModel();

    // Event Listeners
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileSelect);

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file);
        }
    });

    classifyButton.addEventListener('click', classifyImage);

    // Functions
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            handleImageFile(file);
        }
    }

    function handleImageFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            selectedImage = e.target.result;
            imagePreview.src = selectedImage;
            uploadPlaceholder.classList.add('hidden');
            imagePreviewContainer.classList.remove('hidden');
            
            // Reset results
            resultsPlaceholder.classList.remove('hidden');
            loadingResults.classList.add('hidden');
            predictionResults.classList.add('hidden');
            predictionResults.innerHTML = '';
            
            updateClassifyButtonState();
        };
        
        reader.readAsDataURL(file);
    }

    function updateClassifyButtonState() {
        classifyButton.disabled = !(isModelLoaded && selectedImage);
    }

    async function classifyImage() {
        if (!isModelLoaded || !selectedImage) return;
        
        try {
            // Show loading state
            resultsPlaceholder.classList.add('hidden');
            loadingResults.classList.remove('hidden');
            predictionResults.classList.add('hidden');
            
            // Create an image element for TensorFlow.js
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = selectedImage;
            
            await new Promise((resolve) => {
                img.onload = resolve;
            });
            
            // Preprocess the image
            const tensor = tf.browser.fromPixels(img)
                .resizeNearestNeighbor([224, 224]) // Resize to model input size (adjust as needed)
                .toFloat()
                .div(tf.scalar(255.0))
                .expandDims();
            
            // Run inference
            const predictions = await model.predict(tensor).data();
            
            // Process results
            const results = Array.from(predictions)
                .map((probability, i) => {
                    return {
                        className: modelMetadata.labels[i] || `Classe ${i}`,
                        probability: probability
                    };
                })
                .sort((a, b) => b.probability - a.probability);
            
            // Display results
            displayResults(results);
            
            // Clean up tensor
            tensor.dispose();
            
        } catch (error) {
            console.error('Classification error:', error);
            showError('Erro ao classificar a imagem. Por favor, tente novamente.');
            
            // Reset UI
            resultsPlaceholder.classList.remove('hidden');
            loadingResults.classList.add('hidden');
        }
    }

    function displayResults(results) {
        // Hide loading, show results
        loadingResults.classList.add('hidden');
        resultsPlaceholder.classList.add('hidden');
        predictionResults.classList.remove('hidden');
        
        // Clear previous results
        predictionResults.innerHTML = '';
        
        // Add each prediction
        results.forEach(prediction => {
            const percentage = (prediction.probability * 100).toFixed(2);
            
            const predictionItem = document.createElement('div');
            predictionItem.className = 'prediction-item';
            
            predictionItem.innerHTML = `
                <div class="prediction-header">
                    <span class="prediction-label">${prediction.className}</span>
                    <span class="prediction-value">${percentage}%</span>
                </div>
                <div class="prediction-bar-container">
                    <div class="prediction-bar" style="width: ${percentage}%"></div>
                </div>
            `;
            
            predictionResults.appendChild(predictionItem);
        });
    }

    function showError(message) {
        errorText.textContent = message;
        errorContainer.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorContainer.classList.add('hidden');
        }, 5000);
    }
});