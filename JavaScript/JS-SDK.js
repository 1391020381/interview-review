class TrackingSDK {
    constructor(endpoint) {
      this.endpoint = endpoint;
      this.queue = [];
      this.maxRetry = 3;
    }
  
    trackEvent(eventType, data) {
      let payload = {
        eventType,
        data,
        timestamp: new Date().toISOString(),
      };
      this.queue.push(payload);
      this.sendData();
    }
  
    sendData() {
      if (navigator.onLine && this.queue.length > 0) {
        fetch(this.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.queue)
        })
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          this.queue = [];
        })
        .catch(error => {
          this.maxRetry--;
          if (this.maxRetry <= 0) {
            console.error('Failed to send tracking data:', error);
          } else {
            setTimeout(this.sendData.bind(this), 5000);
          }
        });
      }
    }
  }
  
  window.onload = function() {
    let tracker = new TrackingSDK('https://your-tracker-endpoint.com/track');
    
    document.querySelector("#your-button").addEventListener("click", function(){
      tracker.trackEvent('button_clicked', {extraData: 'something'});
    });
  };