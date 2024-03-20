<template>
  <div id="app">
    <div id="qr-code-full-region"></div>
    <div>
      <button type="button" @click="message = []">clear</button>
    </div>
    <div v-for="(msg, index) in message" :key="index" style="white-space: pre-line">
      <pre>decodedResult => {{ msg.decodedResult }}</pre>
    </div>
  </div>
</template>

<script>
import { Html5QrcodeScanner } from "html5-qrcode";
export default {
  data() {
    return {
      message: [],
    };
  },
  methods: {
    creatScan() {
      const config = {
        fps: 10,
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        
      };
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-code-full-region",
        config
      );
      html5QrcodeScanner.render(this.onScanSuccess);
    },
    onScanSuccess(decodedText, decodedResult) {
      const obj = { decodedResult: decodedResult };
      this.message.push(obj);
    },
  },
  async mounted() {
    this.creatScan();
  },
};
</script>