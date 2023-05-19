/**
 * @author Sami Cemek (ascemek)
 * @version 1.0
 * @date 04/25/23
 * @title Plant Scraper
 * @description This scraper scrapes the plant information from the Better Homes and Gardens website.
 * https://www.bhg.com/gardening/plant-dictionary/
 * @frameworks puppeteer (node.js)
 * @dependencies puppeteer, fs
 */

const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    // open the browser and prepare a page
    const browser = await puppeteer.launch();

    await (async () => {
        const urls = [ // 89 plants
            "https://www.bhg.com/gardening/plant-dictionary/bulb/allium/",
            "https://www.bhg.com/gardening/plant-dictionary/bulb/triumph-tulips/",
            "https://www.bhg.com/gardening/plant-dictionary/bulb/society-garlic/",
            "https://www.bhg.com/gardening/plant-dictionary/bulb/anemone-bulb/",
            "https://www.bhg.com/gardening/plant-dictionary/bulb/gloriosa-lily/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/bee-balm/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/hollyhock/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/perennial-geranium/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/spurge/",
            "https://www.bhg.com/gardening/plant-dictionary/bulb/oxalis/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/oleander/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/wallflower/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/privet/",
            "https://www.bhg.com/gardening/plant-dictionary/herb/sage/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/sedum/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/thrift/",
            "https://www.bhg.com/gardening/plant-dictionary/vine/trumpet-vine/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/violet/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/yucca/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/yellow-bells/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/yarrow/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/veronica/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/viburnum/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/verbena/",
            "https://www.bhg.com/gardening/plant-dictionary/vine/mandevilla/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/ajuga/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/alstroemeria/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/anemone/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/angels-trumpet/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/aster/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/astilbe/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/bacopa/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/barberry/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/begonia/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/bellflower/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/bird-of-paradise/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/black-eyed-susan/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/blanket-flower/",
            "https://www.bhg.com/gardening/plant-dictionary/vine/bougainvillea/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/boxwood/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/california-poppy/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/camellia/",
            "https://www.bhg.com/gardening/plant-dictionary/bulb/canna/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/castor-bean/",
            "https://www.bhg.com/gardening/plant-dictionary/rose/climbing-rose/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/columbine/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/coneflower/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/coral-bells/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/coreopsis/",
            "https://www.bhg.com/gardening/plant-dictionary/bulb/crocus/",
            "https://www.bhg.com/gardening/plant-dictionary/bulb/dahlia/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/daylily/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/delphinium/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/dogwood/",
            "https://www.bhg.com/gardening/plant-dictionary/tree/eucalyptus/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/euphorbia/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/forsythia/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/foxglove/",
            "https://www.bhg.com/gardening/plant-dictionary/bulb/freesia/",
            "https://www.bhg.com/gardening/plant-dictionary/bulb/grape-hyacinth/",
            "https://www.bhg.com/gardening/plant-dictionary/tree/hawthorn/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/holly/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/impatiens/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/iris/",
            "https://www.bhg.com/gardening/plant-dictionary/houseplant/jade-plant/",
            "https://www.bhg.com/gardening/plant-dictionary/vine/jasmine/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/joe-pye-weed/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/betony/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/lantana/",
            "https://www.bhg.com/gardening/plant-dictionary/herb/lavender/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/lilac/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/lily-of-the-valley/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/lisianthus/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/lupine/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/mondo-grass/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/moss-rose/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/penstemon/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/petunia/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/phlox/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/perennial-poppy/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/primrose/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/meadowsweet/",
            "https://www.bhg.com/gardening/plant-dictionary/shrub/rhododendron/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/russian-sage/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/solomons-seal/",
            "https://www.bhg.com/gardening/plant-dictionary/bulb/spider-lily/",
            "https://www.bhg.com/gardening/plant-dictionary/perennial/spiderwort/",
            "https://www.bhg.com/gardening/plant-dictionary/vine/confederate-jasmine/",
            "https://www.bhg.com/gardening/plant-dictionary/annual/zinnia/"
        ];
        console.log("Number of plants will scraped: " + urls.length);

        // if the file doesn't exists, add the opening bracket
        if (!fs.existsSync("plantInfoScraped2.json")) {
            // add the opening bracket to the json file
            try {
                //fs.writeFileSync(
                fs.appendFileSync(
                    "plantInfoScraped2.json",
                    "[");
            } catch (error) {
                console.log(error);
            }
        }

        // loop through the urls array
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: "domcontentloaded" });

            let plantFeatures = "Null";

            // scrape the data from the selector specified
            plantFeatures = await page.$$eval(
                "tr > td.mntl-sc-block-profile__value", // selector
                els => els.map(el => el.textContent)
            );

            console.log(handleArr(plantFeatures));

            // if the last item in the array, don't add a comma
            if (i === urls.length - 1) {
                try {
                    fs.appendFileSync(
                        "plantInfoScraped2.json",
                        JSON.stringify(handleArr(plantFeatures)));
                } catch (error) {
                    console.log(error);
                }
            }
            else { //else add a comma
                try {
                    fs.appendFileSync(
                        "plantInfoScraped2.json",
                        JSON.stringify(handleArr(plantFeatures)) + ",");
                } catch (error) {
                    console.log(error);
                }

                await page.close(); // close the page
            }
        }

    })()
        .catch(err => console.error(err)) // catch any errors
        .finally(() => browser?.close());

    // Future work: check if the last line on the file is a bracket if so don't add a bracket again
    // add the closing bracket to the json file
        try {
            fs.appendFileSync(
                "plantInfoScraped2.json",
                "]");
        } catch (error) {
            console.log(error);
        }

    await browser.close(); // close the browser

})();

/**
 * Make the array of plant features into an object - easier to read JSON style formatted
 * @param arr - array of scraped plant features
 * @returns - formatted object of plant features
 */
// handle the array of plant features
function handleArr(arr) {
    const labels = ["Genus Names", "name", "category", "sunFrequency", "Height", "Width", "Flower Color", "Foliage Color", "Season Features", "Special Features", "nativeRegion", "Propagation", "Problem Solvers"]
    const returnObj = {}

    // loop through the array and add the label as the key and the value as the value
    for (let i = 0; i < arr.length; i++) {
        const label = labels[i]
        const value = arr[i]
        returnObj[label] = value
    }

    return returnObj
}