const assert = require('assert');
const home = require('../js/script.js');



describe('renderCard', () => {
    it('should display a camera infos', () => {
        const cameraTest = {
            name: 'canon EOS 5D',
            price: 1599,
            description: 'amazing camera',
            imageUrl : 'https://i1.adis.ws/i/canon/eos-5d-mark-1v-right?qlt=70&w=800&fmt=jpg&fmt.options=interlaced&bg=rgb(245,246,246)'
        }

        assert.equal(home.renderCard(cameraTest), true);
    })

})