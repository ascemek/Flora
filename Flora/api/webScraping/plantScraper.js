/**
 * @author Sami Cemek
 * @version 1.0
 * @date 04/25/23
 * 
 */

const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch();

    await (async () => {
        const urls = [ // 25 plants
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
            "https://www.bhg.com/gardening/plant-dictionary/vine/mandevilla/"

        ];
        console.log("Numeber of plants will scraped: " + urls.length);

        // if the file doesn't exists, add the opening bracket
        if (!fs.existsSync("plantInfoScraped.json")) {
            // add the opening bracket to the json file
            try {
                //fs.writeFileSync(
                fs.appendFileSync(
                    "plantInfoScraped.json",
                    "[");
            } catch (error) {
                console.log(error);
            }
        }

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: "domcontentloaded" });

            let plantFeatures = "Null";

            // Scrape the data from the selector specified
            plantFeatures = await page.$$eval(
                "tr > td.mntl-sc-block-profile__value",
                els => els.map(el => el.textContent)
            );

            console.log(handleArr(plantFeatures));

            // if the last item in the array, don't add a comma
            if (i === urls.length - 1) {
                try {
                    fs.appendFileSync(
                        "plantInfoScraped.json",
                        JSON.stringify(handleArr(plantFeatures)));
                } catch (error) {
                    console.log(error);
                }
            }
            else { //else add a comma
                try {
                    fs.appendFileSync(
                        "plantInfoScraped.json",
                        JSON.stringify(handleArr(plantFeatures)) + ",");
                } catch (error) {
                    console.log(error);
                }

                await page.close();
            }
        }

    })()
        .catch(err => console.error(err))
        .finally(() => browser?.close());

    // Future work: check if the last line on the file is a bracket if so don't add a bracket again
    // add the closing bracket to the json file
        try {
            fs.appendFileSync(
                "plantInfoScraped.json",
                "]");
        } catch (error) {
            console.log(error);
        }

    await browser.close();

})();


function handleArr(arr) {
    const labels = ["GENUS NAMES", "COMMON NAME", "PLANT TYPE", "LIGHT", "HEIGHT", "WIDTH", "FLOWER COLOR", "FOLIAGE COLOR", "SEASON FEATURES", "SPECIAL FEATURES", "ZONES", "PROPAGATION", "PROBLEM SOLVERS"]
    const returnObj = {}

    for (let i = 0; i < arr.length; i++) {
        const label = labels[i]
        const value = arr[i]
        returnObj[label] = value
    }

    return returnObj
}