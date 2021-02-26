import FolocodeService from '../services/folocode';



  describe('Test FolocodeService.ts', () => {
    test('generateNewFolocode(5) should be 5 long', () => {
        let folocode =FolocodeService.generateNewFolocode(5);
        console.log(folocode);
        expect(folocode.length).toBe(5);
    })
});