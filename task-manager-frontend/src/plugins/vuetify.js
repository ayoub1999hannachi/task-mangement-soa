import "vuetify/styles"; // Import Vuetify styles
import { createVuetify } from 'vuetify'; // Vuetify 3 setup
import '@mdi/font/css/materialdesignicons.css';  // Import Material Design Icons

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',  // Use Material Design Icons (mdi) by default
  },
});

export default vuetify;
