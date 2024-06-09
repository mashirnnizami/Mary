const video = document.getElementById('videoInput')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models') // heavier/accurate version of tiny face detector
]).then(start)

function start() {
  document.body.append('Face detection : ')

  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => {
      video.srcObject = stream
      console.log('Video stream started')
      recognizeFaces()
    })
    .catch(err => console.error(err))
}

async function recognizeFaces() {
  const labeledDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7)

  video.addEventListener('play', async () => {
    console.log('Video playing')
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)

    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)

      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

      const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box
        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
        drawBox.draw(canvas)
      })
    }, 100)
  })
}

function loadLabeledImages() {
  const labels = ['Tabish', 'Mashir','Zaiba','Shahzad','robert downey jr'] // for WebCam
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = []
      for (let i = 1; i <= 1; i++) {
        const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        console.log(label + i + JSON.stringify(detections))
        descriptions.push(detections.descriptor)
      }
      document.body.append('Now Started')
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
